import React from "react";

function ProgressBar({ stats, phase }) {
  const percentageWorkComplete =
    ((stats.workSetTime - stats.workTimeRemaining) * 100) / stats.workSetTime;
    
  const percentageBreakComplete =
    ((stats.breakSetTime - stats.breakTimeRemaining) * 100) /
    stats.breakSetTime;

  const percentageComplete =
    phase === "Focusing" ? percentageWorkComplete : percentageBreakComplete;

  return (
    <div className="row mb-2">
      <div className="col">
        <div className="progress" style={{ height: "20px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={percentageComplete} // TODO: Increase aria-valuenow as elapsed time increases
            style={{ width: `${percentageComplete}%` }} // TODO: Increase width % as elapsed time increases
          />
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;