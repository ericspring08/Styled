const womansFirestoreData = require("./womansFirestoreData.json")
const { initializeApp } = require("firebase/app")
const { getFirestore, setDoc, doc, deleteDoc } = require("firebase/firestore")
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyOp2nmpxEtjsTx15IPP-rysLKZt_MJkQ",
  authDomain: "styled-e.firebaseapp.com",
  projectId: "styled-e",
  storageBucket: "styled-e.appspot.com",
  messagingSenderId: "669737929076",
  appId: "1:669737929076:web:f182664beaaae427024421",
  measurementId: "G-FK3S9Y4B19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

/* for (let i = 0; i < 368; i++) {
    deleteDoc(doc(db, "mens", womansFirestoreData[i].id)).then(() => {
        console.log(i)
    })
} */

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