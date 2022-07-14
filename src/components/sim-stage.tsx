import React, { useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import { useElementSize } from "../hooks/useElementSize";
import { ForceSelection, ForceSelector } from "./force-selector";
import { Figure } from "./figure";
import { Car } from "./image-components/car";
import { Cart } from "./image-components/cart";

import "./sim-stage.scss";

interface SimStageProps {
  sceneWidth: number;
  aspectRatio: number;
  children?: React.ReactNode
}

export const SimStage: React.FC<SimStageProps> = (props:SimStageProps) => {

  const {sceneWidth, aspectRatio } = props;
  const [stageRef, { width}] = useElementSize();
  const [force, setForce] = useState<ForceSelection>(null);
  const theWidth = (width||10);
  const sceneHeight = 100 / aspectRatio;
  const scale = theWidth / sceneWidth;

  return (
    <div className="chrome">
      <div className="stage-container" ref={stageRef} data-cy="stage">
        <Stage
          width={sceneWidth * scale}
          height={sceneHeight * scale}
          scale={{x: scale, y: scale}}
          >
            <Layer>
              <Rect width={400} height={30} fill="#87A5AF" y={50} x={0}/>
              <Figure location={1} force={force}/>
              <Cart location={16} />
              <Car location={85} />
            </Layer>
        </Stage>
      </div>
      <div className="toolbar">
        <ForceSelector selected={null} onChange={(s) => setForce(s)}/>
      </div>
    </div>
  );
};
