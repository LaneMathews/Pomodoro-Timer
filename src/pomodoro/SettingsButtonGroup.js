import React from "react";
import Button from "./Button";

function SettingsButtonGroup({
  shouldBeDisabled,
  settingName,
  durationAmount,
  testId,
  stateChangers,
}) {
  return (
    <div className="input-group input-group-lg mb-2">
      <span className="input-group-text" data-testid={`duration-${testId}`}>
        {`${settingName}: ${durationAmount}`}
      </span>
      <div className="input-group-append">
        <Button
          testId={testId}
          stateChangers={stateChangers}
          testIdPrefix="decrease"
          iconName="minus"
          shouldBeDisabled={shouldBeDisabled}
        />

        <Button
          testId={testId}
          stateChangers={stateChangers}
          testIdPrefix="increase"
          iconName="plus"
          shouldBeDisabled={shouldBeDisabled}
        />
      </div>
    </div>
  );
}

export default SettingsButtonGroup;