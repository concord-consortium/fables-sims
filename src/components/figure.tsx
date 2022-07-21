import React from "react";
import { FigureNoForce } from "./image-components/figure-no-force";
import { FigureMediumForce } from "./image-components/figure-medium-force";
import { FigureStrongForce} from "./image-components/figure-strong-force";
import { Group } from "react-konva";
import { ForceSelection } from "../types";

interface FigureProps {
  x: number;
  y: number;
  force: ForceSelection;
  pull: boolean; // Only pull if the cart is infront. Change image
}

export const Figure = (props: FigureProps) => {
  const { force, x, y, pull } = props;
  if (force === "CART.FORCE-SMALL") {
    if(pull) {
      return <FigureMediumForce x={x} y={y}/>;
    }
    return <FigureNoForce x={x} y={y}/>;

  }
  if (force === "CART.FORCE-LARGE") {
    if(pull) {
      return <FigureStrongForce x={x} y={y}/>;
    }
    // Two non-moving people
    return (
      <Group>
        <FigureNoForce x={x} y={y}/>
        <FigureNoForce x={x + 10} y={y}/>
      </Group>
    );
  }
  return <FigureNoForce x={x} y={y}/>;
};
