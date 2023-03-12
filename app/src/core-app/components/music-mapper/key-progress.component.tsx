import React from "react";

type KeyProgressProps = {
  KeyCode: string;
};
const KeyProgress = (props: KeyProgressProps) => {
  const { KeyCode } = props;
  return (
    <div>
      Progress:<span>{KeyCode}</span>
    </div>
  );
};

export default KeyProgress;
