import React, { useState } from "react";
import { Stage, Layer } from "react-konva";
import useAnimationFrame from "../hooks/useAnimationFrame";
import { useElementSize } from "../hooks/useElementSize";

import { BoatGround } from "./image-components/boat-background";
import { CargoBoat } from "./image-components/cargo-boat";
import { PlayIcon } from "./icons/play-icon";
import { IconBack } from "./icons/icon-back";

import { MessageArea } from "./message-area";
import { Dialog } from "./dialog";
import { BoatPicker } from "./boat-picker";
import { BoatLocation, BoatType, StatusMessage } from "../types";
import { BoatInstructions } from "./boat-instructions";

import "./stage.scss";
import { ResetIcon } from "./icons/reset";

interface TugboatStageProps {
  sceneWidth: number;
  aspectRatio: number;
  children?: React.ReactNode
}

export const maxFeetPerSecond = 6;

export interface IBoatEdit {
  boatType: BoatType;
  location: BoatLocation;
}

export const TugboatStage: React.FC<TugboatStageProps> = (props:TugboatStageProps) => {
  const boatStartPosition = {x: 20, y:23};
  const boatXVelocity = 10;
  const maxY = 40;
  const minY = 5;
  const maxX = 67;

  let boatYVelocity = 0;
  const {sceneWidth, aspectRatio } = props;
  const [stageRef, { width}] = useElementSize();
  const [topBoat, setTopBoat]= useState<BoatType>(undefined);
  const [bottomBoat, setBottomBoat]= useState<BoatType>(undefined);
  const [boatEdit, setBoatEdit] = useState<BoatLocation>(undefined);
  const [boatPosition, setBoatPosition] = useState(boatStartPosition);
  const [seenInstructions, setSeenInstructions] = useState(false);
  const theWidth = (width||10);
  const height = width / aspectRatio;
  const scale = theWidth / sceneWidth;

  const [playing, setPlaying] = useState(false);

  const reachedEnd = boatPosition.x > maxX;

  const updatePosition = (args: {time: number, delta: number}) => {
    const {delta} = args;

    if (delta === 0) return;

    if(reachedEnd) {
      if(playing) {
        setPlaying(false);
      }
      return;
    }

    if(playing){
      const nextPosition = {...boatPosition};
      nextPosition.x += boatXVelocity * delta;
      nextPosition.y += boatYVelocity * delta;
      if(nextPosition.y > maxY) {
        nextPosition.y = maxY;
      }
      if(nextPosition.y < minY) {
        nextPosition.y = minY;
      }
      setBoatPosition(nextPosition);
    }
  };

  useAnimationFrame(updatePosition);

  if (topBoat !== bottomBoat) {
    if (topBoat === "big") {
      boatYVelocity = 4;
    } else {
      boatYVelocity = -4;
    }
  }

  const setBoat = (args: IBoatEdit) => {
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
  const playEnabled = !playing && haveBothBoats === true;

  const reset = () => {
    setTopBoat(undefined);
    setBottomBoat(undefined);
    setBoatPosition({...boatStartPosition});
    setPlaying(false);
  };

  const togglePlay = () => {
    if(playEnabled) {
      if(reachedEnd) {
        reset();
      } else {
        setPlaying(true);
      }
    }
  };


  let dialogContent = boatEdit
    ? <BoatPicker
        location={boatEdit}
        onSelect={ (bigOrSmall)  => {
          setBoat({boatType: bigOrSmall, location: boatEdit});
          setBoatEdit(undefined);
        }}
      />
    : undefined;

  if (!seenInstructions) {
    dialogContent = <BoatInstructions onClick={()=> setSeenInstructions(true)} />;
  }

  let messageType: StatusMessage = "BOAT.START";
  if (!haveBothBoats) {
    messageType = "BOAT.INSTRUCTIONS";
  }
  if (reachedEnd) {
    messageType = "BOAT.FINISH_CENTER";
    if (boatYVelocity > 0) {
      messageType = "BOAT.FINISH_BOTTOM";
    }
    if (boatYVelocity < 0) {
      messageType = "BOAT.FINISH_TOP";
    }
  }

  return (
    <div className="chrome">
      <Dialog nowShowing={dialogContent} />
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
                moving={playing}
                switchBoat={ (loc) => setBoatEdit(loc)}
              />
            </Layer>
        </Stage>
      </div>
      <div className="toolbar">
        <div>
          <IconBack
            name={reachedEnd ? "reset" : "play"}
            selected={!playing && haveBothBoats === true}
            handleSelect={togglePlay}
          >
            { reachedEnd ? <ResetIcon /> : <PlayIcon/> }
          </IconBack>
        </div>
        <MessageArea messageType={messageType} speed={1}/>
      </div>
    </div>
  );
};
