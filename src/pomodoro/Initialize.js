import React from "react";
import PropTypes from "prop-types";

function Initialize( {changeMax, getTime} ) {

	function handleChange(event) {
		switch(event.target.dataset.testid) {
			case "decrease-focus": changeMax("focus", 60 * -5); break;
			case "increase-focus": changeMax("focus", 60 * 5); break;
			case "decrease-break": changeMax("break", 60 * -1); break;
			case "increase-break": changeMax("break", 60 * 1); break;
			default: console.log("Something went wrong! @handleChange"); break;
		}
	}

	return (
		<div className="row">
			<div className="col">
				<div className="input-group input-group-lg mb-2">
					<span className="input-group-text" data-testid="duration-focus">
						Focus Duration: {getTime("focusMax")}
					</span>

					<div className="input-group-append">
						<button
							type="button"
							className="btn btn-secondary"
							data-testid="decrease-focus"
							onClick={handleChange}
						>
							<span className="oi oi-minus" />
						</button>

						<button
							type="button"
							className="btn btn-secondary"
							data-testid="increase-focus"
							onClick={handleChange}
						>
							<span className="oi oi-plus" />
						</button>
					</div>
				</div>
			</div>

			<div className="col">
				<div className="float-right">
					<div className="input-group input-group-lg mb-2">
						<span className="input-group-text" data-testid="duration-break">
							Break Duration: {getTime("breakMax")}
						</span>

						<div className="input-group-append">
							<button
								type="button"
								className="btn btn-secondary"
								data-testid="decrease-break"
								onClick={handleChange}
							>
								<span className="oi oi-minus" />
							</button>

							<button
								type="button"
								className="btn btn-secondary"
								data-testid="increase-break"
								onClick={handleChange}
							>
								<span className="oi oi-plus" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

Initialize.propTypes = {
	changeMax: PropTypes.func.isRequired,
	getTime: PropTypes.func.isRequired,
}

export default Initialize