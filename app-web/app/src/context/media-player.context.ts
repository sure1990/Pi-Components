import React from "react";

const MediaPlayerContext = React.createContext({
  CurrentTime: 0,
  TotalDuration: 0,
  isPaused: true,
});

export default MediaPlayerContext;
