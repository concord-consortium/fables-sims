import React from "react";
import { Image } from "react-konva";
import useImage from "use-image";

import img from "../../assets/boats-background.jpg";

export interface BoatGroundProps {
  x: number;
  y: number;
}
export const BoatGround = (props: BoatGroundProps) => {
  const { x, y } = props;
  const [image] = useImage(img);
  return (<Image x={ x } y={y} scale={{x: 0.05, y:0.05}} image={image} />);
};
