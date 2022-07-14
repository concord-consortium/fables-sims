import React from "react";
import { Image } from "react-konva";
import useImage from "use-image";

import img from "../../assets/cart.png";

export interface CartProps {
  location: number;
}
export const Cart = (props: CartProps) => {
  const { location } = props;
  const [image] = useImage(img);
  return (<Image x={location} y={44} scale={{x: 0.1, y:0.1}} image={image} />);
};
