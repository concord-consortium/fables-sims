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
import useAnimationFrame from "../hooks/useAnimationFrame";


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
  const boatStartPosition = {x: 20, y:25};
  const boatXVelocity = 10;
  let boatYVelocity = 0;
  const {sceneWidth, aspectRatio } = props;
  const [stageRef, { width}] = useElementSize();
  const [topBoat, setTopBoat]= useState<boatType>(undefined);
  const [bottomBoat, setBottomBoat]= useState<boatType>(undefined);
  const [boatPosition, setBoatPosition] = useState(boatStartPosition);
  const theWidth = (width||10);
  const height = width / aspectRatio;
  const scale = theWidth / sceneWidth;

  const [playing, setPlaying] = useState(false);

  const updatePosition = (args: {time: number, delta: number}) => {
    const {delta} = args;
    if (delta === 0) return;

    if(boatPosition.x > 70) {
      if(playing) {
        setPlaying(false);
      }
      return;
    }

    if(playing){
      const nextPosition = {...boatPosition};
      nextPosition.x += boatXVelocity * delta;
      nextPosition.y += boatYVelocity * delta;
      setBoatPosition(nextPosition);
    }
  };

  useAnimationFrame(updatePosition);



  if (topBoat !== bottomBoat) {
    if (topBoat === "big") {
      boatYVelocity = 1;
    } else {
      boatYVelocity = -1;
    }
  }


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

  const haveBothBoats = (topBoat !== undefined) && (bottomBoat !== undefined);
  // Don't feel bad about changing these numbers this simulation doesn't
  // use real units and mass is ignored. Just choose values that look right.

  const reset = () => {
    setTopBoat(undefined);
    setBottomBoat(undefined);
    setBoatPosition({...boatStartPosition});
    setPlaying(false);
  };

  const togglePlay = () => {
    if(playing) {
      setPlaying(false);
      reset();
    } else {
      setPlaying(true);
    }
  };



  return (
    <div className="chrome">
      {/* <div>X: {boatPosition.x} | counter: {counter}</div> */}
      <div className="stage-container" ref={stageRef} data-cy="stage">
        <Stage
          width={width}
          height={height}
          scale={{x: scale, y: scale}}
          >
            <Layer>
              <BoatGround x={0} y={0} />
              <CargoBoat
                x={boatPosition.x}
                y={boatPosition.y}
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
            selected={!playing && haveBothBoats === true}
            handleSelect={togglePlay}
          >
            <PlayIcon/>
          </IconBack>
        </div>
        <MessageArea messageType="start" speed={1}/>
      </div>
    </div>
  );
};
