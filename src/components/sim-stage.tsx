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
  const initialPosition = 6;
  const initialFigurePosition = 1;
  const [force, setForce] = useState<ForceSelection>(null);
  const [cartLocation, setCartLocation] = useState(initialPosition);
  const [figureLocation, setFigureLocation] = useState(initialFigurePosition);
  const [cartVelocity, setCartVelocity] = useState(initialVelocity);
  const [playing, setPlaying] = useState(false);


  const incrementLocation = (args: {time: number, delta:number}) => {
    if(playing) {
      const epsilon = 0.1;
      const mediumForce = 0.006;
      const strongForce = 0.01;
      switch (force) {
        case "medium":
          setCartVelocity(cartVelocity < epsilon ? 0 : cartVelocity - mediumForce);
          break;
        case "strong":
          setCartVelocity(cartVelocity < epsilon ? 0 : cartVelocity - strongForce);
          break;
        default:
          break;
      }
      setCartLocation(cartLocation + cartVelocity);
      if(force === "medium" || force === "strong") {
        setFigureLocation(cartLocation - 14);
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
