import React from "react";
import { Image } from "react-konva";
import useImage from "use-image";

import img from "../../assets/boat-tops/big-bottom.png";

export interface Props {
  x: number;
  y: number;
}

export const TugboatBottom = (props: Props) => {
  const { x, y } = props;
  const [image] = useImage(img);
  const scale = 0.05;

  const imgScale = {x: scale, y: scale};
  return (
    <Image
      x={x}
      y={y}
      scale={imgScale}
      image={image}
    />
  );
};
