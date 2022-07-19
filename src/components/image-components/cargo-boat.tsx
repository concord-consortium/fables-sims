import React from "react";
import { Group, Image } from "react-konva";
import useImage from "use-image";

import img from "../../assets/boat-tops/cargo.png";
import { WaterChurn } from "./water-churn";
import { TugboatSlot } from "./tugboat-slot";
import { Tugboat } from "./tugboat";

const cargoBoatWidth = 751;
const cargoHeight = 191;

export interface CargoBoatProps {
  x: number;
  y: number;
  topBoat?: "big" | "small";
  bottomBoat?: "big" | "small";
}

export const CargoBoat = (props: CargoBoatProps) => {
  const { x, y, topBoat, bottomBoat } = props;
  const [image] = useImage(img);
  const scale = 0.04;
  const waterOffsetX = (cargoBoatWidth * -1 * scale)/2 - 2;
  const tugOffsetX = -2;
  let topGraphic = <TugboatSlot x={tugOffsetX} y={-10} boat="small" />;
  let bottomGraphic = <TugboatSlot x={tugOffsetX} y={11} boat="small" />;
  if(topBoat === "big") {
    topGraphic = <Tugboat x={tugOffsetX} y={-7} orientation="top" size="big"/>;
  }
  if(topBoat === "small") {
    topGraphic = <Tugboat x={tugOffsetX} y={-10} orientation="top" size="small"/>;
  }
  if(bottomBoat === "big") {
    bottomGraphic = <Tugboat x={tugOffsetX -0.5} y={9} orientation="bottom" size="big"/>;
  }
  if(bottomBoat === "small") {
    bottomGraphic = <Tugboat x={tugOffsetX} y={11} orientation="bottom" size="small"/>;
  }
  return (
    <Group x={x} y={y}>
      <WaterChurn x={waterOffsetX} y={0.5} play={true} rotation={0} />
      <Image
        offset={{x: cargoBoatWidth/2, y: cargoHeight/2}}
        scale={{x: 0.04, y:0.04}}
        image={image}
      />
      {topGraphic}
      {bottomGraphic}
    </Group>
    );
};
