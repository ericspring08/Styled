from flask import Flask, request, CORS
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
    image = request.form.get('image')
    with open("imageToSave.jpg", "wb") as fh:
        fh.write(base64.decodebytes(image.encode()))
    # convert the image to a numpy array
    image = np.array(image[23:])
    # get the prediction
    prediction = proceess()
    # return the prediction
    return str(prediction)

# run the app
if __name__ == '__main__':
    app.run(debug = True)