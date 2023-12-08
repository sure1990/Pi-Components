import { FC } from "react";

type ButtonToolbarProps = {};

const ButtonToolbar: FC<ButtonToolbarProps> = () => {
  return (
    <div className="btn-group">
      <button type="button" className="btn btn-sm btn-warning">
        Reverse
      </button>
      <button type="button" className="btn btn-sm btn-success">
        Play/Pause
      </button>
      <button type="button" className="btn btn-sm btn-danger">
        Stop
      </button>
      <button type="button" className="btn btn-sm btn-warning">
        Forward
      </button>
    </div>
  );
};

export default ButtonToolbar;
