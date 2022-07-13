import React from "react";

import "./icon-back.scss";

export interface IconBackProps {
  selected: boolean;
  name: string;
  handleSelect?: () => void;
  children?: React.ReactNode
}

export const IconBack: React.FC<IconBackProps> = (props: IconBackProps) => {
  const { selected, handleSelect, children, name } = props;
  const className = selected ? "icon-back selected" : "icon-back";

  return(
    <div className={selected ? "button-with-label selected" : "button-with-label"} >
      <div className={className} onClick={handleSelect}>
        { children }
      </div>
      <div className="label">
        {name}
      </div>
    </div>
  );
};

