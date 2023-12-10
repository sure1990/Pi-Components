import Container from "react-bootstrap/Container";
import MediaPlayer, { MediaStatusProvider } from "./shared/media-player";

import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <MediaStatusProvider>
      <MediaPlayer />
    </MediaStatusProvider>
  );
}

export default App;
