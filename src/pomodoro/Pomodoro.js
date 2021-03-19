import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import Initialize from "./Initialize";
import StartStop from "./StartStop";
import FocusTimer from "./FocusTimer";

function Pomodoro() {
  const initTimer = {
		focusMax: 60 * 25, // 60sec * 25min
		focusLeft: 60 * 25, 
		focusFloor: 60 * 5, // 60sec * 5min
		focusRoof: 60 * 60, // 60sec * 60min

		breakMax: 60 * 5, // 60sec * 5min
		breakLeft: 60 * 5,
		breakFloor: 60 * 1, // 60sec * 1min
		breakRoof: 60 * 15, // 60sec * 15min

		isTimerRunning: false,
		focus: true,
		sessionStarted: false,
	};
  const [timer, setTimer] = useState({...initTimer});

	useInterval(
    () => {
			if(timer.focusLeft < 0 || timer.breakLeft < 0)
				switchModes();
			else {
				if(timer.focus)
					timePassed("focusLeft");
				else
					timePassed("breakLeft");	
			}
    },
    timer.isTimerRunning ? 1000 : null
  );

	function timePassed(mode) {
		setTimer(() => {
			return {
				...timer,
				[mode]: timer[mode] - 1,
			};
		});
	}

	function switchModes() {
		new Audio(`${process.env.PUBLIC_URL}/alarm/submarine-dive-horn.mp3`).play();
		setTimer(() => {
			return {
				...timer, 
				focusLeft: timer.focusMax,
				breakLeft: timer.breakMax,
				focus: !timer.focus,
			};
		});
	}

	function pad(num) {
		return num < 10 ? "0" + num : num;
	}

	function getTime(mode) {
		return `${ pad(Math.floor(timer[mode] / 60)) }:${ pad(timer[mode] % 60) }`;
	}

	function get(key) {
		return timer[key];
	}

	function changeMax(mode, change) {
		const newTime = change < 0
			? Math.max(timer[mode + "Floor"], timer[mode + "Max"] + change)
			: Math.min(timer[mode + "Roof"], timer[mode + "Max"] + change);

		setTimer(() => {
			return {
				...timer,
				[mode + "Max"]: newTime,
				[mode + "Left"]: newTime,
			};
		});
	}

  function playPause() {
    setTimer(() => {
			return {
				...timer, 
				isTimerRunning: !timer.isTimerRunning,
				sessionStarted: true,
			};
		});
  }

	function stop() {
		setTimer(() => {
			return {
				...timer,
				isTimerRunning: false,
				sessionStarted: false,
				focusLeft: timer.focusMax,
				breakLeft: timer.breakMax,
				focus: true,
			};
		});
	}

  return (
    <div className="pomodoro">
      <Initialize 
				changeMax={changeMax}
				getTime={getTime}
			/>

      <StartStop 
				playPause={playPause}
				get={get}
				stop={stop}
			/>

			<FocusTimer 
				getTime={getTime}
				get={get}
			/>
    </div>
  );
}

export default Pomodoro;