import base64
import os
import re
import cv2
import numpy as np
from collections import deque
import time
from pdf2image import convert_from_path
from openai import OpenAI
from dotenv import load_dotenv
import json
from pypdf import PdfReader, PdfWriter

load_dotenv()
client = OpenAI(api_key=os.getenv('OPEN_API_KEY'))

# Crop pdf to the floor plan
full_pdf = PdfReader("./safety_page.pdf")
cropped_pdf = PdfWriter()
page = full_pdf.get_page(0)  # Assume the first page is the one we need
page.mediabox.upper_right = (1425, 1300)    # Coordinates hardcoded for safety_page.pdf
page.mediabox.lower_left = (950, 725)       # Coordinates hardcoded for safety_page.pdf
cropped_pdf.add_page(page)
cropped_pdf.write("./cropped.pdf")

# Step 1: Convert PDF to a downscaled image (if needed for reference)
pdf_path = "./cropped.pdf"
pdf_image_path = "./safety_page.png"
print("Converting PDF to a downscaled image...")

# Convert the cropped PDF to an image and save it as a smaller, downscaled version for viewing purposes
pages = convert_from_path(pdf_path, dpi=200, fmt="png", use_pdftocairo=True)
page_image = pages[0]  # Assuming the first page is the one we need
page_image.save(pdf_image_path, "PNG")

quit()  ## REMOVE WHEN DONE TESTING

def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

# Path to your image
# Getting the base64 string
base64_image = encode_image(pdf_image_path)

# Use GPT-4 with Vision API to extract information from the image

# Prompt for the OpenAI API
prompt = (
    "Based on the given image, find the given scale conversion from inches to feet. Based off that scale, return the conversion from 1 inch to feet."
    "Return the conversion from 1 inch to feet in the format: {\"feet\": <value>}."
)

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": prompt,
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url":  f"data:image/jpeg;base64,{base64_image}"
                    },
                },
            ],
        }
    ],
)

# Extracting and parsing response from OpenAI
try:
    # Extract text content from the response
    extracted_text = response.choices[0].message.content
    print("Extracted response:", extracted_text)
    
    # Use a regular expression to find the JSON-like part of the response
    match = re.search(r'\{.*?\}', extracted_text)
    if match:
        # Parse the JSON content
        scale_data = json.loads(match.group())
        inches_to_feet = scale_data.get("feet", 8.0)  # Default to 8.0 if "feet" is not found
        print(f"Extracted inches to feet conversion: {inches_to_feet} feet per inch")
    else:
        print("JSON data not found in the response. Using default value.")
        inches_to_feet = 8.0  # Fallback to a default value if parsing fails

except (json.JSONDecodeError, KeyError, AttributeError) as e:
    print("Failed to parse the response:", e)
    inches_to_feet = 8.0  # Fallback to a default value if parsing fails

inches_to_pixels = 177.6  # Example: 1 inch on the page is 72 pixels in the image

# Calculate pixel-to-feet conversion
pixel_to_feet = inches_to_feet / inches_to_pixels
print(f"Conversion factor (pixel to feet): {pixel_to_feet} feet per pixel")

# Define maximum egress distance (in feet)
max_egress_distance = 60  # Adjust as needed

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
exit_points = [(412, 88)]  # Replace with your actual exit points

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

# Create a persistent overlay to accumulate red paths
persistent_overlay = image.copy()

# Modified function to draw overlay with the shortest path and mark long paths in red
def draw_overlay(start, path, path_distance_feet):
    overlay = persistent_overlay.copy()
    # Draw start point
    cv2.circle(overlay, start, 5, (255, 0, 0), -1)
    # Draw exit points
    for exit_point in exit_points:
        cv2.circle(overlay, exit_point, 5, (0, 0, 255), -1)
    # Determine path color based on distance
    path_color = (0, 0, 255) if path_distance_feet > max_egress_distance else (0, 255, 0)
    # Draw path
    for i in range(1, len(path)):
        cv2.line(overlay, path[i - 1], path[i], path_color, 2)
    # Keep red paths on persistent overlay
    if path_distance_feet > max_egress_distance:
        for i in range(1, len(path)):
            cv2.line(persistent_overlay, path[i - 1], path[i], (0, 0, 255), 2)
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
                draw_overlay(start_point, path, path_distance_feet)
            else:
                print(f"No path found from point {start_point}")

# Display final persistent overlay with all paths highlighted
cv2.imshow("Final Persistent Overlay", persistent_overlay)
end_time = time.time()  # Get time it takes to produce the graphic.
cv2.waitKey(0)
print(f"Visualization complete. Processed {point_counter} points in {end_time - start_time:.2f} seconds.")
print(f"Maximum distance to an exit: {max_distance_feet:.2f} feet")
cv2.destroyAllWindows()
