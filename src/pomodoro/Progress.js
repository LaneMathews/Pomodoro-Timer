import React from "react";
import classNames from "../utils/class-names";
import { secondsToDuration } from "../utils/duration";
import ProgressBar from "./ProgressBar";
import ProgressHeader from "./ProgressHeader";

function Progress({ stats, isTimerRunning }) {
  const phaseRemaining =
    stats.workTimeRemaining > 0
      ? secondsToDuration(stats.workSetTime)
      : secondsToDuration(Math.ceil(stats.breakTimeRemaining / 60) * 60);

  const phaseDetailRemaining =
    stats.workTimeRemaining > 0
      ? secondsToDuration(stats.workTimeRemaining)
      : secondsToDuration(stats.breakTimeRemaining);
  
  const phaseTitle = (stats.workTimeRemaining > 1) ? "Focusing" : "On Break";

  return (
    <div className={classNames({ hidden: !isTimerRunning })}>
      
      <ProgressHeader
        phase={phaseTitle}
        phaseRemaining={phaseRemaining}
        phaseDetailRemaining={phaseDetailRemaining}
      />
      <ProgressBar stats={stats} phase={phaseTitle} />
      
    </div>
  );
}

export default Progress;