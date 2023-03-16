import { useEffect, useState } from "react";
import MediaPlayer from "./media-player/media-player.component";
import MusicMapper from "./music-mapper/Music-Mapper.component";

const App = () => {
  const buffer = (window as any).GetFile();
  const blob = new Blob([buffer], { type: "audio/wav" });
  const url = window.URL.createObjectURL(blob);

  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  return (
    <>
      <MediaPlayer
        src={url}
        onPlayPause={(paused) => setPaused(paused)}
        onTimeChange={(time, duration) => {
          setCurrentTime(time);
          setTotalTime(duration);
        }}
      />
      <MusicMapper
        isPaused={paused}
        currentTime={currentTime}
        totalTime={totalTime}
      />
    </>
  );
};

export default App;
