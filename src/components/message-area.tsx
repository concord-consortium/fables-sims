import React from "react";
import { StatusMessage } from "../types";
import { maxFeetPerSecond } from "./cart-stage";
import t from "../utils/translation/translate";

import "./message-area.scss";


interface MessageAreaProps {
  messageType: StatusMessage;
  speed: number;
}

export const MessageArea: React.FC<MessageAreaProps> = (props:MessageAreaProps) => {
  const { messageType, speed } = props;
  const message: string = t(messageType);
  const feetPerSecond = (maxFeetPerSecond * speed).toFixed(2);
  const formattedMessage = message.replace("%SPEED%", feetPerSecond);
  return (
    <div className="message-area">
      <span className="message">{formattedMessage}</span>
    </div>
  );
};
