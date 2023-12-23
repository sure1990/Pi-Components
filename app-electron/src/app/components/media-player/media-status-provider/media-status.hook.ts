import { useContext } from "react";
import MediaStatusContext from "./media-status.context";

const useMediaStatus = () => {
  const { CurrentTime, IsPlaying, Duration } = useContext(MediaStatusContext);

  return { CurrentTime, IsPlaying, Duration };
};

export default useMediaStatus;
