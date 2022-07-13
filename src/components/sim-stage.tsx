import React from "react";
import { Stage, Layer } from "react-konva";
import { useElementSize } from "../hooks/useElementSize";
import { IconBack } from "./icons/icon-back";
import { MediumForceIcon } from "./icons/medium-force-icon";
import { NoForceIcon } from "./icons/no-force-icon";
import { StrongForceIcon } from "./icons/strong-force-icon";
import "./sim-stage.scss";

interface SimStageProps {
  sceneWidth: number;
  aspectRatio: number;
  children?: React.ReactNode
}

export const SimStage: React.FC<SimStageProps> = (props:SimStageProps) => {

  const {sceneWidth, aspectRatio, children } = props;
  const [stageRef, { width}] = useElementSize();

  const padding = 10;
  const theWidth = (width||0) - 2 * padding;

  const sceneHeight = 100 / aspectRatio;
  const scale = theWidth / sceneWidth;

  return (
    <div className="chrome">
      <div className="stage-container" ref={stageRef}>
        <Stage
          width={sceneWidth * scale}
          height={sceneHeight * scale}
          scale={{x: scale, y: scale}}
          >
            <Layer>
              {children}
            </Layer>
        </Stage>
      </div>
      <div className="controls">
        <IconBack selected={true}>
          <NoForceIcon/>
        </IconBack>
        <IconBack selected={true}>
          <MediumForceIcon/>
        </IconBack>
        <IconBack selected={true}>
          <StrongForceIcon/>
        </IconBack>
      </div>
    </div>
  );
};
