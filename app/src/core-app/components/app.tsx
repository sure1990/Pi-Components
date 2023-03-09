import MediaPlayer from "./media-player/media-player.component";

const App = () => {
    const buffer = (window as any).GetFile();
    const blob = new Blob([buffer], { type: "audio/wav" });
    const url = window.URL.createObjectURL(blob);

    return <MediaPlayer src={url} />;
};

export default App;
