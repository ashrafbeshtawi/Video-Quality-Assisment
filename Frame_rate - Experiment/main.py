import cv2
import os
import numpy as np
import sys


## this script should be called as following
## python main.py videoname length frame-rate
print ('Argument List:', str(sys.argv))
if(len(sys.argv)<4):
  print("Error: 2 Arguments needed")
  print("this script should be called as following: python main.py videoname length frame-rate")
  exit()

video=sys.argv[1]
length=int(sys.argv[2])
FR=int(sys.argv[3])

frames_to_generate=length*FR

## after reading all frames generating noise

print("Reading frames", end=" ")
## rewrite the video
image_folder = 'frames'

images = [img for img in os.listdir(image_folder) if img.endswith(".jpg")]

print("✅")
print("Constructing video", end=" ")
frame = cv2.imread(os.path.join(image_folder, images[0]))
height, width, layers = frame.shape

video = cv2.VideoWriter(video,cv2.VideoWriter_fourcc(*'avc1') ,frameSize= (width,height),fps=FR)

frames_done=0
end_loop=False
## looping to construct video from frames until desired video length reached
while(True):
    for image in images:
        img=cv2.imread(os.path.join(image_folder, image))
        video.write(img)
        frames_done+=1
        if(frames_done>=frames_to_generate):
            end_loop=True
            break
    if end_loop==True:
        break

cv2.destroyAllWindows()
video.release()

print("✅")
