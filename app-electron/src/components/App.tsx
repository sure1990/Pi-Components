import Container from "react-bootstrap/Container";
import MediaPlayer, { MediaStatusProvider } from "./shared/media-player";

import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import ConfigManager from "./media-config-manager";

function App() {
  return (
    <div className="m-2 p-2">
      <MediaStatusProvider>
        <MediaPlayer />
        <ConfigManager />
      </MediaStatusProvider>
    </div>
  );
}

export default App;
