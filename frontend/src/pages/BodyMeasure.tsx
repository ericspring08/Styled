/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Webcam from "react-webcam";
import {useRef, useState, useCallback} from "react";

export default function BodyMeasure({measureFinished}:any) {
  const webCamRef = useRef<Webcam|null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [displayNum, setDisplayNum] = useState<number>(5);
  const [circles, setCircles] = useState<any[]>([]);

  const capture = () => {
    const interval = setInterval(() => {
      const imageSrc = webCamRef.current?.getScreenshot();
      if(imageSrc) {
        setImgSrc(imageSrc);
      }
      clearInterval(interval); 
    }, 5000);
  }

  const getClickCoords = (event: { target: any; clientX: number; clientY: number; }) => {
    // from: https://stackoverflow.com/a/29296049/14198287
    const e = event.target;
    const dim = e.getBoundingClientRect();
    const x = event.clientX - dim.left;
    const y = event.clientY - dim.top;
    return [x, y];
  };

  const addCircle = (event: any) => {
    // get click coordinates
    const [x, y] = getClickCoords(event);

    // make new svg circle element
    // more info here: https://www.w3schools.com/graphics/svg_circle.asp
    const newCircle = (
      <circle
        key={circles.length + 1}
        cx={x}
        cy={y}
        r="20"
        stroke="black"
        strokeWidth="1"
        fill="red"
      />
    );

    // update the array of circles; you HAVE to spread the current array
    // as 'circles' is immutible and will not accept new info
    const allCircles = [...circles, newCircle];

    // update 'circles'
    setCircles(allCircles);
  };


  return (
    <>
      <h1>Please Allow Camera Access!</h1>
      <Webcam height={600} ref={webCamRef}></Webcam>
      <button onClick={capture} className="btn btn-primary">Take Photo</button>
      {imgSrc && (
        <img src={imgSrc} alt="User" onClick={(event) => {
          addCircle(event);
        }} />
      )}
      <button onClick={() => {
        measureFinished();
        }} className="fixed z-90 bottom-10 right-8 btn btn-primary drop-shadow-lg text-3xl hover:drop-shadow-2xl hover:animate-bounce duration-300">Continue</button>
    </>
  )
}
function getClickCoords(event: any): [any, any] {
  throw new Error("Function not implemented.");
}

