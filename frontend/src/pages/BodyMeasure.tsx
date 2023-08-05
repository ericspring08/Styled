/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Webcam from "react-webcam";
import {useRef, useState} from "react";
import axios from "axios";

export default function BodyMeasure({measureFinished}:any) {
  const webCamRef = useRef<Webcam|null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [size, setSize] = useState<string|null>(null);

  const capture = () => {
    const interval = setInterval(() => {
      const imageSrc = webCamRef.current?.getScreenshot();
      if(imageSrc) {
        setImgSrc(imageSrc);
        axios.post("https://processshirtsize.onrender.com/processimage", {
          image: imageSrc
        })
        .then((res) => {
          if(Number(res.data) < 41) {
            setSize("S");
          } else if(Number(res.data) > 41 && Number(res.data) < 44) {
            setSize("M");
          } else if(Number(res.data) > 44 && Number(res.data) < 48) {
            setSize("L");
          } else if(Number(res.data) > 48 && Number(res.data) < 52) {
            setSize("XL");
          } else if(Number(res.data) > 52 && Number(res.data) < 56) {
            setSize("XXL");
          } else {
            setSize("XXXL");
          }
        })
          .catch((err) => console.log(err));
      }
      clearInterval(interval); 
    }, 3000);
  }

  return (
    <>
      <h1>Please Allow Camera Access!</h1>
      <Webcam height={600} ref={webCamRef}></Webcam>
      <button onClick={capture} className="btn btn-primary">Take Photo</button>
      {imgSrc && (
        <img src={imgSrc} alt="User" />
      )}
      {
        size && (
          <h1 className="text-4xl">Size: {size}</h1>
        )
      }
      <button onClick={() => {
        measureFinished();
        }} className="fixed z-90 bottom-10 right-8 btn btn-primary drop-shadow-lg text-3xl hover:drop-shadow-2xl hover:animate-bounce duration-300">Continue</button>
    </>
  )
}
