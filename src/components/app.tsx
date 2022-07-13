import React from "react";
import { Circle, Image } from "react-konva";
import useImage from "use-image";

import { SimStage } from "./sim-stage";

import None from "../assets/people/none.png";

import "./app.scss";



const DudeImage = () => {
  const [image] = useImage(None);
  return (<Image y={40} scale={{x: 0.1, y:0.1}} image={image} />);
};

export const App = () => {
  return (
    <div className="app">
      <SimStage sceneWidth={100} aspectRatio={3/2}>
        <DudeImage />
      </SimStage>
    </div>
  );
};
