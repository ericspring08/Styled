/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {useState} from "react";

export default function InitialSurvey ({surveyFinished}:any) {
  const [gender, setGender] = useState("mens");
  return (
    <>
      <main className="flex flex-col justify-center items-center h-screen w-screen">
        <h1 className="text-6xl">Step 1: Initial Survey</h1>
        <h1 className="text-4xl">What is your Gender?</h1> 
        <select className="select select-primary w-full max-w-xs" onChange={(e) => {
          e.preventDefault();
          setGender(e.target.value);
        }}>
          <option value="mens">Men</option>
          <option value="womens">Women</option>
        </select>
        <button onClick={() => {
          surveyFinished({
              gender: gender,
          })
        }} className="fixed z-90 bottom-10 right-8 btn btn-primary drop-shadow-lg text-3xl hover:drop-shadow-2xl hover:animate-bounce duration-300">Continue</button>
      </main>
    </>
  )
} 
