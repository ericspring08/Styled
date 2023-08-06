/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Head from "next/head";
import { useState } from "react";
import ItemSelection from "./ItemSelection";
import InitialSurvey from "./InitialSurvey";
import BodyMeasure from "./BodyMeasure";
import ClothingResults from "./ClothingResults"; 

export default function Home() {
  const [gender, setGender] = useState("mens");
  const [showInitalSurvey, setShowInitialSurvey] = useState(true);
  const [showItemSelection, setShowItemSelection] = useState(false);
  const [showBodyMeasure, setShowBodyMeasure] = useState(false);
  const [showFinalResults, setShowFinalResults] = useState(false);
  const [finalItems, setFinalItems] = useState(null)

  return (
    <>
      <Head>
        <title>Styled</title>
        <meta name="description" content="Help choose your styles with our tools!" />
        <link rel="icon" href="/styled.png" />
      </Head>
      <main>
        {
          showInitalSurvey &&
            <InitialSurvey surveyFinished={(data:any) => {
              setGender(data.gender);
              setShowInitialSurvey(false);
              setShowBodyMeasure(true);
            }}/>
        }
        {
          showBodyMeasure &&
            <BodyMeasure measureFinished={() => {
              setShowBodyMeasure(false);
              setShowItemSelection(true);
            }}/>
        }
        {
          showItemSelection &&
            <ItemSelection selectionFinished={(items:any) => {
              setShowItemSelection(false);
              setShowFinalResults(true);
              console.log(items.items)
              setFinalItems(items.items)
            }}
            gender={gender}/>
        } 
        {
          showFinalResults &&
            <ClothingResults items={finalItems}/>
        }
      </main>
    </>
  );
}
