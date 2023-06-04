import { ChangeEvent, useCallback, useEffect, useState } from "react";
import MediaPlayer from "./media-player/media-player.component";
import MusicMapper from "./music-mapper/music-mapper.component";
import MediaPlayerContext from "../context/media-player.context";
import sample from "../sample/sample-15s.mp3";

const Configure = () => {
  const [paused, setPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  return (
    <>
      <MediaPlayer
        src={sample}
        onPlayPause={(paused) => setPaused(false)}
        onTimeChange={(time, duration) => {
          setCurrentTime(time);
          setTotalTime(duration);
        }}
      />
      <MediaPlayerContext.Provider
        value={{
          CurrentTime: currentTime,
          TotalDuration: totalTime,
          isPaused: paused,
        }}
      >
        <MusicMapper />
      </MediaPlayerContext.Provider>
    </>
  );
};

export default Configure;
