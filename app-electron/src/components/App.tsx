import Container from "react-bootstrap/Container";
import MediaPlayer, { MediaStatusProvider } from "./shared/media-player";

import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import ConfigManager from "./media-config-manager";
import KeyPressProvider from "./shared/key-press-tracker";

function App() {
  return (
    <KeyPressProvider>
      <div className="m-2 p-2">
        <MediaStatusProvider>
          <MediaPlayer />
          <ConfigManager />
        </MediaStatusProvider>
      </div>
    </KeyPressProvider>
  );
}

export default App;
