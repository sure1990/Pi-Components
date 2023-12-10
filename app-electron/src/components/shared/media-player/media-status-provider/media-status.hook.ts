import { useContext } from "react";
import MediaStatusContext from "./media-status.context";

const useMediaStatus = () => {
  const { CurrentTime, IsPlaying } = useContext(MediaStatusContext);

  return { CurrentTime, IsPlaying };
};

export default useMediaStatus;
