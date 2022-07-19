import React from "react";
import { Group, Image } from "react-konva";
import useImage from "use-image";

import img from "../../assets/boat-tops/cargo.png";
import { WaterChurn } from "./water-churn";
import { TugboatSlot } from "./tugboat-slot";
import { Tugboat } from "./tugboat";
import { ISetBoatType } from "../tugboat-stage";

const cargoBoatWidth = 751;
const cargoHeight = 191;

export interface CargoBoatProps {
  x: number;
  y: number;
  topBoat?: "big" | "small";
  bottomBoat?: "big" | "small";
  switchBoat?: (args: ISetBoatType) => void;
}

export const CargoBoat = (props: CargoBoatProps) => {
  const { x, y, topBoat, bottomBoat, switchBoat } = props;
  const [image] = useImage(img);

  const scale = 0.04;
  const waterOffsetX = (cargoBoatWidth)/ -2 - 100;
  const tugOffsetX = 0;
  const bottomOffsetX = tugOffsetX -10;
  const bigYOffset = cargoHeight/2 + 50;
  const smallYOffset = cargoHeight/2 + 60;

  let topGraphic =
    <TugboatSlot
      onClick={
        () => switchBoat
          ? switchBoat({location: "top", boatType:"big"})
          : null
      }
      x={tugOffsetX}
      y={-200}
      boat="small"
    />;

  let bottomGraphic =
      <TugboatSlot
        onClick={
          () => switchBoat
            ? switchBoat({location: "bottom", boatType:"big"})
            : null
        }
        x={tugOffsetX}
        y={250}
        boat="small"
      />;

  if(topBoat === "big") {
    topGraphic = <Tugboat x={tugOffsetX} y={-bigYOffset} orientation="top" size="big"/>;
  }
  if(topBoat === "small") {
    topGraphic = <Tugboat x={tugOffsetX} y={-smallYOffset} orientation="top" size="small"/>;
  }
  if(bottomBoat === "big") {
    bottomGraphic = <Tugboat x={bottomOffsetX} y={bigYOffset} orientation="bottom" size="big"/>;
  }
  if(bottomBoat === "small") {
    bottomGraphic = <Tugboat x={bottomOffsetX} y={smallYOffset} orientation="bottom" size="small"/>;
  }

  return (
    <Group x={x} y={y} scale={{x: scale, y:scale}}>
      <WaterChurn x={waterOffsetX} y={10} play={true} rotation={0} />
      <Image
        offset={{x: cargoBoatWidth/2, y: cargoHeight/2}}
        image={image}
      />
      {topGraphic}
      {bottomGraphic}
    </Group>
    );
};
