/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Webcam from "react-webcam";
import { useRef, useState } from "react";
import { SquareLoader } from "react-spinners";
import axios from "axios";

export default function BodyMeasure({ measureFinished }: any) {
  const webCamRef = useRef<Webcam | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [sizeIsLoading, setSizeIsLoading] = useState(false);

  const capture = () => {
    const interval = setInterval(() => {
      const imageSrc = webCamRef.current?.getScreenshot();
      setSizeIsLoading(true);
      setSize(null);
      if (imageSrc) {
        setImgSrc(imageSrc);
        axios.post("https://processshirtsize.onrender.com/processimage", {
          image: imageSrc
        })
          .then((res) => {
            if (Number(res.data) < 41) {
              setSize("S");
            } else if (Number(res.data) > 41 && Number(res.data) < 44) {
              setSize("M");
            } else if (Number(res.data) > 44 && Number(res.data) < 48) {
              setSize("L");
            } else if (Number(res.data) > 48 && Number(res.data) < 52) {
              setSize("XL");
            } else if (Number(res.data) > 52 && Number(res.data) < 56) {
              setSize("XXL");
            } else {
              setSize("XXXL");
            }
          })
          .then(() => {
            setSizeIsLoading(false);
            if (document) {
              (document.getElementById('my_modal_1') as HTMLFormElement).showModal();
            }
          }).catch((err) => console.log(err));
      }
      clearInterval(interval);
    }, 3000);
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen w-screen">
        {
          !imgSrc && 
            <Webcam height={600} ref={webCamRef}></Webcam>
        }
        
        <SquareLoader
          color={`hsl(var(--p))`}
          loading={sizeIsLoading}
          size={50}
        />
        {imgSrc && (
          <img src={imgSrc} alt="User" />
        )}
        <dialog id="my_modal_1" className="modal">
          <form method="dialog" className="flex flex-col modal-box items-center">
            <h3 className="font-bold text-2xl">You are a size</h3>
            <p className="text-6xl">{size ?? 0}</p>
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </div>
          </form>
        </dialog>
        <button onClick={capture} className="btn btn-primary" disabled={imgSrc != null}>Take Photo</button>
        <ul className="steps fixed z-90 top-10 item-center">
          <li className="step step-primary">Inital Survey</li>
          <li className="step step-primary">Body Measurements</li>
          <li className="step">Clothing Selection</li>
          <li className="step">Final Selection</li>
        </ul> 
        <button onClick={() => {
          measureFinished();
        }} className="fixed z-90 bottom-10 right-8 btn btn-primary drop-shadow-lg text-3xl hover:drop-shadow-2xl hover:animate-bounce duration-300">Continue</button>
      </div>
    </>
  )
}