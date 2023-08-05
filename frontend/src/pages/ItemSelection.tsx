/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
import {useEffect, useState} from "react";
import {getDocs, collection} from "firebase/firestore";
import { db } from "../utils/firestore";

export default function ItemSelection ({selectionFinished, gender}:any) {
  const [items, setItems] = useState<any>([]);

  // inital fetch of all items
  useEffect(() => {
    // check if already in local storage
    if (localStorage.getItem(gender + "items")) {
      console.log("items already in local storage");
      setItems(JSON.parse(localStorage.getItem(gender + "items") ?? "{}"));
      return;
    } 
    console.log("fetching items from firestore");
    getDocs(collection(db, gender)).then((querySnapshot) => {
      // store in local storage
      localStorage.setItem(gender + "items", JSON.stringify(querySnapshot.docs.map((doc) => doc.data())));
      querySnapshot.forEach((doc) => {
        setItems((prevState:any) => [...prevState, doc.data()]);
      });
    }).catch((error) => {
      console.log("Error getting documents: ", error);
    });
  }, []);


  // generate new items based on selection
  const generateNew = (index:number) => {
    const targetattributes = items[index].attributes;

    items.forEach((item:any) => {
      const itemattributes = item.attributes;
      let score = 0;

      for (const key in targetattributes) {
        if (key in itemattributes) {
          if (targetattributes[key] === itemattributes[key]) {
            score++;
          }
        }
      }
      item.score = score;
    });

    const newitem = [...items].sort((a:any, b:any) => {
      return b.score - a.score;
    });

    setItems(newitem);
  };

  return (
    <>
      <h1 className="text-6xl m-10 text-center">Pick the Styles You Like!</h1> 
        <div className="flex flex-wrap justify-center">
          {
            items &&
              items.map((item:any, index:number) => 
                <div key={index} className="card w-96 bg-base-100 shadow-xl m-5 hover:opacity-50"
                onClick={() => {
                  generateNew(index);
                }}
              >
                  <figure><img src={item.imageUrl} alt="Shoes" /></figure>
                  <div className="card-body">
                    <h2 className="card-title">{item.title}</h2>
                    <p>{item.brand}</p>
                    <div className="flex flex-row flex-wrap">
                      {
                        item.attributes &&
                          item.attributes.map((item:any, index:number) =>
                            <div key = {index} className="badge badge-primary mr-1 mb-1">{item}</div>
                          )
                      }
                    </div>
                  </div>
                </div>
              )
          }
        </div>
      <button onClick={() => {
        selectionFinished();
      }} className="fixed z-90 bottom-10 right-8 btn btn-primary drop-shadow-lg text-3xl hover:drop-shadow-2xl hover:animate-bounce duration-300">Continue</button>
    </>
  )
}

