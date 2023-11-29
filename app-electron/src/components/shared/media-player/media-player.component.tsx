import ButtonToolbar from "./button-toolbar/button-toolbar.component";
import "./media-player.component.scss";
import Progress from "./progress/progress.component";

const MediaPlayer = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md progress-container">
          <Progress />
        </div>
      </div>
      <div className="row">
        <div className="col-md text-center button-toolbar-container">
          <ButtonToolbar />
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer;
