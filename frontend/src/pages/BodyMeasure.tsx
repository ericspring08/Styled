/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Webcam from "react-webcam";
import {useRef, useState} from "react";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../utils/firestore";

export default function BodyMeasure({measureFinished}:any) {
  const webCamRef = useRef<Webcam|null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const capture = () => {
    const interval = setInterval(() => {
      const imageSrc = webCamRef.current?.getScreenshot();
      if(imageSrc) {
        setImgSrc(imageSrc);
        console.log(imageSrc); 
      }
      clearInterval(interval); 
    }, 5000);
  }

  return (
    <>
      <h1>Please Allow Camera Access!</h1>
      <Webcam height={600} ref={webCamRef}></Webcam>
      <button onClick={capture} className="btn btn-primary">Take Photo</button>
      {imgSrc && (
        <img src={imgSrc} alt="User" />
      )}
      <button onClick={() => {
        measureFinished();
        }} className="fixed z-90 bottom-10 right-8 btn btn-primary drop-shadow-lg text-3xl hover:drop-shadow-2xl hover:animate-bounce duration-300">Continue</button>
    </>
  )
}