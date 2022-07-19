import React, { useState } from "react";
import { Stage, Layer } from "react-konva";
import { useElementSize } from "../hooks/useElementSize";
import { BoatGround } from "./image-components/boat-background";
import { CargoBoat } from "./image-components/cargo-boat";
import { PlayIcon } from "./icons/play-icon";

import "./stage.scss";
import { IconBack } from "./icons/icon-back";
// import useAnimationFrame from "../hooks/useAnimationFrame";
import { MessageArea } from "./message-area";


interface TugboatStageProps {
  sceneWidth: number;
  aspectRatio: number;
  children?: React.ReactNode
}

export const maxFeetPerSecond = 6;

type boatType = undefined|"big"|"small";

export interface ISetBoatType {
  boatType: boatType;
  location: "top" | "bottom"
}

export const TugboatStage: React.FC<TugboatStageProps> = (props:TugboatStageProps) => {

  const {sceneWidth, aspectRatio } = props;
  const [stageRef, { width}] = useElementSize();
  const [topBoat, setTopBoat]= useState<boatType>(undefined);
  const [bottomBoat, setBottomBoat]= useState<boatType>(undefined);
  const theWidth = (width||10);
  const height = width / aspectRatio;
  const scale = theWidth / sceneWidth;

  const [playing, setPlaying] = useState(false);

  const setBoat = (args: ISetBoatType) => {
    const {location, boatType} = args;
    switch (location) {
      case "top":
        setTopBoat(boatType);
        break;
      case "bottom":
        setBottomBoat(boatType);
        break;
      default:
        break;
    }
  };

  // const [status, setStatus] = useState<"start"|"left"|"center"|"right">("start");

  // Don't feel bad about changing these numbers this simulation doesn't
  // use real units and mass is ignored. Just choose values that look right.

  const reset = () => {
    setTopBoat(undefined);
    setBottomBoat(undefined);
    setPlaying(false);
  };

  // const togglePlay = () => {
  //   if(playing) {
  //     setPlaying(false);
  //   } else {
  //     // reset();
  //     setPlaying(true);
  //   }
  // };


  // useAnimationFrame(incrementLocation);
  return (
    <div className="chrome">
      <div className="stage-container" ref={stageRef} data-cy="stage">
        <Stage
          width={width}
          height={height}
          scale={{x: scale, y: scale}}
          >
            <Layer>
              <BoatGround x={0} y={0} />
              <CargoBoat
                x={20}
                y={25}
                topBoat={topBoat}
                bottomBoat={bottomBoat}
                switchBoat={setBoat}
              />
            </Layer>
        </Stage>
      </div>
      <div className="toolbar">
        <div>
          <IconBack
            name="Play"
            selected={!playing}
            handleSelect={reset}
          >
            <PlayIcon/>
          </IconBack>
        </div>
        <MessageArea messageType="start" speed={1}/>
      </div>
    </div>
  );
};
