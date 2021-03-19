import React from "react";
import PropTypes from "prop-types"

function FocusTimer( {getTime, get} ) {
	if(!get("sessionStarted")) return null;

	const currMode = get("focus") ? "focus" : "break";
	const time = 100 - (100 * (get(`${currMode}Left`) / get(`${currMode}Max`)));

	return (
		<div>
			<div className="row mb-2">
				<div className="col">
					<h2 data-testid="session-title">
						{get("focus") ? "Focusing " : "On Break "}
						for {getTime(`${currMode}Max`)} minutes
					</h2>
					<p className="lead" data-testid="session-sub-title">
						{getTime(`${currMode}Left`)} remaining
					</p>
					<h3>{!get("isTimerRunning") ? "PAUSED" : ""}</h3>
				</div>
			</div>
			<div className="row mb-2">
				<div className="col">
					<div className="progress" style={{ height: "20px" }}>
						<div
							className="progress-bar"
							role="progressbar"
							aria-valuemin="0"
							aria-valuemax="100"
							aria-valuenow={time}
							style={{ width: `${time}%` }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

FocusTimer.propTypes = {
	get: PropTypes.func.isRequired,
	getTime: PropTypes.func.isRequired,
}

export default FocusTimer;