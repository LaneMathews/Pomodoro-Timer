import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import Settings from "./Settings";
import StartStop from "./StartStop";
import Progress from "./Progress";

function Pomodoro() {
  const startState = {
    workSetTime: 1500,
    workTimeRemaining: 1500,
    breakSetTime: 300,
    breakTimeRemaining: 300,
    breakAlarmPlayed: false
  }
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [stats, setStats] = useState(startState);
  const alarm = new Audio(`https://onlineclock.net/audio/options/default.mp3`)
  
  useInterval(
    () => {
      // Still in the focus phase
      if (stats.workTimeRemaining > 0) {
        setStats(() => { return {
          ...stats, 
          workTimeRemaining: (stats.workTimeRemaining - 1)
        }})
      // Now in the break phase
      } else if (stats.breakTimeRemaining > 0) {
        if (!stats.breakAlarmPlayed) alarm.play();
        setStats(() => { return {
          ...stats, 
          breakTimeRemaining: (stats.breakTimeRemaining - 1),
          breakAlarmPlayed: true
        }})
      // Finished round. Reset timer.
      } else {
        alarm.play()
        reset();
      }
    },
    isTimerRunning ? 1000 : null
  );

  const reset = (stop = false) => {
    if (stop) playPause();
    setStats(() => { return {
      ...stats, 
      breakTimeRemaining: stats.breakSetTime,
      workTimeRemaining: stats.workSetTime
    }});
  }

  const plusWorkTime = () => {
    const newTime = Math.min((3300), stats.workSetTime);
    setStats(() => {
      return {
        ...stats,
        workSetTime: (newTime + 300),
        workTimeRemaining: (newTime + 300)
      }
    })
  }
  const minusWorkTime = () => {
    const newTime = Math.max(600, stats.workSetTime);
    setStats(() => {
      return {
        ...stats,
        workSetTime: (newTime - 300),
        workTimeRemaining: (newTime - 300)
      }
    })
  }
  const plusBreakTime = () => {
    const newTime = Math.min((14*60), stats.breakSetTime);
    setStats(() => {
      return {
        ...stats,
        breakSetTime: (newTime + 60),
        breakTimeRemaining: (newTime + 60)
      }
    })
  }
  const minusBreakTime = () => {
    const newTime = Math.max(120, stats.breakSetTime);
    setStats(() => {
      return {
        ...stats,
        breakSetTime: (newTime - 60),
        breakTimeRemaining: (newTime - 60)
      }
    })
  }


  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
  }

  return (
    <div className="pomodoro">
      <Settings shouldBeDisabled={isTimerRunning} stats={stats} stateChangers={{plusWorkTime, minusWorkTime, plusBreakTime, minusBreakTime}}/>
      <StartStop isTimerRunning={isTimerRunning} playPause={playPause} reset={reset} />
      <Progress stats={stats} isTimerRunning={isTimerRunning}/>
    </div>
  );
}

export default Pomodoro;