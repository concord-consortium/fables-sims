import React from "react";
import { maxFeetPerSecond } from "./cart-stage";
import "./message-area.scss";

export const CartMessages = {
  start: "",
  success: "Good job! You stopped the cart.",
  failure: "Bam! The cart crashed into car at %SPEED% feet per second."
};

interface MessageAreaProps {
  messageType: "start" | "success" | "failure"
  speed: number;
}

export const MessageArea: React.FC<MessageAreaProps> = (props:MessageAreaProps) => {
  const { messageType, speed } = props;
  const message: string = CartMessages[messageType];
  const feetPerSecond = (maxFeetPerSecond * speed).toFixed(2);
  const formattedMessage = message.replace("%SPEED%", feetPerSecond);
  return (
    <div className="message-area">
      <span className="message">{formattedMessage}</span>
    </div>
  );
};
