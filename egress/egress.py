import cv2
import numpy as np
from collections import deque
import time

# Function to load a bounding box template from file
def load_template(template_path):
    template = cv2.imread(template_path)
    if template is None:
        print(f"Error: Template image not found at {template_path}.")
        exit()
    return cv2.cvtColor(template, cv2.COLOR_BGR2GRAY)

# Function to perform template matching with real-time bounding box visualization
def perform_matching(image_gray, template_gray, modified_image, threshold, pass_num, removed_regions):
    angles = np.arange(0, 360, 15)  # Rotate every 15 degrees
    flip_modes = [None, 0, 1, -1]  # Flip options: No flip, horizontal, vertical, both

    for flip_mode in flip_modes:
        flipped_template = cv2.flip(template_gray, flip_mode) if flip_mode is not None else template_gray.copy()

        for angle in angles:
            (h, w) = flipped_template.shape[:2]
            center = (w // 2, h // 2)
            M = cv2.getRotationMatrix2D(center, angle, 1.0)
            nW = int((h * np.abs(M[0, 1])) + (w * np.abs(M[0, 0])))
            nH = int((h * np.abs(M[0, 0])) + (w * np.abs(M[0, 1])))
            M[0, 2] += (nW / 2) - center[0]
            M[1, 2] += (nH / 2) - center[1]
            rotated_template = cv2.warpAffine(flipped_template, M, (nW, nH))

            result = cv2.matchTemplate(image_gray, rotated_template, cv2.TM_CCOEFF_NORMED)
            tH, tW = rotated_template.shape[:2]

            vis_image = modified_image.copy()
            for (y, x) in zip(*np.where(result >= threshold)):
                rect = (x, y, x + tW, y + tH)

                if any(max(rect[0], r[0]) < min(rect[2], r[2]) and max(rect[1], r[1]) < min(rect[3], r[3]) for r in removed_regions):
                    continue

                removed_regions.append(rect)

                cv2.rectangle(vis_image, (rect[0], rect[1]), (rect[2], rect[3]), (0, 255, 0), 2)
                cv2.imshow(f"Template Matching Pass {pass_num}", vis_image)
                cv2.waitKey(1)

                cv2.rectangle(modified_image, (rect[0], rect[1]), (rect[2], rect[3]), (255, 255, 255), -1)

    cv2.destroyWindow(f"Template Matching Pass {pass_num}")
    return modified_image

# Main code
if __name__ == "__main__":
    image_path = "./office_plan.png"
    image = cv2.imread(image_path)
    if image is None:
        print("Error: Image not found.")
        exit()

    image_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    modified_image = image.copy()

    print("\nLoading template for the first pass.")
    template_gray = load_template("./first_pass_bounding_box.png")

    print("Performing template matching for the first pass...")
    threshold_first_pass = 0.6
    removed_regions_first_pass = []
    modified_image = perform_matching(image_gray, template_gray, modified_image, threshold_first_pass, pass_num=1, removed_regions=removed_regions_first_pass)

    print("\nLoading template for the second pass.")
    template_gray_second = load_template("./second_pass_bounding_box.png")

    image_gray_second_pass = cv2.cvtColor(modified_image, cv2.COLOR_BGR2GRAY)
    print("Performing template matching for the second pass...")
    threshold_second_pass = 0.4
    removed_regions_second_pass = []
    modified_image = perform_matching(image_gray_second_pass, template_gray_second, modified_image, threshold_second_pass, pass_num=2, removed_regions=removed_regions_second_pass)

    processed_image_path = "./processed_image.png"
    cv2.imwrite(processed_image_path, modified_image)
    print(f"Processed image saved at {processed_image_path}")

    gray_image = cv2.cvtColor(modified_image, cv2.COLOR_BGR2GRAY)
    binary_image = cv2.adaptiveThreshold(gray_image, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)
    binary_map = binary_image // 255

    print("Defining exit points...")
    exit_points = [(334, 309)]
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

    persistent_overlay = image.copy()
    max_egress_distance = 60
    pixel_to_feet = 8.0 / 177.6

    for y in range(0, h, 10):
        for x in range(0, w, 10):
            if binary_map[y, x] == 1 and np.isfinite(distance_map[y, x]):
                start_point = (x, y)
                path = get_path_from_predecessor_map(start_point)
                if path:
                    path_distance = sum(
                        np.sqrt((path[i][0] - path[i - 1][0])**2 + (path[i][1] - path[i - 1][1])**2)
                        for i in range(1, len(path))
                    ) * pixel_to_feet

                    path_overlay = image.copy()
                    for i in range(1, len(path)):
                        cv2.line(path_overlay, path[i - 1], path[i], (0, 255, 0), 2)

                    cv2.imshow("Pathfinding Visualization", path_overlay)
                    cv2.waitKey(1)

                    if path_distance > max_egress_distance:
                        for i in range(1, len(path)):
                            cv2.line(persistent_overlay, path[i - 1], path[i], (0, 0, 255), 2)

    cv2.imshow("Final Persistent Overlay", persistent_overlay)
    cv2.waitKey(0)
    print("Visualization complete.")
    cv2.destroyAllWindows()
