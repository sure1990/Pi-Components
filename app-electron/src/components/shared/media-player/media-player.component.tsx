import { useCallback, useEffect } from "react";
import sampleMp3 from "../../../assets/temp/sample-audio";
import ButtonToolbar from "./button-toolbar/button-toolbar.component";
import useMediaPlayerOperations from "./media-player-operations";
import "./media-player.component.scss";
import Progress from "./progress/progress.component";

const MediaPlayer = () => {
  const { IsReady, TotalDuration, CurrentPosition, PlayPause, StopPlayback } =
    useMediaPlayerOperations(sampleMp3);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md progress-container">
          <Progress total={TotalDuration} current={CurrentPosition} />
        </div>
      </div>
      <div className="row">
        <div className="col-md text-center button-toolbar-container">
          <ButtonToolbar
            disabled={!IsReady}
            onPlayPause={PlayPause}
            onStop={StopPlayback}
          />
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer;
