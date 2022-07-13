import React from "react";
import { GuyNoForce } from "./image-components/guy-no-force";
import { GuyMediumForce } from "./image-components/guy-medium-force";
import { GuyStrongForce} from "./image-components/guy-strong-force";

import "./app.scss";

interface GuyProps {
  location: number;
  force: null | "none" | "medium" | "strong";
}

export const Guy = (props: GuyProps) => {
  const { force, location } = props;
  if (force === "medium") {
    return <GuyMediumForce x={location} />;
  }
  if (force === "strong") {
    return <GuyStrongForce x={location} />;
  }
  return <GuyNoForce x={location}/>;
};
