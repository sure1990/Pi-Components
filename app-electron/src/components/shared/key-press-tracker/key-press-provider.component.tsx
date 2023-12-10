import React, { FC, PropsWithChildren } from "react";
import KeyPressContext from "./key-press-tracker.context";

const KeyPressProvider: FC<PropsWithChildren> = ({ children }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();

    console.log("handleKeyDown", event.key);
  };
  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();

    console.log("handleKeyUp", event.key);
  };

  return (
    <div onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
      <KeyPressContext.Provider value={{}}>{children}</KeyPressContext.Provider>
    </div>
  );
};

export default KeyPressProvider;
