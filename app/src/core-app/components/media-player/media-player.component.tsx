import { useEffect } from "react";
import { useKeyListener } from "../../hooks";

const MediaPlayer = () => {

    useKeyListener();

    useEffect(() => {

        // console.log(key);
    }, [])

    return (<div>
        <button type="button">PLAY</button>
        <button type="button">Stop</button>
    </div>)
}

export default MediaPlayer;