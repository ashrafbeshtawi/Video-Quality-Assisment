import cv2
import os
import numpy as np
import sys

## this script should be called as following
## python SNR.py videoname kernelsize output-filename
print ('Argument List:', str(sys.argv))
if(len(sys.argv)<4):
  print("Error: 2 Arguments needed")
  print("this script should be called as following: python SNR.py videoname kernel-size output-filename")
  exit()

video=sys.argv[1]
kerne_size=sys.argv[2]
output_file_name=sys.argv[3]
## opening the video
print("Reading video ", end=" ")

vidcap = cv2.VideoCapture(video)
fps_org = vidcap.get(cv2.CAP_PROP_FPS)
#print("Frame rate : {0}".format(fps_org))
## reading the first frame
success,image = vidcap.read()
count = 0
# loop to read each frame
while success:
  # create frame names
  id=count+100000000000
  cv2.imwrite("frames/%d.jpg" % id, image)     # save frame as JPEG file      
  success,image = vidcap.read()
  #print('Read a new frame: ', success)
  count += 1


print("✅")
## after reading all frames generating noise

print("Adding effect", end=" ")
## rewrite the video
image_folder = 'frames'
video_name = output_file_name

images = [img for img in os.listdir(image_folder) if img.endswith(".jpg")]

frame = cv2.imread(os.path.join(image_folder, images[0]))
height, width, layers = frame.shape

video = cv2.VideoWriter(video_name,cv2.VideoWriter_fourcc(*'avc1') ,frameSize= (width,height),fps=fps_org)

for image in images:
    img=cv2.imread(os.path.join(image_folder, image))
    #kernel
    n=int(kerne_size)
    kernel=np.ones((n,n),np.float32)/(n**2)
    img=cv2.filter2D(img,-1,kernel)
    video.write(img)

cv2.destroyAllWindows()
video.release()

print("✅")
print("Deleting meta-data", end=" ")
## delete recorded frames as jpg images
filelist = [ f for f in os.listdir(image_folder) if f.endswith(".jpg") ]
for f in filelist:
    os.remove(os.path.join(image_folder, f))
print("✅")