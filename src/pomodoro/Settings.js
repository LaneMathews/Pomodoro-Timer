import React from "react";
import SettingsButtonGroup from "./SettingsButtonGroup";
import { secondsToDuration } from "../utils/duration";

function Settings({ stats, shouldBeDisabled, stateChangers }) {
  return (
    <div className="row">
      <div className="col">
        <SettingsButtonGroup
          settingName="Focus Duration"
          durationAmount={secondsToDuration(stats.workSetTime)}
          testId="focus"
          shouldBeDisabled={shouldBeDisabled}
          stateChangers={stateChangers}
        />
      </div>
      <div className="col">
        <div className="float-right">
          <SettingsButtonGroup
            settingName="Break Duration"
            durationAmount={secondsToDuration(stats.breakSetTime)}
            testId="break"
            shouldBeDisabled={shouldBeDisabled}
            stateChangers={stateChangers}
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;