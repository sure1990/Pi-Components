import { FC, PropsWithChildren, useState } from "react";
import MediaStatusContext from "./media-status.context";

const MediaStatusProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setisPlaying] = useState(false);

  return (
    <MediaStatusContext.Provider
      value={{
        CurrentTime: currentTime,
        IsPlaying: isPlaying,
        UpdateMediaStatus: setisPlaying,
        UpdateTime: setCurrentTime,
      }}
    >
      {children}
    </MediaStatusContext.Provider>
  );
};

export default MediaStatusProvider;
