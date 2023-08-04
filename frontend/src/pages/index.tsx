import Head from "next/head";
import { SetStateAction, useState } from "react";
import ItemSelection from "./ItemSelection";
import InitialSurvey from "./InitialSurvey";
import BodyMeasure from "./BodyMeasure";
import ClothingResults from "./ClothingResults"; 

export default function Home() {
  const [gender, setGender] = useState("Men");
  const [clothingType, setClothingType] = useState("Shirts & Tops");
  const [showInitalSurvey, setShowInitialSurvey] = useState(true);
  const [showItemSelection, setShowItemSelection] = useState(false);
  const [showBodyMeasure, setShowBodyMeasure] = useState(false);
  const [showFinalResults, setShowFinalResults] = useState(false);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {
          showInitalSurvey &&
            <InitialSurvey surveyFinished={(data: { gender: SetStateAction<string>; clothingType: SetStateAction<string>; }) => {
              setGender(data.gender);
              setClothingType(data.clothingType);
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
            <ItemSelection selectionFinished={() => {
              setShowItemSelection(false);
              setShowFinalResults(true);
 
            }}
            gender={gender}
            clothingType={clothingType}/>
        } 
        {
          showFinalResults &&
            <ClothingResults/>
        }
      </main>
    </>
  );
}
