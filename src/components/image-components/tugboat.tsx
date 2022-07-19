import React from "react";
import { Group, Image } from "react-konva";
import useImage from "use-image";

import { WaterChurn } from "./water-churn";

import bottomImg from "../../assets/boat-tops/big-bottom.png";
import topImg from "../../assets/boat-tops/big-top.png";
const imageWidth = 70;
const imageHeight = 200;

export interface Props {
  x: number;
  y: number;
  orientation: "top" | "bottom";
  size: "big" | "small";
}

export const Tugboat = (props: Props) => {
  const { x, y, orientation, size } = props;
  const imageSource = orientation === "bottom" ? bottomImg : topImg;
  const waterRotation = orientation === "bottom" ? -90 : 90;
  const [image] = useImage(imageSource);

  const boatScale = size === "big" ? 0.05 : 0.04;
  const tugScale = {x: boatScale, y: boatScale};
  const waterOffsetY = orientation === "bottom"
    ? imageHeight * boatScale - 1
    : (imageHeight * boatScale) * -1 + 1;
  return (
    <Group>
      <WaterChurn x={x} y={y+waterOffsetY} play={true} rotation={waterRotation}/>
      <Image
        x={x}
        y={y}
        offset={{x: imageWidth/2, y:imageHeight/2}}
        scale={tugScale}
        image={image}
      />
    </Group>
  );
};
