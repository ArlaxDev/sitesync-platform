import cv2
import numpy as np
from collections import deque
import time
import os

image_path = "./safety_modified.png"
if not os.path.exists(image_path):
    print("Error: File does not exist at", image_path)
else:
    print("File found at", image_path)


# Given conversions
inches_to_feet = 8.0  # Example: 1 inch on the page represents 8 feet in real life
inches_to_pixels = 177.6  # Example: 1 inch on the page is 72 pixels in the image

# Calculate pixel-to-feet conversion
pixel_to_feet = inches_to_feet / inches_to_pixels
print(f"Conversion factor (pixel to feet): {pixel_to_feet} feet per pixel")

# Load the image
print("Loading image...")
image_path = "./safety_modified.png"
image = cv2.imread(image_path)
if image is None:
    print("Error: Image not found at the specified path.")
    exit()
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Apply adaptive thresholding to create a binary map
print("Processing image to create binary map...")
binary_image = cv2.adaptiveThreshold(
    gray_image, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2
)
binary_map = binary_image // 255  # 1 for walkable areas, 0 for obstacles

# Define exit points
print("Defining exit points...")
exit_points = [(400, 100)]  # Replace with your actual exit points

# Precompute distance and predecessor maps using BFS
print("Precomputing distance and predecessor maps using BFS from exit points...")
h, w = binary_map.shape
distance_map = np.full((h, w), np.inf)
predecessor_map = np.full((h, w, 2), -1, dtype=int)
visited = np.zeros((h, w), dtype=bool)
queue = deque()

# Initialize BFS with exit points
for exit_point in exit_points:
    ex, ey = exit_point
    distance_map[ey, ex] = 0
    queue.append((ex, ey))
    visited[ey, ex] = True

dx_dy = [(-1, 0), (1, 0), (0, -1), (0, 1)]  # 4-way connectivity

# BFS to fill distance_map and predecessor_map
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

print("Distance and predecessor maps precomputed.")

# Function to reconstruct the path from any point to the exit
def get_path_from_predecessor_map(start_point):
    x, y = start_point
    path = [start_point]
    while predecessor_map[y, x][0] != -1:
        x_prev, y_prev = predecessor_map[y, x]
        path.append((x_prev, y_prev))
        x, y = x_prev, y_prev
    return path[::-1]  # Reverse to get path from start to exit

# Function to calculate path distance in feet
def calculate_distance_in_feet(path):
    total_distance = 0
    for i in range(1, len(path)):
        x1, y1 = path[i - 1]
        x2, y2 = path[i]
        pixel_distance = np.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
        total_distance += pixel_distance * pixel_to_feet
    return total_distance

# Function to draw overlay with the shortest path
def draw_overlay(start, path):
    overlay = image.copy()
    # Draw start point
    cv2.circle(overlay, start, 5, (255, 0, 0), -1)
    # Draw exit points
    for exit_point in exit_points:
        cv2.circle(overlay, exit_point, 5, (0, 0, 255), -1)
    # Draw path
    for i in range(1, len(path)):
        cv2.line(overlay, path[i - 1], path[i], (0, 255, 255), 2)
    cv2.imshow("Shortest Path Overlay", overlay)
    cv2.waitKey(1)

# Visualization loop
print("Starting visualization...")
start_time = time.time()
total_points = ((h // 10) + 1) * ((w // 10) + 1)
point_counter = 0
max_distance_feet = 0  # Track the maximum distance in feet

for y in range(0, h, 10):  # Adjust step size as needed
    for x in range(0, w, 10):
        if binary_map[y, x] == 1 and np.isfinite(distance_map[y, x]):
            start_point = (x, y)
            path = get_path_from_predecessor_map(start_point)
            if path:
                point_counter += 1
                path_distance_feet = calculate_distance_in_feet(path)
                max_distance_feet = max(max_distance_feet, path_distance_feet)
                print(f"Path from point {start_point} to exit: {path_distance_feet:.2f} feet")
                draw_overlay(start_point, path)
            else:
                print(f"No path found from point {start_point}")

end_time = time.time()
print(f"Visualization complete. Processed {point_counter} points in {end_time - start_time:.2f} seconds.")
print(f"Maximum distance to an exit: {max_distance_feet:.2f} feet")
cv2.destroyAllWindows()
