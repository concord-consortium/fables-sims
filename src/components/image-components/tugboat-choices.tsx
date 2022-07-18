import React from "react";
import { Image } from "react-konva";
import useImage from "use-image";

import img from "../../assets/choices.png";
import sideBoat from "../../assets/boat-sides/side-tug.png";

export interface TugboatChoicesProps {
  x: number;
  y: number;
}

export const TugboatChoices = (props: TugboatChoicesProps) => {
  const { x, y } = props;
  const [image] = useImage(img);
  const [sideBoatImage] = useImage(sideBoat);
  const scale = {x: 0.05, y: 0.05 };
  const bigScale = {x: 0.05, y: 0.05 };
  const smallScale = {x: 0.03, y: 0.03 };
  return (
    <>
      <Image x={ x } y={y} scale={scale} image={image} />
      <Image x={ x + 2} draggable y={y+10} scale={bigScale} image={sideBoatImage}/>
      <Image x={ x + 15} draggable y={y+10} scale={bigScale} image={sideBoatImage}/>
      <Image x={ x + 4} draggable y={y+4} scale={smallScale} image={sideBoatImage}/>
      <Image x={ x + 17} draggable y={y+4} scale={smallScale} image={sideBoatImage}/>
    </>
  );
};
