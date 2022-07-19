import React, { useState } from "react";
import { Stage, Layer } from "react-konva";
import { useElementSize } from "../hooks/useElementSize";
import { BoatGround } from "./image-components/boat-background";
import { CargoBoat } from "./image-components/cargo-boat";
import { PlayIcon } from "./icons/play-icon";

import "./tugboat-stage.scss";
import { IconBack } from "./icons/icon-back";
// import useAnimationFrame from "../hooks/useAnimationFrame";
import { MessageArea } from "./message-area";
import { TugboatChoices } from "./image-components/tugboat-choices";
import { TugboatSlot } from "./image-components/tugboat-slot";
import { WaterChurn } from "./image-components/water-churn";

interface TugboatStageProps {
  sceneWidth: number;
  aspectRatio: number;
  children?: React.ReactNode
}

export const maxFeetPerSecond = 6;

export const TugboatStage: React.FC<TugboatStageProps> = (props:TugboatStageProps) => {

  const {sceneWidth, aspectRatio } = props;
  const [stageRef, { width}] = useElementSize();

  const theWidth = (width||10);
  const height = width / aspectRatio;
  const scale = theWidth / sceneWidth;

  const [playing, setPlaying] = useState(false);
  // const [status, setStatus] = useState<"start"|"left"|"center"|"right">("start");

  // Don't feel bad about changing these numbers this simulation doesn't
  // use real units and mass is ignored. Just choose values that look right.

  // const reset = () => {
  //   setStatus("start");
  // };

  const togglePlay = () => {
    if(playing) {
      setPlaying(false);
    } else {
      // reset();
      setPlaying(true);
    }
  };


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
              <CargoBoat x={2} y={20} />
              <TugboatSlot x={10} y={6} boat="small"/>
              <TugboatSlot x={10} y={30} boat="small" />
              <TugboatChoices x={45} y={10} />
              <WaterChurn x={3} y={4} />
            </Layer>
        </Stage>
      </div>
      <div className="toolbar">
        <div>
          <IconBack name="Play" selected={!playing} handleSelect={!playing ? togglePlay : undefined}>
            <PlayIcon/>
          </IconBack>
        </div>
        <MessageArea messageType="start" speed={1}/>
      </div>
    </div>
  );
};
