import { FC } from "react";

type ButtonToolbarProps = {
  disabled?: boolean;
  onPlayPause: () => void;
  onStop: () => void;
};

const ButtonToolbar: FC<ButtonToolbarProps> = ({
  disabled,
  onPlayPause,
  onStop,
}) => {
  return (
    <div className="btn-group">
      <button
        type="button"
        className="btn btn-sm btn-warning"
        disabled={disabled}
      >
        Reverse
      </button>
      <button
        type="button"
        className="btn btn-sm btn-success"
        disabled={disabled}
        onClick={onPlayPause}
      >
        Play/Pause
      </button>
      <button
        type="button"
        className="btn btn-sm btn-danger"
        disabled={disabled}
        onClick={onStop}
      >
        Stop
      </button>
      <button
        type="button"
        className="btn btn-sm btn-warning"
        disabled={disabled}
      >
        Forward
      </button>
    </div>
  );
};

export default ButtonToolbar;
