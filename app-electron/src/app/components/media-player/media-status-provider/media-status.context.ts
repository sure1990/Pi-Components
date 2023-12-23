import { createContext } from "react";

type MediaStatusContextType = {
  CurrentTime: number;
  Duration: number;
  IsPlaying: boolean;
  UpdateTime: (time: number) => void;
  UpdateMediaStatus: (status: boolean) => void;
  UpdateDuration: (duration: number) => void;
};

const MediaStatusContext = createContext<MediaStatusContextType>({
  CurrentTime: 0,
  Duration: 0,
  IsPlaying: false,
  UpdateTime(time) {},
  UpdateMediaStatus(status) {},
  UpdateDuration(duration) {},
});

export default MediaStatusContext;
