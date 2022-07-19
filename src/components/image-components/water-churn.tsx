import React, {useEffect, useRef, useState} from "react";
import { Sprite } from "react-konva";
import img from "../../assets/churn-sheet.png";

export interface WaterChurnProps {
  x: number;
  y: number;
}

const animationLength = 40;
const spriteSize = 200; //200px x 200px
const spriteColums = 7;
const frames:number[] = [];
for (let index = 0; index < animationLength; index++) {
  const x = (index % spriteColums) * spriteSize;
  const y = Math.floor(index/spriteColums) * spriteSize;
  frames.push(x,y,spriteSize,spriteSize);
}
const animations = {idle: frames};
export const WaterChurn = (props: WaterChurnProps) => {
  const { x, y } = props;
  const [imageTag, setImageTag] = useState<HTMLImageElement|null>(null);

  const spriteRef = useRef<any>();

  useEffect(() => {
    const image = new window.Image();
    image.src = img;
    image.onload = () => {
      // set image only when it is loaded
      setImageTag(image);
      spriteRef?.current?.start();
    };
  });

  return (
    <Sprite
      ref={spriteRef}
      image={imageTag!}
      animation="idle"
      frameRate={7}
      frameIndex={0}
      animations={animations}
      x={x}
      y={y}
      rotation={90}
      scale={{x: 0.04, y: 0.04}}
    />
    // <Image x={ x } y={y} scale={{x: 0.04, y:0.04}} image={imageTag!} />
  );
};
