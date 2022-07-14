import React from "react";
import { Image } from "react-konva";
import useImage from "use-image";

import img from "../../assets/car.png";

export interface CarProps {
  location: number;
}
export const Car = (props: CarProps) => {
  const { location } = props;
  const [image] = useImage(img);
  return (<Image x={ location } y={37} scale={{x: 0.1, y:0.1}} image={image} />);
};
