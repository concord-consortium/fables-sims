import React from "react";
import { CartStage } from "./cart-stage";

import "./app.scss";

export const CartApp = () => {
  return (
    <div className="app">
      <CartStage sceneWidth={100} aspectRatio={2} />
    </div>
  );
};
