import React from "react";

import "./icon-back.scss";

export interface IconBackProps {
  selected: boolean;
  handleSelect?: () => void;
  children?: React.ReactNode
}

export const IconBack: React.FC<IconBackProps> = (props: IconBackProps) => {
  const { selected, handleSelect, children } = props;
  const className = selected ? "icon-back selected" : "icon-back";

  return(
    <div className={className} onClick={handleSelect}>
      { children }
    </div>
  );
};

