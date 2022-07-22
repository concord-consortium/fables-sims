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
  description: string,
  img: string,
  id: BoatType
}

const choices:Choice[] = [
  {
    title: "small tugboat",
    description: "small pushing force",
    img: small,
    id: "small"
  },
  {
    title: "big tugboat",
    description: "large pushing force",
    img: big,
    id: "big"
  }
];



export const BoatPicker: React.FC<BoatPickerProps> = (props:BoatPickerProps) => {
  const {onSelect} = props;

  const choiceDiv = (choice: Choice) => {
    const {id, img, title, description} = choice;
    const onClick = () => {
      if(onSelect) {
        onSelect(id);
      }
    };
    return(
      <button key={id} className="choice" onClick={onClick}>
        <img src={img} />
        <div className="boat-title">{title}</div>
        <div className="boat-description">{description}</div>
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
