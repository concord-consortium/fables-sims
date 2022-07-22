import React from "react";

// import small from "../assets/boat-sides/side-boat-small.png";
// import big from "../assets/boat-sides/side-boat-big.png";
import img from "../assets/boat-instructions-01.png";
import t from "../utils/translation/translate";

import "./boat-instructions.scss";


interface BoatInstructionProps {
  onClick?: (p: any) => void;
}

export const BoatInstructions: React.FC<BoatInstructionProps> = (props:BoatInstructionProps) => {
  const {onClick} = props;

  return(
    <div className="boat-instructions">
      <div className="left-image">
        <img src={img}/>
      </div>
      <div className="instructions">
        <div>
          <span>{t("BOAT.INSTRUCTIONS")}</span>
        </div>
        <div>
          <button className="dismiss" onClick={onClick}> OK </button>
        </div>
      </div>
    </div>
  );
};
