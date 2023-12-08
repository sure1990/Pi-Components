import Container from "react-bootstrap/Container";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import MediaPlayer from "./shared/media-player";
import { MediaStatusProvider } from "./shared/media-status";
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
