import Container from "react-bootstrap/Container";
import "./App.scss";
import "../assets/icons/style.css";
import AudioPlayer from "./audio-player/audio-player.component";
import ProgressPlayer from "./progress-player/progress-player.component";
function App() {
  return (
    <>
      <AudioPlayer />
      <ProgressPlayer />
    </>
  );
}

export default App;
