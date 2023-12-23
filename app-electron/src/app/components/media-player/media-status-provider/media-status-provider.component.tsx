import { FC, PropsWithChildren, useState } from "react";
import MediaStatusContext from "./media-status.context";

const MediaStatusProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setisPlaying] = useState(false);

  return (
    <MediaStatusContext.Provider
      value={{
        CurrentTime: currentTime,
        IsPlaying: isPlaying,
        Duration: duration,
        UpdateMediaStatus: setisPlaying,
        UpdateTime: setCurrentTime,
        UpdateDuration: setDuration,
      }}
    >
      {children}
    </MediaStatusContext.Provider>
  );
};

export default MediaStatusProvider;
