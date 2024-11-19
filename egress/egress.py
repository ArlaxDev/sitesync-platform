import os
import cv2
import numpy as np
from collections import deque
import tkinter as tk
from tkinter import filedialog, messagebox
from tkinter import scrolledtext
from PIL import ImageTk, Image
import threading
import base64
import json
import re

# Import necessary libraries for OpenAI API interaction
from openai import OpenAI
from dotenv import load_dotenv
from pdf2image import convert_from_path

class App:
    def __init__(self, root):
        self.root = root
        self.root.title("Image Processing Application")
        self.root.geometry("1200x800")  # Increased window size

        # Set a background color
        self.root.configure(bg='#f0f0f0')

        # Allow window resizing
        self.root.resizable(True, True)

        # Initialize variables
        self.pixel_to_feet = 8.0 / 150  # Default value
        self.scale_extracted = False

        # Load OpenAI API key
        load_dotenv()
        self.client = OpenAI(api_key=os.getenv('OPEN_API_KEY'))

        # Create and place widgets
        top_frame = tk.Frame(root, bg='#f0f0f0')
        top_frame.pack(side=tk.TOP, fill=tk.X)

        # Title label
        title_label = tk.Label(
            top_frame,
            text="Image Processing Application",
            font=("Helvetica", 18, "bold"),
            bg='#f0f0f0'
        )
        title_label.pack(pady=10)

        # Frame for buttons
        button_frame = tk.Frame(top_frame, bg='#f0f0f0')
        button_frame.pack(pady=10)

        # Upload image button
        upload_image_button = tk.Button(
            button_frame,
            text="Browse Image",
            command=self.browse_file,
            width=20,
            height=2,
            font=("Helvetica", 12)
        )
        upload_image_button.pack(side=tk.LEFT, padx=10)

        # Upload PDF button
        upload_pdf_button = tk.Button(
            button_frame,
            text="Upload Life Safety Plan PDF",
            command=self.browse_pdf,
            width=25,
            height=2,
            font=("Helvetica", 12)
        )
        upload_pdf_button.pack(side=tk.LEFT, padx=10)

        # Main content frame
        content_frame = tk.Frame(root)
        content_frame.pack(fill=tk.BOTH, expand=True)

        # Configure grid
        content_frame.columnconfigure(0, weight=4)  # Image display column
        content_frame.columnconfigure(1, weight=1)  # Sidebar column
        content_frame.rowconfigure(0, weight=1)

        # Canvas frame for image display and scrollbar
        self.canvas_frame = tk.Frame(content_frame)
        self.canvas_frame.grid(row=0, column=0, sticky='nsew')

        # Configure grid in canvas_frame
        self.canvas_frame.rowconfigure(0, weight=1)
        self.canvas_frame.columnconfigure(0, weight=1)

        # Canvas for image display
        self.canvas = tk.Canvas(self.canvas_frame, bg='gray')
        self.canvas.grid(row=0, column=0, sticky='nsew')

        # Scrollbar for the canvas
        self.scrollbar = tk.Scrollbar(
            self.canvas_frame,
            orient=tk.VERTICAL,
            command=self.canvas.yview
        )
        self.scrollbar.grid(row=0, column=1, sticky='ns')

        self.canvas.configure(yscrollcommand=self.scrollbar.set)

        self.canvas.bind('<Configure>', self.resize_image)

        # Create a frame inside the canvas
        self.image_frame = tk.Frame(self.canvas)
        self.canvas.create_window((0, 0), window=self.image_frame, anchor='nw')

        # Image label inside the image frame
        self.image_label = tk.Label(self.image_frame)
        self.image_label.pack()

        # Sidebar on the right for labels
        self.sidebar = tk.Frame(content_frame, width=200, bg='#e0e0e0')
        self.sidebar.grid(row=0, column=1, sticky='nsew')

        # Prevent the sidebar from resizing
        self.sidebar.grid_propagate(False)

        # Stage label
        self.stage_label = tk.Label(
            self.sidebar,
            text="Stage: Idle",
            font=("Helvetica", 14, "bold"),
            bg='#e0e0e0'
        )
        self.stage_label.pack(pady=10, fill='x')

        # Info label
        self.info_label = tk.Label(
            self.sidebar,
            text="",
            font=("Helvetica", 12),
            justify=tk.LEFT,
            bg='#e0e0e0',
            anchor='nw',
            wraplength=180  # Adjusted wraplength to prevent text from expanding the label
        )
        self.info_label.pack(pady=10, fill='x')

        # Text widget for non-compliant paths summary
        self.summary_text = scrolledtext.ScrolledText(
            self.sidebar,
            width=25,
            height=10,
            font=("Helvetica", 10)
        )
        self.summary_text.pack(pady=10, fill='both', expand=True)
        self.summary_text.config(state='disabled')  # Initially disabled

        # Initialize image reference to prevent garbage collection
        self.photo_image = None

        # To track the current thread
        self.processing_thread = None

        # Bind the close event to properly handle application exit
        self.root.protocol("WM_DELETE_WINDOW", self.on_closing)

    def update_stage(self, stage_text):
        self.stage_label.config(text=f"Stage: {stage_text}")

    def update_info(self, info_text):
        self.info_label.config(text=info_text)

    def update_summary(self, summary_text):
        # Enable the text widget, update it, then disable it again
        self.summary_text.config(state='normal')
        self.summary_text.delete('1.0', tk.END)
        self.summary_text.insert(tk.END, summary_text)
        self.summary_text.config(state='disabled')

    def cv2_to_photoimage(self, cv_image):
        # Resize image to fit canvas while maintaining aspect ratio
        canvas_width = self.canvas.winfo_width()
        canvas_height = self.canvas.winfo_height()
        if canvas_width > 1 and canvas_height > 1:
            cv_image = self.resize_cv_image(cv_image, canvas_width, canvas_height)
        else:
            # Default size if canvas dimensions are not yet available
            cv_image = self.resize_cv_image(cv_image, 800, 600)

        # Convert from OpenCV BGR to RGB
        cv_image = cv2.cvtColor(cv_image, cv2.COLOR_BGR2RGB)
        pil_image = Image.fromarray(cv_image)
        photo_image = ImageTk.PhotoImage(pil_image)
        return photo_image

    def resize_cv_image(self, cv_image, max_width, max_height):
        height, width = cv_image.shape[:2]
        aspect_ratio = width / height
        if width > max_width or height > max_height:
            if (max_width / max_height) > aspect_ratio:
                new_height = max_height
                new_width = int(aspect_ratio * new_height)
            else:
                new_width = max_width
                new_height = int(new_width / aspect_ratio)
            cv_image = cv2.resize(cv_image, (new_width, new_height), interpolation=cv2.INTER_AREA)
        return cv_image

    def resize_image(self, event):
        if self.photo_image:
            self.image_label.config(image=self.photo_image)
            self.canvas.configure(scrollregion=self.canvas.bbox("all"))

    def load_template(self, template_path):
        template = cv2.imread(template_path)
        if template is None:
            messagebox.showerror("Error", f"Template image not found at {template_path}.")
            self.root.quit()
        return cv2.cvtColor(template, cv2.COLOR_BGR2GRAY)

    def perform_matching(self, image_gray, template_gray, modified_image, threshold, pass_num, removed_regions, stage_name):
        self.update_stage(stage_name)
        angles = np.arange(0, 360, 15)  # Rotate every 15 degrees
        flip_modes = [None, 0, 1, -1]   # Flip options: No flip, horizontal, vertical, both

        for flip_mode in flip_modes:
            flipped_template = cv2.flip(template_gray, flip_mode) if flip_mode is not None else template_gray.copy()

            for angle in angles:
                (h, w) = flipped_template.shape[:2]
                center = (w // 2, h // 2)
                M = cv2.getRotationMatrix2D(center, angle, 1.0)
                nW = int((h * abs(M[0, 1])) + (w * abs(M[0, 0])))
                nH = int((h * abs(M[0, 0])) + (w * abs(M[0, 1])))
                M[0, 2] += (nW / 2) - center[0]
                M[1, 2] += (nH / 2) - center[1]
                rotated_template = cv2.warpAffine(flipped_template, M, (nW, nH))

                result = cv2.matchTemplate(image_gray, rotated_template, cv2.TM_CCOEFF_NORMED)
                tH, tW = rotated_template.shape[:2]

                vis_image = modified_image.copy()
                locations = np.where(result >= threshold)
                for (y, x) in zip(*locations):
                    rect = (x, y, x + tW, y + tH)

                    if any(max(rect[0], r[0]) < min(rect[2], r[2]) and
                           max(rect[1], r[1]) < min(rect[3], r[3]) for r in removed_regions):
                        continue

                    removed_regions.append(rect)

                    cv2.rectangle(vis_image, (rect[0], rect[1]), (rect[2], rect[3]), (0, 255, 0), 2)

                    # Update image in GUI using root.after
                    self.schedule_image_update(vis_image)

                    cv2.rectangle(modified_image, (rect[0], rect[1]), (rect[2], rect[3]), (255, 255, 255), -1)

        return modified_image

    def get_path_from_predecessor_map(self, predecessor_map, start_point):
        x, y = start_point
        path = [start_point]
        while predecessor_map[y, x][0] != -1:
            x_prev, y_prev = predecessor_map[y, x]
            path.append((x_prev, y_prev))
            x, y = x_prev, y_prev
        return path[::-1]

    def process_image(self, image_path):
        try:
            self.update_stage("Loading Image")
            image = cv2.imread(image_path)
            if image is None:
                messagebox.showerror("Error", "Image not found.")
                return

            image_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            modified_image = image.copy()

            # Template Matching - Removing Doors
            template_gray = self.load_template("./first_pass_bounding_box.png")
            threshold_first_pass = 0.6
            removed_regions_first_pass = []
            modified_image = self.perform_matching(
                image_gray, template_gray, modified_image, threshold_first_pass, pass_num=1,
                removed_regions=removed_regions_first_pass, stage_name="Removing Doors"
            )

            # Template Matching - Removing Labels
            template_gray_second = self.load_template("./second_pass_bounding_box.png")
            image_gray_second_pass = cv2.cvtColor(modified_image, cv2.COLOR_BGR2GRAY)
            threshold_second_pass = 0.4
            removed_regions_second_pass = []
            modified_image = self.perform_matching(
                image_gray_second_pass, template_gray_second, modified_image, threshold_second_pass, pass_num=2,
                removed_regions=removed_regions_second_pass, stage_name="Removing Labels"
            )

            processed_image_path = "./processed_image.png"
            cv2.imwrite(processed_image_path, modified_image)

            gray_image = cv2.cvtColor(modified_image, cv2.COLOR_BGR2GRAY)
            binary_image = cv2.adaptiveThreshold(
                gray_image, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2
            )
            binary_map = binary_image // 255

            # Pathfinding
            self.update_stage("Pathfinding")
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

            persistent_overlay = image.copy()
            max_egress_distance = 60

            # Initialize list to store non-compliant paths
            non_compliant_paths = []

            # Adjusted step size to improve speed
            for y in range(0, h, 20):
                for x in range(0, w, 20):
                    if binary_map[y, x] == 1 and np.isfinite(distance_map[y, x]):
                        start_point = (x, y)
                        path = self.get_path_from_predecessor_map(predecessor_map, start_point)
                        if path:
                            path_distance = sum(
                                np.sqrt((path[i][0] - path[i - 1][0]) ** 2 + (path[i][1] - path[i - 1][1]) ** 2)
                                for i in range(1, len(path))
                            ) * self.pixel_to_feet  # Use updated pixel_to_feet

                            path_overlay = image.copy()
                            for i in range(1, len(path)):
                                cv2.line(path_overlay, path[i - 1], path[i], (0, 255, 0), 2)

                            # Display the path distance on the image
                            cv2.putText(
                                path_overlay,
                                f"Distance: {path_distance:.2f} ft",
                                (10, 30),
                                cv2.FONT_HERSHEY_SIMPLEX,
                                0.8,
                                (255, 0, 0),
                                2,
                                cv2.LINE_AA
                            )

                            # Update info label with path distance
                            self.update_info(f"Current Path Distance: {path_distance:.2f} ft")

                            # Update image in GUI using root.after
                            self.schedule_image_update(path_overlay)

                            if path_distance > max_egress_distance:
                                # Store non-compliant path information
                                non_compliant_paths.append({
                                    'start_point': start_point,
                                    'distance': path_distance
                                })

                                for i in range(1, len(path)):
                                    cv2.line(persistent_overlay, path[i - 1], path[i], (0, 0, 255), 2)

            # Display final overlay
            self.schedule_image_update(persistent_overlay)
            self.update_stage("Processing Complete")
            self.update_info("")

            # Compile summary of non-compliant paths
            if non_compliant_paths:
                summary = "Non-Compliant Paths Found:\n"
                for idx, path_info in enumerate(non_compliant_paths, 1):
                    x, y = path_info['start_point']
                    distance = path_info['distance']
                    summary += f"{idx}. Start Point: ({x}, {y}), Distance: {distance:.2f} ft\n"
            else:
                summary = "All paths are compliant."

            # Update summary in the GUI using root.after
            self.root.after(0, self.update_summary, summary)

        except Exception as e:
            messagebox.showerror("Error", str(e))

    def schedule_image_update(self, cv_image):
        # Schedule the image update in the main thread
        self.root.after(0, self.update_image_in_gui, cv_image)

    def update_image_in_gui(self, cv_image):
        photo_image = self.cv2_to_photoimage(cv_image)
        self.photo_image = photo_image  # Keep a reference
        self.image_label.config(image=self.photo_image)
        self.image_label.image = self.photo_image  # Keep a reference
        self.canvas.configure(scrollregion=self.canvas.bbox("all"))
        self.root.update_idletasks()

    def browse_file(self):
        file_path = filedialog.askopenfilename(
            filetypes=[("Image Files", "*.png *.jpg *.jpeg *.bmp"), ("All Files", "*.*")]
        )
        if file_path:
            # Run image processing in a separate thread
            if self.processing_thread and self.processing_thread.is_alive():
                messagebox.showinfo("Info", "Processing is already running.")
            else:
                self.processing_thread = threading.Thread(target=self.process_image, args=(file_path,), daemon=True)
                self.processing_thread.start()

    def browse_pdf(self):
        pdf_path = filedialog.askopenfilename(
            filetypes=[("PDF Files", "*.pdf"), ("All Files", "*.*")]
        )
        if pdf_path:
            # Run PDF processing in a separate thread
            threading.Thread(target=self.process_pdf, args=(pdf_path,), daemon=True).start()

    def process_pdf(self, pdf_path):
        try:
            self.update_stage("Processing PDF")
            self.update_info("Extracting scale from PDF...")
            # Convert the PDF to an image
            pages = convert_from_path(pdf_path, dpi=100)
            page_image = pages[0]  # Assuming the first page is the one we need
            pdf_image_path = "./safety_page.png"
            page_image.save(pdf_image_path, "PNG")

            # Encode the image to base64
            base64_image = self.encode_image(pdf_image_path)

            # Prepare the prompt
            prompt = (
                "Based on the given image, find the given scale conversion from inches to feet. Based off that scale, return the conversion from 1 inch to feet. "
                "Return the conversion from 1 inch to feet in the format: {\"feet\": <value>}."
            )

            # Send the request to OpenAI API
            response = self.client.chat.completions.create(
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
            extracted_text = response.choices[0].message.content
            match = re.search(r'\{.*?\}', extracted_text)
            if match:
                scale_data = json.loads(match.group())
                inches_to_feet = float(scale_data.get("feet", 8.0))  # Default to 8.0 if "feet" is not found
                self.pixel_to_feet = inches_to_feet / 150  # Update pixel_to_feet conversion
                self.scale_extracted = True
                self.update_info(f"Extracted scale: 1 inch = {inches_to_feet} feet")
            else:
                self.update_info("Failed to extract scale. Using default value.")
                self.pixel_to_feet = 8.0 / 150  # Use default value
        except Exception as e:
            self.update_info(f"Error processing PDF: {e}")
            self.pixel_to_feet = 8.0 / 150  # Use default value

    def encode_image(self, image_path):
        with open(image_path, "rb") as image_file:
            return base64.b64encode(image_file.read()).decode('utf-8')

    def on_closing(self):
        # Ensure all threads are properly terminated
        if self.processing_thread and self.processing_thread.is_alive():
            if messagebox.askokcancel("Quit", "Processing is still running. Do you want to quit?"):
                self.root.destroy()
        else:
            self.root.destroy()

if __name__ == "__main__":
    root = tk.Tk()
    app = App(root)
    root.mainloop()
