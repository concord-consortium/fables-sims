import React from "react";
import { Image } from "react-konva";
import useImage from "use-image";

import img from "../../assets/receiving-slot.png";

export interface TugboatSlotProps {
  x: number;
  y: number;
  boat: null|"big"|"small";
}

export const TugboatSlot = (props: TugboatSlotProps) => {
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
