<img src="/Assets/banner.png" />

# Styled - A fully featured platform that detects clothing size and continuously recommends clothing tailored to the users liking
## 💡 The Why and What?
Online shopping and in paticular, online clothing shopping, is becoming an increasingly larger industry. Although it is convenient and cheap, people often have difficulty discovering styles that they may find appealing. It is also difficult for people to know their shirt size, as they do not have a tangible item to examine. To combat these issues, we created Styled, a platform that can detect the user's shirt size using artificial intelligence and recommend and filter clothing based on a custom implemented algorithm.

## 🖋️ Implementation
### 📏👕 Measure Shirt Size
To measure shirt size, we utilized a artificial intelligent library that can find the length of the shoulders. We use this value to determine the letter value by different intervals.

<img src="/Assets/AI.png"/>
All images are taken by the react webcam library, which is in the format of base64 string. This string is send via a POST request to a flask server. On the flask server the base64 string is downloaded as a jpg and passed into the opencv model which determines chest size. This chest size is then passed back to the frontend where it is shown to the user by its letter value.

<img src="/Assets/AI2.png"/>


### Recommendation Algorithm
The recommmendation algorithm uses a content recommendation algorithm approach. Every item has "attributes" which are traits of the clothing.

<img src="/Assets/Attributes.png"/>
Items will share these attributes. The algorithm uses this fact to sort the reccomendations by a "score" value. Every time a user clicks on a item, the number of shared attributes is found between that selected item and the iterated item. The number of shared attributes is added to that items "score" which can determine how relevant and appealing that item is the to user. Over time the algorithm hopes to filter down and identify the types of clothing the user likes.
<img src="/Assets/Algorithm.png"/>
Below is a formal representation of our formula.
<img src="/Assets/Formula.png"/>

### Collecting Data
For any large recommendation model, large amounts of data must be obtained. To obtain data on clothing, we used the Zappos Rapid Api. 
The data returns information regarding each item of clothing including: title, price, url, etc...
We gather more data using webscraping, utilizing the library Puppeteer, visiting each of the url's and gathering description data. We collect the descriptions to find attribute keywords within the descriptions. All of the data for each clothing item is uploaded to firebase, where it can be loaded from any device.

### Frontend and UI
The frontend is built with Next.js and Tailwindcss(DaisyUI). We utilized React-Webcam to access the camera. All data pulled from the Firebase Firestore database is cached to localstorage to prevent excess reads. 

<img src="/Assets/Demo1.png"/>
<img src="/Assets/Demo2.png"/>
<img src="/Assets/Demo3.png"/>
<img src="/Assets/Demo4.png"/>

## Challenges
* The artificial intelligence model was quite difficult to get up and running because of the difficulty in transfering image files from the frontend to backend. The base64 encoding has a specific javascript prefix which makes the image invalid. This prefix must be removed before converting to a jpg.
* The data collection was difficult because of the weird formatting that we encountered when scraping.
* The firebase reads was excessively high, thus we figured out how to cache the data locally as to not go over the quota.

## Accomplishments
* Integrating vision artificial intelligence model on a web server
* Creating a novel algorithm that can recommend based on a users interests
* Deploying the entire project as microservices: Vercel(frontend), Render(AI), Firebase(Database)

## What's next
* Creating a virtual "try on" feature that allows the user to see what they may look like with the shirt on
* Expanding to other kinds of clothing
* Increasing the amount of clothing in the database
* Add other stores and brands to the database

## Authors
* Eric Zhang - ericspring08@gmail.com
* Jeff Zhou - jeff.k.zhou@gmail.com

## United Hacks 2023 1st Place - General Track Winner
