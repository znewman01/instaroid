#!/usr/bin/env python

import pygame
import Image, ImageChops, ImageFilter
from pygame.locals import *
import sys
import requests

import cv

#cv.NamedWindow("w1", cv.CV_WINDOW_AUTOSIZE)

camera = cv.CaptureFromCAM(-1)
def get_image():
    # Add the line below if you need it (Ubuntu 8.04+)
    #convert Ipl image to PIL imae
    cvBgrImage = cv.QueryFrame(camera)
    cvRgbImage = cv.CreateImage(cv.GetSize(cvBgrImage),8,3)
    cv.CvtColor(cvBgrImage, cvRgbImage, cv.CV_BGR2RGB)
    im = cvRgbImage
    return Image.fromstring("RGB", cv.GetSize(im), im.tostring()).resize((320, 240)).crop((0, 0, 240, 240))

def identity(image):
    return image

def invert(image):
    return ImageChops.invert(image)

def blur(image):
    return image.filter(ImageFilter.BLUR).filter(ImageFilter.BLUR)

def contour(image):
    return image.filter(ImageFilter.CONTOUR)

def emboss(image):
    return image.filter(ImageFilter.EMBOSS)

def find_edges(image):
    return image.filter(ImageFilter.FIND_EDGES)

filters = [identity, invert, blur, contour, emboss, find_edges]

def main():
    fps = 30.0
    pygame.init()
    window = pygame.display.set_mode((240,240))
    pygame.display.set_caption("WebCam Demo")
    screen = pygame.display.get_surface()

    captured = False
    im = None
    filter_no = 0
    while True:
        events = pygame.event.get()
        for event in events:
            if event.type == QUIT:
                sys.exit(0)
            elif event.type == KEYDOWN:
                if event.key == K_SPACE:
                    if captured:
                        im.save('/tmp/instaroid.png')
                        url = 'http://localhost:3000/upload'
                        files = {'image': open('/tmp/instaroid.png', 'rb')}
                        r = requests.post(url, files=files)
                        print r.text
                    else:
                        orig_im = get_image()
                        im = orig_im
                    captured = not captured
                elif event.type == KEYDOWN and event.key == K_q:
                    sys.exit(0)
                elif captured and event.key == K_RIGHT:
                    filter_no = (filter_no + 1) % len(filters)
                    im = filters[filter_no](orig_im)
                elif captured and event.key == K_LEFT:
                    filter_no = (filter_no - 1) % len(filters)
                    im = filters[filter_no](orig_im)
        if not captured:
            im = get_image()
        pg_img = pygame.image.fromstring(im.tostring(), im.size, "RGB")
        screen.blit(pg_img, (0,0))
        pygame.display.flip()
        pygame.time.delay(int(1000 * 1.0/fps))

if __name__ == '__main__':
    main()
