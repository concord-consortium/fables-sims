import React from "react";
import { StatusMessage } from "../types";
import t from "../utils/translation/translate";

import "./message-area.scss";


interface MessageAreaProps {
  messageType: StatusMessage;
  speed: number;
}

export const MessageArea: React.FC<MessageAreaProps> = (props:MessageAreaProps) => {
  const { messageType, speed } = props;
  let message = t(messageType);
  if (messageType === "CART.FAIL") {
    message = t("CART.FAIL-SLOW");
    if(speed > 0.6) {
      message = t("CART.FAIL-FAST");
    }
  }
  return (
    <div className="message-area">
      <span className="message">{message}</span>
    </div>
  );
};
