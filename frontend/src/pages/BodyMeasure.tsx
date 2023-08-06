/* eslint-disable react/no-unescaped-entities */
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
import { BarLoader } from "react-spinners";
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
        <ul className="steps fixed z-[90] top-10 item-center">
          <li className="step step-primary">Inital Survey</li>
          <li className="step step-primary">Body Measurements</li>
          <li className="step">Clothing Selection</li>
          <li className="step">Final Selection</li>
        </ul>
        <div className="flex flex-col items-center mt-[7rem]">
          <h2>Take a waist-up photo of yourself. Stand up as straight as possible.</h2>
          <h2>Once you click "take photo", it will start a 3 second timer. Please remain still until the image is taken.</h2>
          {
            !imgSrc &&
            <Webcam height={600} ref={webCamRef}></Webcam>
          }

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
          <button onClick={capture} className="btn btn-primary mt-5" disabled={imgSrc != null}>
            {
              !imgSrc ? "Take Photo" : <BarLoader
                color={`hsl(var(--p))`}
                loading={sizeIsLoading}
              />
            }
          </button>
          <button onClick={() => {
            measureFinished();
          }} className="fixed z-90 bottom-10 right-8 btn btn-primary drop-shadow-lg text-3xl">Continue</button>
        </div>
      </div>
    </>
  )
}