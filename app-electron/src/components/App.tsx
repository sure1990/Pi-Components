import Container from "react-bootstrap/Container";
import MediaPlayer from "./shared/media-player";
import { MediaStatusProvider } from "./shared/media-player";

import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <Container>
      <MediaStatusProvider>
        <MediaPlayer />
      </MediaStatusProvider>
    </Container>
  );
}

export default App;
