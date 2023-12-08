import { FC, PropsWithChildren } from "react";
import MediaStatusContext from "./media-status.context";

const MediaStatusProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MediaStatusContext.Provider value={{}}>
      {children}
    </MediaStatusContext.Provider>
  );
};

export default MediaStatusProvider;
