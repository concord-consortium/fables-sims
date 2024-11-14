import React from "react";
import { Group, Image } from "react-konva";
import useImage from "use-image";

import { WaterChurn } from "./water-churn";
import { ForceImage } from "./force-indicator";

import bottomImg from "../../assets/boat-tops/big-bottom.png";
import topImg from "../../assets/boat-tops/big-top.png";

const imageWidth = 70;
const imageHeight = 200;

export interface Props {
  x: number;
  y: number;
  moving: boolean;
  orientation: "top" | "bottom";
  size: "big" | "small";
  onClick?: ()=> void;
}

export const Tugboat = (props: Props) => {
  const { x, y, orientation, size, moving, onClick } = props;
  const imageSource = orientation === "bottom" ? bottomImg : topImg;
  const waterRotation = orientation === "bottom" ? -90 : 90;
  const [image] = useImage(imageSource);
  const boatScale = 1;
  const forceScale = size === "big" ? 1 : 0.5;
  const tugScale = {x: boatScale, y: boatScale};
  const waterOffsetY = (orientation === "bottom"
    ? imageHeight * boatScale - 1
    : (imageHeight * boatScale) * -1 + 1) * (size === "big" ? 1 : 0.6);
  return (
    <Group x={x} y={y} scale={tugScale}>
      { moving &&
        <WaterChurn
          x={0}
          y={waterOffsetY}
          play={true}
          rotation={waterRotation}
          scale={forceScale}
        />
      }
      <Image
        offset={{x: imageWidth/2, y:imageHeight/2}}
        image={image}
        onClick={onClick}
      />
      <ForceImage
        x={imageWidth-25}
        y={waterOffsetY}
        orientation={orientation}
        size={size}
      />
    </Group>
  );
};
