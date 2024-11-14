import React from "react";
import { Image } from "react-konva";
import useImage from "use-image";

import topSmallForceImg from "../../assets/boat-tops/top-small-force.png";
import topLargeForceImg from "../../assets/boat-tops/top-large-force.png";
import bottomSmallForceImg from "../../assets/boat-tops/bottom-small-force.png";
import bottomLargeForceImg from "../../assets/boat-tops/bottom-large-force.png";

export interface FigureProps {
  x: number;
  y: number;
  orientation: "top" | "bottom";
  size: "big" | "small";
}

export const ForceImage = (props: FigureProps) => {
  const { x, y, orientation, size } = props;
  let imageToUse = null;
  let yOffset = 0;
  if (orientation === "top" && size === "big") {
    imageToUse = topLargeForceImg;
    yOffset = 90;
  } else if (orientation === "top" && size === "small") {
    imageToUse = topSmallForceImg;
    yOffset = 40;
  } else if (orientation === "bottom" && size === "big") {
    imageToUse = bottomLargeForceImg;
    yOffset = -270;
  } else {
    imageToUse = bottomSmallForceImg;
    yOffset = -200;
  }
  const [image] = useImage(imageToUse);
  return (<Image x={x} y={y + yOffset} scale={{x: 1, y:1}} image={image} />);
};
