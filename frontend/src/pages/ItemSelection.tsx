/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../utils/firestore";
import Loading from "./Loading";
import SquareLoader from "react-spinners/SquareLoader"

export default function ItemSelection({ selectionFinished, gender }: any) {
  const [items, setItems] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [imgload, setImgload] = useState<boolean>(false);

  // inital fetch of all items
  useEffect(() => {
    // check if already in local storage
    if (localStorage.getItem(gender + "items")) {
      console.log("items already in local storage");
      setItems(JSON.parse(localStorage.getItem(gender + "items") ?? "{}"));
      setLoading(false)
      return;
    }
    console.log("fetching items from firestore");
    getDocs(collection(db, gender)).then((querySnapshot) => {
      // store in local storage
      localStorage.setItem(gender + "items", JSON.stringify(querySnapshot.docs.map((doc) => doc.data())));
      querySnapshot.forEach((doc) => {
        setItems((prevState: any) => [...prevState, doc.data()]);
      });

    }).then(() => {
      setLoading(false)
    }).catch((error) => {
      console.log("Error getting documents: ", error);
    });
  }, []);


  // generate new items based on selection
  const generateNew = (index: number) => {
    const targetattributes = items[index].attributes;

    items.forEach((item: any, index2: number) => {
      const itemattributes = item.attributes;
      let score = 0;

      for (const key in targetattributes) {
        if (key in itemattributes) {
          if (targetattributes[key] === itemattributes[key]) {
            score++;
          }
        }
      }

      if (index2 < index) {
        if (!item.visited) {
          item.visited = 1;
        } else {
          item.visited++;
        }
      }

      if (item.score) {
        item.score += score
      } else {
        item.score = score
      }
    });

    const newitem = [...items].sort((a: any, b: any) => {
      return (b.score - b.visited) - (a.score - a.visited);
    });

    setItems(newitem);
  };

  return (
    <>
      {
        loading ? <Loading /> :
          <div className="flex flex-col items-center">
            <ul className="steps sticky z-[90] top-10 items-center">
              <li className="step step-primary">Inital Survey</li>
              <li className="step step-primary">Body Measurements</li>
              <li className="step step-primary">Clothing Selection</li>
              <li className="step">Final Selection</li>
            </ul>
            <div className="mt-10 flex flex-col items-center">
              <h1 className="text-6xl m-10">Pick the Styles You Like!</h1>
              <div className="flex flex-wrap justify-center">
                {
                  items &&
                  items.map((item: any, index: number) =>
                    <div key={index} className="card w-96 bg-base-100 shadow-xl m-5 hover:opacity-50"
                      onClick={() => {
                        generateNew(index);
                      }}
                    >
                      <figure>
                        <SquareLoader
                          color={`hsl(var(--p))`}
                          loading={!imgload}
                          size={50}
                        />
                        <img src={item.imageUrl} className={imgload ? "" : "hidden"} onLoad={() => {
                          setImgload(true)
                        }} alt="Shoes" />
                      </figure>
                      <div className="card-body">
                        <h2 className="card-title">{item.title}</h2>
                        <p>{item.brand}</p>
                        <div className="flex flex-row flex-wrap">
                          {
                            item.attributes &&
                            item.attributes.map((item: any, index: number) =>
                              <div key={index} className="badge badge-primary mr-1 mb-1">{item}</div>
                            )
                          }
                        </div>
                      </div>
                    </div>
                  )
                }
              </div>
              <button onClick={() => {
                selectionFinished({
                  items: items.slice(0, 100)
                });
              }} className="fixed z-90 bottom-10 right-8 btn btn-primary drop-shadow-lg text-3xl">Continue</button>
            </div>
          </div>
      }
    </>
  )
}

