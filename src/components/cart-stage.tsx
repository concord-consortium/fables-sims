import React, { useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import { useElementSize } from "../hooks/useElementSize";
import { ForceSelector } from "./force-selector";
import { Figure } from "./figure";
import { Car } from "./image-components/car";
import { Cart } from "./image-components/cart";
import { PlayIcon } from "./icons/play-icon";
import { Bam } from "./image-components/bam";
import t from "../utils/translation/translate";

import { IconBack } from "./icons/icon-back";
import useAnimationFrame from "../hooks/useAnimationFrame";

import { MessageArea } from "./message-area";
import { CartStatus, ForceSelection } from "../types";
import { MeterPanel } from "./icons/meter-panel";

import "./stage.scss";
interface CartStageProps {
  sceneWidth: number;
  aspectRatio: number;
  children?: React.ReactNode
}

export const maxFeetPerSecond = 6;
const maxLocation = 63;
const initialVelocity = 1;
const initialPosition = -40;
const initialFigurePosition = 1;
const epsilon = 0.0001;
const frictionOnly = 0.01;
const forceSmall = 0.4;
const forceLarge = 0.7;
const figureArmLength = 14;

export const CartStage: React.FC<CartStageProps> = (props:CartStageProps) => {

  const {sceneWidth, aspectRatio } = props;
  const [stageRef, { width}] = useElementSize();

  const theWidth = (width||10);
  const height = width / aspectRatio;
  const scale = theWidth / sceneWidth;


  const [force, setForce] = useState<ForceSelection>("CART.FORCE-NONE");
  const [cartLocation, setCartLocation] = useState(initialPosition);
  const [figureLocation, setFigureLocation] = useState(initialFigurePosition);
  const [cartVelocity, setCartVelocity] = useState(initialVelocity);
  const [playing, setPlaying] = useState(false);
  const [status, setStatus] = useState<CartStatus>("CART.START");

  // Don't feel bad about changing these numbers this simulation doesn't
  // use real units and mass is ignored. Just choose values that look right.

  let deltaV = 0;
  const incrementLocation = (args: {time: number, delta:number}) => {
    const { delta } = args;
    if (delta === 0) return;
    if(playing) {
      if(cartLocation > figureLocation) {
        switch (force) {
          case "CART.FORCE-SMALL":
            deltaV = forceSmall * delta;
            break;
          case "CART.FORCE-LARGE":
            deltaV = forceLarge * delta;
            break;
          default:
            deltaV = frictionOnly * delta;
            break;
        }
        setCartVelocity(cartVelocity - deltaV);
        if(cartVelocity < epsilon) {
          setCartVelocity(0);
          setPlaying(false);
          setStatus("CART.SUCCESS");
        }
      }
      setCartLocation(cartLocation + (cartVelocity * delta * 60));
      if(force === "CART.FORCE-SMALL" || force === "CART.FORCE-LARGE") {
        setFigureLocation(Math.max(cartLocation - figureArmLength, initialFigurePosition));
      }
      if(cartLocation > maxLocation) {
        // TODO display final state
        setPlaying(false);
        setStatus("CART.FAIL");
      }
    }
  };

  const reset = () => {
    setCartLocation(initialPosition);
    setCartVelocity(initialVelocity);
    setFigureLocation(initialFigurePosition);
    setStatus("CART.START");
  };

  const togglePlay = () => {
    if(playing) {
      setPlaying(false);
    } else {
      reset();
      setPlaying(true);
    }
  };

  const selectForce = (f: ForceSelection) => {
    setForce(f);
    reset();
  };

  useAnimationFrame(incrementLocation);

  // const showVelocity = status !== "CART.START" || playing;
  return (
    <div className="chrome">
      {/* <VelocityPanel velocity={cartVelocity} show={showVelocity}/> */}
      <MeterPanel speed={cartVelocity} size={"10em"} />
      <div className="stage-container" ref={stageRef} data-cy="stage">
        <Stage
          width={width}
          height={height}
          scale={{x: scale, y: scale}}
          >
            <Layer>
              <Rect width={400} height={30} fill="#87A5AF" y={35} x={0}/>
              <Figure
                pull={cartLocation > figureLocation}
                force={force}
                x={figureLocation} y={22}
              />
              <Cart x={cartLocation} y={25}/>
              <Car x={85} y={23}/>
              {(status === "CART.FAIL") && <Bam x={71} y={22}/>}
            </Layer>
        </Stage>
      </div>
      <div className="tool-label">{t("CART.PULLING-FORCE")}:</div>
      <div className="toolbar">
        <ForceSelector selected={force} onChange={selectForce}/>
        <div className="play-button">
          <IconBack name={t("PLAY")} selected={!playing} handleSelect={!playing ? togglePlay : undefined}>
            <PlayIcon/>
          </IconBack>
        </div>
        <MessageArea messageType={status} speed={cartVelocity}/>
      </div>
    </div>
  );
};
