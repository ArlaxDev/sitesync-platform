from flask import Flask, Response
import cv2
import numpy as np
from collections import deque
import time
import os

app = Flask(__name__)

image_path = "./safety_modified.png"
if not os.path.exists(image_path):
    print("Error: File does not exist at", image_path)
    exit()
else:
    print("File found at", image_path)

# Conversion constants
inches_to_feet = 8.0
inches_to_pixels = 177.6
pixel_to_feet = inches_to_feet / inches_to_pixels

# Load and process the image
print("Loading image...")
image = cv2.imread(image_path)
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
binary_image = cv2.adaptiveThreshold(gray_image, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)
binary_map = binary_image // 255
exit_points = [(400, 100)]

h, w = binary_map.shape
distance_map = np.full((h, w), np.inf)
predecessor_map = np.full((h, w, 2), -1, dtype=int)
visited = np.zeros((h, w), dtype=bool)
queue = deque()

for exit_point in exit_points:
    ex, ey = exit_point
    distance_map[ey, ex] = 0
    queue.append((ex, ey))
    visited[ey, ex] = True

dx_dy = [(-1, 0), (1, 0), (0, -1), (0, 1)]

while queue:
    x, y = queue.popleft()
    current_distance = distance_map[y, x]
    for dx, dy in dx_dy:
        nx, ny = x + dx, y + dy
        if 0 <= nx < w and 0 <= ny < h:
            if not visited[ny, nx] and binary_map[ny, nx] == 1:
                distance_map[ny, nx] = current_distance + 1
                predecessor_map[ny, nx] = [x, y]
                queue.append((nx, ny))
                visited[ny, nx] = True

def get_path_from_predecessor_map(start_point):
    x, y = start_point
    path = [start_point]
    while predecessor_map[y, x][0] != -1:
        x_prev, y_prev = predecessor_map[y, x]
        path.append((x_prev, y_prev))
        x, y = x_prev, y_prev
    return path[::-1]

def calculate_distance_in_feet(path):
    total_distance = 0
    for i in range(1, len(path)):
        x1, y1 = path[i - 1]
        x2, y2 = path[i]
        pixel_distance = np.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
        total_distance += pixel_distance * pixel_to_feet
    return total_distance

def generate_frames():
    for y in range(0, h, 10):
        for x in range(0, w, 10):
            if binary_map[y, x] == 1 and np.isfinite(distance_map[y, x]):
                start_point = (x, y)
                path = get_path_from_predecessor_map(start_point)
                if path:
                    overlay = image.copy()
                    cv2.circle(overlay, start_point, 5, (255, 0, 0), -1)
                    for exit_point in exit_points:
                        cv2.circle(overlay, exit_point, 5, (0, 0, 255), -1)
                    for i in range(1, len(path)):
                        cv2.line(overlay, path[i - 1], path[i], (0, 255, 255), 2)
                    
                    ret, buffer = cv2.imencode('.jpg', overlay)
                    frame = buffer.tobytes()
                    yield (b'--frame\r\n'
                           b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
                    time.sleep(0.1)

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
