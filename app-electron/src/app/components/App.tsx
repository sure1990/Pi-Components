import MediaPlayer, { MediaStatusProvider } from './media-player';
import ConfigManager from './media-config-manager';

import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

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
