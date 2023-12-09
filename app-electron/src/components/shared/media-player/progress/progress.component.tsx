import React, { FC, memo, useEffect, useState } from "react";

import { DateTimeUtils } from "../../../../utilities";
type ProgressProps = { total: number; current: number };

const Progress: FC<ProgressProps> = ({ total, current }) => {
  return (
    <>
      <div className="row">
        <div className="col">
          <input
            type="range"
            min={0}
            max={total}
            step={0.5}
            value={current}
            readOnly
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <span className="badge badge-info">
            {DateTimeUtils.ToTimeFormat(current)}
          </span>
          <span className="float-right badge badge-info">
            {DateTimeUtils.ToTimeFormat(total)}
          </span>
        </div>
      </div>
    </>
  );
};

export default memo(Progress);
