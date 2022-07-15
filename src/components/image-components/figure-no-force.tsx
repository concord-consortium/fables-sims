import React from "react";
import { Image } from "react-konva";
import useImage from "use-image";

import None from "../../assets/people/none.png";

export interface FigureProps {
  x: number;
  y: number;
}
export const FigureNoForce = (props: FigureProps) => {
  const { x, y } = props;
  const [image] = useImage(None);
  return (<Image x={x} y={y} scale={{x: 0.1, y:0.1}} image={image} />);
};
