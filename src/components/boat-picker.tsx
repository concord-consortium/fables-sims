import React from "react";

import small from "../assets/boat-sides/side-boat-small.png";
import big from "../assets/boat-sides/side-boat-big.png";

import "./boat-picker.scss";

type boatType = "big"|"small";

interface BoatPickerProps {
  onSelect?: (which:boatType) => void;
}

interface Choice {
  title: string,
  img: string,
  id: boatType
}

const choices:Choice[] = [
  {
    title: "small tugboat",
    img: small,
    id: "small"
  },
  {
    title: "big tugboat",
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
        <span className="title">{title}</span>
      </button>
    );
  };

  return(
    <div className="boat-picker">
      Add which tugboat?
      { choices.map(choiceDiv) }
    </div>
  );
};
