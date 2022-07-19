import React, {useEffect, useRef, useState} from "react";
import { Sprite } from "react-konva";
import img from "../../assets/churn-sheet.png";

export interface WaterChurnProps {
  x: number;
  y: number;
  play: boolean;
  rotation?: number;
  scale?: number;
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
  const { x, y, play, rotation, scale } = props;
  const [imageTag, setImageTag] = useState<HTMLImageElement|null>(null);

  const spriteRefA = useRef<any>();
  const spriteRefB = useRef<any>();

  useEffect(() => {
    const image = new window.Image();
    image.src = img;
    image.onload = () => {
      // set image only when it is loaded
      setImageTag(image);
      if(play) {
        spriteRefA?.current?.start();
        spriteRefB?.current?.start();
      }
    };
  });
  // Each frame in the sprite sheet is 200x200
  const midpoint = {x: 100, y:100};
  return (
    <>
      <Sprite
        offset={midpoint}
        ref={spriteRefA}
        image={imageTag!}
        animation="idle"
        frameRate={20}
        frameIndex={0}
        animations={animations}
        x={x}
        y={y}
        rotation={rotation||0}
        scale={{x: scale||1, y: scale||1}}
      />
      <Sprite
        offset={midpoint}
        ref={spriteRefB}
        image={imageTag!}
        animation="idle"
        frameRate={20}
        frameIndex={20}
        animations={animations}
        x={x}
        y={y}
        rotation={rotation||0}
        scale={{x: scale||1, y: scale||1}}
      />
    </>
    // <Image x={ x } y={y} scale={{x: 0.04, y:0.04}} image={imageTag!} />
  );
};
