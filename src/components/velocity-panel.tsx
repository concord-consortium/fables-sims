import React from "react";

import "./velocity-panel.scss";

interface VelocityPanelProps {
  velocity: number;
  label?: string;
}

export const VelocityPanel: React.FC<VelocityPanelProps> = (props:VelocityPanelProps) => {

  const {velocity, label } = props;
  const labelString = label || "feet per second";
  const maxVelocity = 6;
  const maxBoxWidth = 60;
  const maxBoxHeight = 10;
  const realV = velocity * maxVelocity;

  return (
    <div className="velocity-panel">
      <div className="label">
        {(realV).toFixed(2)} {labelString}
      </div>
      <svg
        viewBox={`0 0 ${maxBoxWidth} ${maxBoxHeight}`}
        xmlns="http://www.w3.org/2000/svg">

        <pattern id="marks" width="17%" height="100%">
          <line x1="10" y1="3" x2="10" y2="7" stroke="#0481A0" strokeWidth={2}/>
        </pattern>


        <rect width={maxBoxWidth} height={maxBoxHeight} fill="white" />
        {(velocity > 0) && <rect
          width={velocity * maxBoxWidth}
          y={maxBoxHeight/10}
          height={maxBoxHeight/10 * 8}
          className="bar" />
        }
        <rect width={maxBoxWidth} height={maxBoxHeight} fill="url(#marks)" />
      </svg>
    </div>
  );
};
