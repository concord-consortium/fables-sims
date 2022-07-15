import React, { useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import { useElementSize } from "../hooks/useElementSize";
import { ForceSelection, ForceSelector } from "./force-selector";
import { Figure } from "./figure";
import { Car } from "./image-components/car";
import { Cart } from "./image-components/cart";
import { PlayIcon } from "./icons/play-icon";

import "./sim-stage.scss";
import { IconBack } from "./icons/icon-back";
import useAnimationFrame from "../hooks/useAnimationFrame";

interface SimStageProps {
  sceneWidth: number;
  aspectRatio: number;
  children?: React.ReactNode
}

export const SimStage: React.FC<SimStageProps> = (props:SimStageProps) => {

  const {sceneWidth, aspectRatio } = props;
  const [stageRef, { width}] = useElementSize();

  const theWidth = (width||10);
  const sceneHeight = 100 / aspectRatio;
  const scale = theWidth / sceneWidth;

  const maxLocation = 63;
  const initialVelocity = 1;
  const initialPosition = -40;
  const initialFigurePosition = 1;
  const [force, setForce] = useState<ForceSelection>(null);
  const [cartLocation, setCartLocation] = useState(initialPosition);
  const [figureLocation, setFigureLocation] = useState(initialFigurePosition);
  const [cartVelocity, setCartVelocity] = useState(initialVelocity);
  const [playing, setPlaying] = useState(false);

  // Don't feel bad about changing these numbers this simulation doesn't
  // use real units and mass is ignored. Just choose values that look right.
  const epsilon = 0.1;
  const frictionOnly = 0.01;
  const mediumForce = 0.4;
  const strongForce = 0.7;
  const figureArmLength = 14;
  let deltaV = 0;
  const incrementLocation = (args: {time: number, delta:number}) => {
    const { delta } = args;
    if (delta === 0) return;
    if(playing) {
      if(cartLocation > figureLocation) {
        switch (force) {
          case "medium":
            deltaV = mediumForce * delta;
            break;
          case "strong":
            deltaV = strongForce * delta;
            break;
          default:
            deltaV = frictionOnly * delta;
            break;
        }
        if(cartVelocity < epsilon) {
          setCartVelocity(0);
          setPlaying(false);
        }
        setCartVelocity(cartVelocity - deltaV);
      }
      setCartLocation(cartLocation + cartVelocity);
      if(force === "medium" || force === "strong") {
        setFigureLocation(Math.max(cartLocation - figureArmLength, initialFigurePosition));
      }
      if(cartLocation > maxLocation) {
        // TODO display final state
        setPlaying(false);
      }
    }
  };

  const togglePlay = () => {
    if(playing) {
      setPlaying(false);
    } else {
      setCartLocation(initialPosition);
      setCartVelocity(initialVelocity);
      setFigureLocation(initialFigurePosition);
      setPlaying(true);
    }
  };

  useAnimationFrame(incrementLocation);

  return (
    <div className="chrome">
      <div className="readout">
        {(cartVelocity * 6).toFixed(2)} feet per second
      </div>
      <div className="stage-container" ref={stageRef} data-cy="stage">
        <Stage
          width={sceneWidth * scale}
          height={sceneHeight * scale}
          scale={{x: scale, y: scale}}
          >
            <Layer>
              <Rect width={400} height={30} fill="#87A5AF" y={50} x={0}/>
              <Figure location={figureLocation} force={force}/>
              <Cart location={cartLocation} />
              <Car location={85} />
            </Layer>
        </Stage>
      </div>
      <div className="toolbar">
        <ForceSelector selected={null} onChange={(s) => setForce(s)}/>
        <div>
          <IconBack name="Play" selected={true} handleSelect={togglePlay}>
            <PlayIcon/>
          </IconBack>
        </div>
      </div>
    </div>
  );
};
