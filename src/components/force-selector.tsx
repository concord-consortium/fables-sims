import React, { useState } from "react";

import { IconBack } from "./icons/icon-back";
import { MediumForceIcon } from "./icons/medium-force-icon";
import { NoForceIcon } from "./icons/no-force-icon";
import { StrongForceIcon } from "./icons/strong-force-icon";
import { ForceSelection } from "../types";
import t from "../utils/translation/translate";

import "./force-selector.scss";


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
    <div className="force-selector-wrapper">
      <div className="force-selector" data-cy="force-selector">
        <IconBack name={t("CART.FORCE-NONE")} selected={selection==="CART.FORCE-NONE"} handleSelect={()=>select("CART.FORCE-NONE")}>
          <NoForceIcon/>
        </IconBack>
        <IconBack name={t("CART.FORCE-SMALL")} selected={selection==="CART.FORCE-SMALL"} handleSelect={()=>select("CART.FORCE-SMALL")}>
          <MediumForceIcon/>
        </IconBack>
        <IconBack name={t("CART.FORCE-LARGE")} selected={selection==="CART.FORCE-LARGE"} handleSelect={()=>select("CART.FORCE-LARGE")}>
          <StrongForceIcon/>
        </IconBack>
      </div>
    </div>
  );
};
