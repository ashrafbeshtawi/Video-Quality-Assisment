import cv2
import numpy as np
import os
import sys
from random import randrange

###
### conversion according to https://www.vocal.com/video/rgb-and-yuv-color-space-conversion/
###
def rgb_to_yuv( R,  G,  B):
  Y = 0.299 *R + 0.587* G + 0.114* B
  U = -0.14713* R - 0.28886* G + 0.436* B 
  V = 0.615* R - 0.51499 *G -0.10001 *B 
  return (Y,U,V)

def yuv_to_rgb( Y,  U,  V):
  R = Y + 1.13* V
  G = Y - 0.3* U - 0.5*V
  B = Y + 2.03* V 
  return (B,G,R)


####

def generate_image(image_name,number,brightness):
  height=int(sys.argv[1])
  width=int(sys.argv[2])
  ## creating YUV channels
  y=np.float32(np.ones((height,width)))
  u=np.float32(np.ones((height,width)))
  v=np.float32(np.ones((height,width)))
  ## setting the values of the channels
  y=np.multiply(y,128) ##gray background
  u=np.multiply(u,0)
  v=np.multiply(v,0)


  ##constructing an image
  image = cv2.merge((y, u, v))
  ## setting the color system of the image
  image = cv2.cvtColor(image, cv2.COLOR_YUV2BGR)
  ## write text
  ## brighness of the backgroung (fixed)
  background_brightness=128
  ## total brightness of the text
  brightness_of_text=background_brightness+brightness
  cv2.putText(image,str(number), (width//3+width//20,height//2), 0, 4, yuv_to_rgb(brightness_of_text,0,0),2)
  ## save image
  cv2.imwrite(image_name, image)





## this script should be called as following
## python SNR.py videoname kernelsize output-filename
print ('Argument List:', str(sys.argv))
if(len(sys.argv)<4):
  print("Error: 2 Arguments needed")
  print("this script should be called as following: python main.py height width steps")
  exit()


## inital brighness
brightness=128
## loop to generate images
for i in range(int(sys.argv[3])):
  number=randrange(100,999)
  generate_image(str(i)+".jpg",number,brightness)
  brightness=brightness//2










