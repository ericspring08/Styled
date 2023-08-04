/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
import {useEffect, useState} from "react";
import {colorregex} from "./constants"; 
import mockData from "./mockData";

export default function ItemSelection ({selectionFinished, gender, clothingType}:any) {
  const [items, setItems] = useState(mockData);

  useEffect(() => {
    // console.log(gender);
    // axios.post(
    //   "https://zappos1.p.rapidapi.com/products/list?page=1&limit=100&sort=relevance/desc",
    //   [
    //     {
    //       "facetField": "zc1",
    //       "values": ["Clothing"]
    //     },
    //     {
    //       "facetField": "zc2",
    //       "values": [
    //         clothingType
    //       ]
    //     },
    //     {
    //       "facetField": "txAttrFacet_Gender",
    //       "values": [gender]
    //     }
    //   ],
    //   {headers: {
    //     "content-type": "application/json",
    //     "X-RapidAPI-Key": "6ef4ad0a16msh1fe61cc2f95c0fcp19ce78jsnc57caec7e8c2",
    //     "X-RapidAPI-Host": "zappos1.p.rapidapi.com"
    //   }}
    // ).then((response) => {
    //     
    //   setItems(response.data);
    // });
  }, []);

  // regex for color identification
  const getColorChoices = (text:string) => {
    const colormatches = text.match(colorregex); 
    if(colormatches) {
      return colormatches;
    } 
    return [];
  }

  return (
    <>
      <h1 className="text-6xl m-10 text-center">Pick the Styles You Like!</h1> 
        <div className="flex flex-wrap justify-center">
          {
            items &&
              items.results.map((item:any, index:number) => 
                <div key={index} className="card w-96 bg-base-100 shadow-xl m-5 hover:opacity-50"
                onClick={() => {
                  getColorChoices(item.productUrl);
                }}
              >
                  <figure><img src={`https://m.media-amazon.com/images/I/${item.msaImageId}._AC_SR1472,1840_.jpg`} alt="Shoes" /></figure>
                  <div className="card-body">
                    <h2 className="card-title">{item.productName}</h2>
                    <p>{item.brandName}</p>
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

