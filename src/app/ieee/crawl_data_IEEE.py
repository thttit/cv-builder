from time import sleep
import re
import numpy as np
import random
import pandas as pd
import json
from selenium import webdriver
from selenium.webdriver.common.by import By

with open("data_authors.json", "w") as f:
    json.dump([], f)

def write_json(new_data, filename='data_authors.json'):
    with open(filename,'r+') as file:
          # First we load existing data into a dict.
        file_data = json.load(file)
        # Join new_data with file_data inside emp_details
        file_data.append(new_data)
        # Sets file's current position at offset.
        file.seek(0)
        # convert back to json.
        json.dump(file_data, file)

# Create a new Chrome instance
driver = webdriver.Chrome()
# Specify the URL of the IEEE webpage
ieee_url = 'https://ieeexplore.ieee.org/Xplore/home.jsp'
# Open the IEEE webpage
driver.get(ieee_url)
sleep(random.randint(5, 10))

author_elements = driver.find_elements(By.CSS_SELECTOR, '.author-text-container [href]')
links = [author.get_attribute('href') for author in author_elements]

for link in links:
    driver.get(link)
    sleep(random.randint(10, 15))

    author_name = driver.find_elements(By.CSS_SELECTOR, '.hide-mobile .u-pr-02')
    for author in author_name:
        name = author.text

    author_img = driver.find_elements(By.CSS_SELECTOR, '.author-image .u-mb-1')
    for author in author_img:
        img = author.get_attribute('src')

    author_affiliation = driver.find_elements(By.CSS_SELECTOR, '.current-affiliation')
    for author in author_affiliation:
        affiliation = author.text

    author_public_topic = driver.find_elements(By.CSS_SELECTOR, '.research-areas')
    for author in author_public_topic:
        public_topic = author.text.replace('Show More', '...')

    author_bio = driver.find_elements(By.CSS_SELECTOR, '.biography')
    for author in author_bio:
        bio = author.text.replace('Show More', '...')

    write_json({
      'link': link,
      'info': {
        'name' : name,
        'img': img,
        'affiliation' : affiliation,
        'public_topic' : public_topic,
        'bio' : bio
      }
    })

driver.quit()
