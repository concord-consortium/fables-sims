import React, { ReactNode } from "react";

import "./dialog.scss";

interface IDialogProps {
  nowShowing?: ReactNode;
}

export const Dialog: React.FC<IDialogProps> = (props:IDialogProps) => {
  const {nowShowing} = props;

  if(nowShowing) {
    return(
      <div id="dialog-background">
        <div className="dialog-content">
          {nowShowing}
        </div>
      </div>
    );
  }
  return null;
};
