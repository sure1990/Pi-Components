import { createContext } from "react";

type MediaStatusContextType = {
  CurrentTime: number;
  IsPlaying: boolean;
  UpdateTime: (time: number) => void;
  UpdateMediaStatus: (status: boolean) => void;
};

const MediaStatusContext = createContext<MediaStatusContextType>({
  CurrentTime: 0,
  IsPlaying: false,
  UpdateTime(time) {},
  UpdateMediaStatus(status) {},
});

export default MediaStatusContext;
