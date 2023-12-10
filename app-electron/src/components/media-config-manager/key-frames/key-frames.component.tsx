import ProgressBar from "react-bootstrap/ProgressBar";
import "./key-frames.component.scss";

const KeyFrames = () => {
  return (
    <ProgressBar>
      {CreateFrame("1", 50, 25, undefined, "bg-none")}
      {CreateFrame("2", 50, 25)}
      {/* {CreateFrame("2", 10, "danger")}
      {CreateFrame("3", 20)}
      {CreateFrame("4", 20, "bg-none")}
      {CreateFrame("5", 10, "warning")}
      {CreateFrame("6", 10, undefined, "bg-none")} */}
    </ProgressBar>
  );
};

function CreateFrame(
  key: string,
  max: number,
  progress: number,
  variant: string = "success",
  className?: string
) {
  return (
    <ProgressBar
      variant={className ? undefined : variant}
      key={key}
      now={progress}
      className={className}
      max={max}
    />
  );
}

export default KeyFrames;
