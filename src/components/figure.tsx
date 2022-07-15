import React from "react";
import { FigureNoForce } from "./image-components/figure-no-force";
import { FigureMediumForce } from "./image-components/figure-medium-force";
import { FigureStrongForce} from "./image-components/figure-strong-force";

import "./app.scss";

interface FigureProps {
  x: number;
  y: number;
  force: null | "none" | "medium" | "strong";
}

export const Figure = (props: FigureProps) => {
  const { force, x, y } = props;
  if (force === "medium") {
    return <FigureMediumForce x={x} y={y}/>;
  }
  if (force === "strong") {
    return <FigureStrongForce x={x} y={y}/>;
  }
  return <FigureNoForce x={x} y={y}/>;
};
