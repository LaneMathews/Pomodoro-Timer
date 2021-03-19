import React from "react";

function ProgressHeader({ phase, phaseRemaining, phaseDetailRemaining }) {
  return (
    <div className="row mb-2">
      <div className="col">

        <h2 data-testid="session-title">
          {phase} for {phaseRemaining} minutes
        </h2>

        <p className="lead" data-testid="session-sub-title">
          {phaseDetailRemaining} remaining
        </p>
        
      </div>
    </div>
  );
}

export default ProgressHeader;