import React from "react";
import { Image } from "react-konva";
import useImage from "use-image";

import img from "../../assets/cart.png";

export interface CartProps {
  x: number;
  y: number;
}
export const Cart = (props: CartProps) => {
  const { x, y } = props;
  const [image] = useImage(img);
  return (<Image x={x} y={y} scale={{x: 0.1, y:0.1}} image={image} />);
};
