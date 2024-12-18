import React from "react";
import { Group, Image } from "react-konva";
import useImage from "use-image";

import img from "../../assets/boat-tops/cargo-with-labels.png";
import { WaterChurn } from "./water-churn";
import { TugboatSlot } from "./tugboat-slot";
import { Tugboat } from "./tugboat";

import { BoatLocation, BoatType } from "../../types";

const cargoBoatWidth = 751;
const cargoHeight = 191;

export interface CargoBoatProps {
  x: number;
  y: number;
  moving: boolean;
  topBoat?: BoatType;
  bottomBoat?: BoatType;
  switchBoat?: (location: BoatLocation) => void;
}

export const CargoBoat = (props: CargoBoatProps) => {
  const { x, y, topBoat, bottomBoat, switchBoat, moving } = props;
  const [image] = useImage(img);

  const scale = 0.04;
  const waterOffsetX = (cargoBoatWidth)/ -2 - 100;
  const tugOffsetX = 0;
  const bottomOffsetX = tugOffsetX -10;

  const bigYOffsetTop = cargoHeight/-2 + 15;
  const bigYOffsetBottom = cargoHeight/2 + 137;

//  const smallYOffsetTop = cargoHeight/-2 + 45;
//  const smallYOffsetBottom = cargoHeight/2 + 115;

  let topGraphic =
    <TugboatSlot
      onClick={
        () => switchBoat
          ? switchBoat("top")
          : null
      }
      x={tugOffsetX}
      y={-145}
      boat="small"
    />;

  let bottomGraphic =
      <TugboatSlot
        onClick={() => switchBoat ? switchBoat("bottom") : null }
        x={tugOffsetX}
        y={300}
        boat="small"
      />;

  if(topBoat === "big") {
    topGraphic =
      <Tugboat
        onClick={() => switchBoat ? switchBoat("top") : null }
        x={tugOffsetX}
        y={bigYOffsetTop}
        moving={moving}
        orientation="top"
        size="big"
      />;
  }
  if(topBoat === "small") {
    topGraphic =
      <Tugboat
        onClick={() => switchBoat ? switchBoat("top") : null }
        x={tugOffsetX}
        y={bigYOffsetTop}
        moving={moving}
        orientation="top"
        size="small"
      />;
  }
  if(bottomBoat === "big") {
    bottomGraphic =
      <Tugboat
        onClick={() => switchBoat ? switchBoat("bottom") : null }
        x={bottomOffsetX}
        y={bigYOffsetBottom}
        moving={moving}
        orientation="bottom"
        size="big"
      />;
  }
  if(bottomBoat === "small") {
    bottomGraphic =
      <Tugboat
        onClick={() => switchBoat ? switchBoat("bottom") : null }
        x={bottomOffsetX}
        y={bigYOffsetBottom}
        moving={moving}
        orientation="bottom"
        size="small"
      />;
  }

  return (
    <Group x={x} y={y} scale={{x: scale, y:scale}}>
      {topGraphic}
      {bottomGraphic}
      { moving && <WaterChurn x={waterOffsetX} y={80} play={true} rotation={0} /> }
      <Image
        offset={{x: cargoBoatWidth/2, y: cargoHeight/2}}
        image={image}
      />
    </Group>
    );
};
