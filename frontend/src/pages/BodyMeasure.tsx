/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function BodyMeasure({measureFinished}:any) {
  return (
    <>
      <h1>Please Allow Camera Access!</h1>
      <button onClick={() => {
        measureFinished();
        }} className="fixed z-90 bottom-10 right-8 btn btn-primary drop-shadow-lg text-3xl hover:drop-shadow-2xl hover:animate-bounce duration-300">Continue</button>
    </>
  )
}
