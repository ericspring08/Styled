/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {useState} from "react";

export default function InitialSurvey ({surveyFinished}:any) {
  const [gender, setGender] = useState("mens");
  return (
    <>
      <main className="flex flex-col items-center justify-center h-screen w-screen">
      <ul className="steps fixed z-[90] top-10 items-center">
          <li className="step step-primary">Inital Survey</li>
          <li className="step">Body Measurements</li>
          <li className="step">Clothing Selection</li>
          <li className="step">Final Selection</li>
        </ul>
        <h1 className="text-6xl m-20">What is your Gender?</h1> 
        <div className="flex flex-row items-center">
          <select className="select select-primary select-lg w-full max-w-xs" onChange={(e) => {
            e.preventDefault();
            setGender(e.target.value);
          }}>
            <option value="mens">Men</option>
            <option value="womens">Women</option>
          </select>
        </div>
        
        <button onClick={() => {
          surveyFinished({
              gender: gender,
          })
        }} className="fixed z-90 bottom-10 right-8 btn btn-primary drop-shadow-lg text-3xl">Continue</button>
      </main>
    </>
  )
} 
