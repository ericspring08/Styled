from flask import Flask, request
from flask_cors import CORS
import numpy as np
import base64
app = Flask(__name__)

# enable CORS
CORS(app, resources = {r'/*': {'origins': '*'}})

from shirtSize import proceess

# define a route that will take in a image as a string, convert it to a numpy array, and then return the prediction as a string
@app.route('/processimage', methods = ['POST'])
def processimage():
    # get the image from the request
    image = request.get_json()['image']
    image = image.replace('data:image/webp;base64,', '')
    with open("imageToSave.jpg", "wb") as fh:
        fh.write(base64.decodebytes(image.encode()))
    # get the prediction
    prediction = proceess()
    # return the prediction
    return str(prediction)
