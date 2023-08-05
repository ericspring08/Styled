const womansFirestoreData = require("./womansFirestoreData.json")
const { initializeApp } = require("firebase/app")
const { getFirestore, setDoc, doc } = require("firebase/firestore")
require("dotenv").config()
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUERMENTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

womansFirestoreData.forEach((data, index) => {
    setDoc(doc(db, "womens", data.id), {
        id: data.id,
        title: data.title,
        brand: data.brand,
        price: data.price,
        rating: data.rating,
        url: data.url,
        imageUrl: data.imageUrl,
        attributes: data.attributes
    }).then(() => {
        console.log(index)
    })
})