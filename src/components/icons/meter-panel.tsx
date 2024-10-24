import React from "react";
import t from "../../utils/translation/translate";
import {Meter} from "./meter";
import { StatusMessage } from "../../types";

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

const spanForMessage = (messageType: StatusMessage, speed: number) => {
  let message = t(messageType);
  if (messageType === "CART.SUCCESS") {
    message = t("CART.END-SLOWED-A-LOT");
  }  
  else if (messageType === "CART.FAIL") {
    message = t("CART.END-SLOWED-A-LITTLE");
    if(speed > 0.6) {
      message = t("CART.END-NO-CHANGE");
    }
  }
  return (
    <span className="message-text">{message}</span>
  );
};

interface Props {
  speed: number; // 0 -> 1
  size: string;
  messageType: StatusMessage;
}

export const MeterPanel = (props: Props) => {
  const {speed, size, messageType} = props;
  const textReadout = spanForSpeed(speed);
  const messageReadout = spanForMessage(messageType,speed);
  return(
    <div className="meter-panel">
      <Meter value={speed} size={size} />
        {textReadout}
        {messageReadout}
    </div>
  );
};

