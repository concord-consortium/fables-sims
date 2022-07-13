import React from "react";
import Icon from "../assets/concord.png";
import { Stage, Layer, Circle } from "react-konva";
import "./app.scss";

export const App = () => {
  return (
    <div className="app">
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}>
          <Layer>
            <Circle x={200} y={100} radius={50} fill="green" />
          </Layer>
      </Stage>
      <img src={Icon}/>
    </div>
  );
};
