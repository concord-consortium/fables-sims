import React from "react";
import { Image } from "react-konva";
import useImage from "use-image";

import img from "../../assets/boat-tops/cargo.png";

export interface CargoBoatProps {
  x: number;
  y: number;
}
export const CargoBoat = (props: CargoBoatProps) => {
  const { x, y } = props;
  const [image] = useImage(img);
  return (<Image x={ x } y={y} scale={{x: 0.04, y:0.04}} image={image} />);
};
