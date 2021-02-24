import cv2
import numpy as np
import os
import sys
from random import randrange
import PILasOPENCV as ImageFont

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

def generate_image(image_name,number,brightness,background_brightness,target):
  height=int(sys.argv[1])
  width=int(sys.argv[2])
  ## creating YUV channels
  y=np.float32(np.ones((height,width)))
  u=np.float32(np.ones((height,width)))
  v=np.float32(np.ones((height,width)))
  ## setting the values of the channels
  y=np.multiply(y,background_brightness) ##gray background
  u=np.multiply(u,0)
  v=np.multiply(v,0)


  ##constructing an image
  image = cv2.merge((y, u, v))
  ## setting the color system of the image
  image = cv2.cvtColor(image, cv2.COLOR_YUV2BGR)
  ## write text
  ## total brightness of the text
  brightness_of_text=background_brightness+brightness
  cv2.putText(image,number, (width//3-width//15,height//2+height//20), 3, 4, yuv_to_rgb(brightness_of_text,0,0),2)
  ## save image
  cv2.imwrite(target+"/"+image_name, image)





## list of all number used in the setup
nums= ["024","093","135","156","246","282","286","289","340","359","401","468","534","591","626","628","680","802","815","913","962"]




##
## this script should be called as following: python main.py height width steps
print ('Argument List:', str(sys.argv))
if(len(sys.argv)<5):
  print("Error: 3 Arguments needed")
  print("this script should be called as following: python main.py height width background_color target_folder")
  print("background_color can be (black,gray,white)")
  exit()


target=sys.argv[4]
## reading back ground image
background=None
if(sys.argv[3]=="black"):
  background=15
elif(sys.argv[3]=="gray"):
  background=128
elif(sys.argv[3]=="white"):
  background=240
else:
  print("Error: wrong background color")
  exit()
## inital brighness (which will be added to 128)
brightness=15
## loop to generate images
for i in range(brightness):
  for j in range(len(nums)):
    generate_image(str(i+1)+"_"+nums[j]+".jpg",nums[j],brightness,background,target)
  brightness=brightness-1










