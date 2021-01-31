import cv2
import os
import numpy as np
import sys

## this script should be called as following
## python SNR.py image-name max-kernelsize
print ('Argument List:', str(sys.argv))
if(len(sys.argv)<3):
  print("Error: 2 Arguments needed")
  print("this script should be called as following: python SNR.py image-name max-kernelsize")
  exit()

image=sys.argv[1]
kerne_size=int(sys.argv[2])

#reading source image
my_img = cv2.imread(image)


## loop over all kernels
for i in range(1,kerne_size):
    print("Generating image with kernel size: "+ str(i), end=" ")
    # create kernel
    kernel=np.ones((i,i),np.float32)/(i**2)
    # blurring image
    img=cv2.filter2D(my_img,-1,kernel)
    # saving the image
    cv2.imwrite("output/"+str(i)+".jpg",img)
    print("✅")

cv2.destroyAllWindows()


