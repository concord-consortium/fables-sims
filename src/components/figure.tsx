import React from "react";
import { FigureNoForce } from "./image-components/figure-no-force";
import { FigureMediumForce } from "./image-components/figure-medium-force";
import { FigureStrongForce} from "./image-components/figure-strong-force";

import "./app.scss";

interface FigureProps {
  location: number;
  force: null | "none" | "medium" | "strong";
}

export const Figure = (props: FigureProps) => {
  const { force, location } = props;
  if (force === "medium") {
    return <FigureMediumForce x={location} y={22}/>;
  }
  if (force === "strong") {
    return <FigureStrongForce x={location} y={22}/>;
  }
  return <FigureNoForce x={location} y={22}/>;
};
