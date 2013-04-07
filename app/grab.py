#!/usr/bin/env python

import cv
import Image

camera = cv.CaptureFromCAM(-1)
def get_image():
    # Add the line below if you need it (Ubuntu 8.04+)
    #convert Ipl image to PIL imae
    cvBgrImage = cv.QueryFrame(camera)
    cvRgbImage = cv.CreateImage(cv.GetSize(cvBgrImage),8,3)
    cv.CvtColor(cvBgrImage, cvRgbImage, cv.CV_BGR2RGB)
    im = cvRgbImage
    return Image.fromstring("RGB", cv.GetSize(im), im.tostring()).resize((320, 240)).crop((0, 0, 240, 240))

def main():
    im = get_image()
    im.save('test.png')

if __name__ == '__main__':
    main()
