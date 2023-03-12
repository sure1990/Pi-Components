import React from "react";
import { useKeyListener } from "../../hooks";
import KeyProgress from "./key-progress.component";

const MusicMapper = () => {
  const keyTrack = useKeyListener();
  return (
    <div className="d-flex flex-column">
      {Object.keys(keyTrack).map((x) => {
        return (
          <div className="p-2">
            <KeyProgress key={x} KeyCode={x} />
          </div>
        );
      })}
    </div>
  );
};

export default MusicMapper;
