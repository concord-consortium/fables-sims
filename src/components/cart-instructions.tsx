import React from "react";

// import small from "../assets/boat-sides/side-boat-small.png";
// import big from "../assets/boat-sides/side-boat-big.png";
import img from "../assets/cart-in-rect.png";
import t from "../utils/translation/translate";

import "./cart-instructions.scss";

interface CartInstructionProps {
  onClick?: (p: any) => void;
}

export const CartInstructions: React.FC<CartInstructionProps> = (props:CartInstructionProps) => {
  const {onClick} = props;

  return(
    <div className="boat-instructions" data-cy="instructions">
      <div className="left-image">
        <img src={img}/>
      </div>
      <div className="instructions">
        <div>
          <span>{t("CART.INSTRUCTIONS")}</span>
        </div>
        <div>
          <button className="dismiss" onClick={onClick}>{t("OK")}</button>
        </div>
      </div>
    </div>
  );
};
