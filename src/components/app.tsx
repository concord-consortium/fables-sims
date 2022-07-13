import React from "react";
import { SimStage } from "./sim-stage";

import "./app.scss";

export const App = () => {
  return (
    <div className="app">
      <SimStage sceneWidth={100} aspectRatio={3/2} />
    </div>
  );
};
