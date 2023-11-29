import Container from "react-bootstrap/Container";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import MediaPlayer from "./shared/media-player";
function App() {
  return (
    <Container>
      <MediaPlayer />
    </Container>
  );
}

export default App;
