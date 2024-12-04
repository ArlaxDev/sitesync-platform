# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.

from ultralytics import YOLO

# Load a model

model = YOLO("yolov8n.yaml")    # build a new model from scratch (YOLO v8 NANO model)

# Use the model
results = model.train(data="config.yaml", epochs=1)        # train the model

"""
def print_hi(name):
    # Use a breakpoint in the code line below to debug your script.
    print(f'Hi, {name}')  # Press Ctrl+F8 to toggle the breakpoint.


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    print_hi('PyCharm')
"""
# See PyCharm help at https://www.jetbrains.com/help/pycharm/
