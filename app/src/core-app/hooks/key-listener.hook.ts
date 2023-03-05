import { useEffect, useState, useCallback, useRef } from "react";
import PiService from "../services/pi.service";

const useKeyListener = () => {

    const [keyTrack, _setKeyTrack] = useState<{ [key: string]: number }>({})

    const keyTrackRef = useRef(keyTrack);

    const setKeyTrack = (state: { [key: string]: number }) => {

        _setKeyTrack(prev => {
            const newState = { ...prev, ...state }
            keyTrackRef.current = newState;
            return newState;
        })
    }

    useEffect(() => {



    }, [keyTrack])

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        const { key } = event;
        console.log(key, GetAscii(key));
        const track = keyTrackRef.current[key];
        if (track === undefined || track === 0) {
            PiService.On(GetAscii(key) - 64)
            setKeyTrack({ [key]: 1 })
        }
    }, []);

    const handleKeyUp = useCallback((event: KeyboardEvent) => {
        const { key } = event;

        if (keyTrackRef.current[key] != undefined) {
            PiService.Off(GetAscii(key) - 64)
            setKeyTrack({ [key]: 0 })
        }
    }, []);


    useEffect(() => {

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        }

    }, [])


}



function GetAscii(key: string) {
    return key.charCodeAt(0);
}


export default useKeyListener;