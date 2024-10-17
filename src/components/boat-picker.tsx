import React from "react";

import { BoatLocation, BoatType } from "../types";
import t from "../utils/translation/translate";

import small from "../assets/boat-sides/side-boat-small.png";
import big from "../assets/boat-sides/side-boat-big.png";

import "./boat-picker.scss";

interface BoatPickerProps {
  onSelect?: (which: BoatType) => void;
  location: BoatLocation;
}

interface Choice {
  title: string,
  img: string,
  id: BoatType
}

const choices:Choice[] = [
  {
    title: t("BOAT.FORCE-SMALL"),
    img: small,
    id: "small"
  },
  {
    title: t("BOAT.FORCE-LARGE"),
    img: big,
    id: "big"
  }
];



export const BoatPicker: React.FC<BoatPickerProps> = (props:BoatPickerProps) => {
  const {onSelect} = props;

  const choiceDiv = (choice: Choice) => {
    const {id, img, title} = choice;
    const onClick = () => {
      if(onSelect) {
        onSelect(id);
      }
    };
    return(
      <button key={id} className="choice" onClick={onClick}>
        <img src={img} />
        <div className="boat-title">{title}</div>
      </button>
    );
  };

  return(
    <div className="boat-picker">
      { t("BOAT.PICK_INSTRUCTIONS")}
      { choices.map(choiceDiv) }
    </div>
  );
};
