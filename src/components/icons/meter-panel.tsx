import React from "react";
import t from "../../utils/translation/translate";
import {Meter} from "./meter";

import { red, yellow, green } from "../../colors";

import "./meter-panel.scss";

const colorForSpeed = (speed:number): string => {
  if(speed > 0.6) return green;
  if(speed > 0.1) return yellow;
  return red;
};

const textForSpeed = (speed: number): string => {
  if(speed > 0.6) return t("CART.FAST");
  if(speed > 0.1) return t("CART.SLOW");
  return t("CART.ZERO");
};

const spanForSpeed = (speed: number) => {
  const text = textForSpeed(speed);
  const color = colorForSpeed(speed);
  const style = {color};
  return (
    <span className="speed-text" style={style}>{text}</span>
  );
};

interface Props {
  speed: number; // 0 -> 1
  size: string;
}

export const MeterPanel = (props: Props) => {
  const {speed, size} = props;
  const textReadout = spanForSpeed(speed);
  return(
    <div className="meter-panel">
      <Meter value={speed} size={size} />
        {textReadout}
    </div>
  );
};

