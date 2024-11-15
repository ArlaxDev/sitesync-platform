from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import cv2
import time

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on('connect')
def handle_connect():
    print('Client connected')

def generate_video_stream():
    image_path = "./safety_modified.png"
    image = cv2.imread(image_path)
    if image is None:
        print("Error: Image not found.")
        return

    while True:
        # Example processing (draw paths, etc.)
        overlay = image.copy()
        cv2.circle(overlay, (100, 100), 5, (255, 0, 0), -1)  # Example point
        cv2.line(overlay, (100, 100), (200, 200), (0, 255, 255), 2)  # Example line

        # Encode image as JPEG
        ret, jpeg = cv2.imencode('.jpg', overlay)
        if not ret:
            continue

        # Emit the frame to the client via WebSocket
        frame = jpeg.tobytes()
        socketio.emit('frame', frame)
        time.sleep(0.1)

@socketio.on('start_video')
def handle_start_video():
    generate_video_stream()

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5001)
