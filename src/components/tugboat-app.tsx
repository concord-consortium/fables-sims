import React from "react";
import { TugboatStage } from "./tugboat-stage";

import "./app.scss";

export const TugboatApp = () => {
  return (
    <div className="app">
      <TugboatStage sceneWidth={100} aspectRatio={2} />
    </div>
  );
};
