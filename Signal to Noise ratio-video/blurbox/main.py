import cv2
import os
import numpy as np
import sys
import os

kernel=int(input("Please enter the max kernel-size as integer: "))
for i in range(kernel):
    commad='ffmpeg -i source.mp4 -vf "boxblur='+str(i)+':1" blured_'+str(i)+'.mp4'
    os.system(commad)