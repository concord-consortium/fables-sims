import React, { useState } from "react";

import { IconBack } from "./icons/icon-back";
import { MediumForceIcon } from "./icons/medium-force-icon";
import { NoForceIcon } from "./icons/no-force-icon";
import { StrongForceIcon } from "./icons/strong-force-icon";
import "./sim-stage.scss";

export type ForceSelection = null | "none" | "medium" | "strong";
interface ForceSelectorProps {
  selected?: ForceSelection;
  onChange?: (s: ForceSelection) => void;
}

export const ForceSelector: React.FC<ForceSelectorProps> = (props:ForceSelectorProps) => {
  const {selected, onChange} = props;
  const [selection, setSelection] = useState<ForceSelection>(selected||null);

  const select = (item: ForceSelection) => {
    if(onChange) {
      onChange(item);
    }
    setSelection(item);
  };

  return (
    <div className="controls" data-cy="force-selector">
      <IconBack selected={selection==="none"} handleSelect={()=>select("none")}>
        <NoForceIcon/>
      </IconBack>
      <IconBack selected={selection==="medium"} handleSelect={()=>select("medium")}>
        <MediumForceIcon/>
      </IconBack>
      <IconBack selected={selection==="strong"} handleSelect={()=>select("strong")}>
        <StrongForceIcon/>
      </IconBack>
    </div>
  );
};
