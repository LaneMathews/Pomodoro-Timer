import React from "react";
import classNames from "../utils/class-names";

function Button({ shouldBeDisabled, testId, testIdPrefix, iconName, stateChangers }) {
  const handleClick = (e) => {
    switch (`${testId} ${iconName}`) {
      case "focus plus":
        stateChangers.plusWorkTime();
        break;
      case "focus minus":
        stateChangers.minusWorkTime();
        break;
      case "break plus":
        stateChangers.plusBreakTime();
        break;
      case "break minus":
        stateChangers.minusBreakTime();
        break;
      default:
        break;
    }
  }
  return (
    <button
      type="button"
      onClick={handleClick}
      className={classNames({
        btn: true,
        "btn-secondary": true,
        disabled: shouldBeDisabled,
      })}
      data-testid={`${testIdPrefix}-${testId}`}
    >
      <span className={`oi oi-${iconName}`} />
    </button>
  );
}

export default Button;