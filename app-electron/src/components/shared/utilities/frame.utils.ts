import { KeyFrame } from "../../media-config-manager/types";
import Utils from "./utils";

function startFrame(start: number, frames: KeyFrame[]) {
  return [...frames, { start, isNone: false }];
}

function endFrame(end: number, frames: KeyFrame[]) {
  const updated = [...frames];
  updated[updated.length - 1] = { ...updated[updated.length - 1], end: end };

  return updated;
}

function mergeRanges(ranges: KeyFrame[]) {
  if (ranges.length <= 1) {
    return ranges;
  }

  ranges.sort((a, b) => a.start - b.start);

  const mergedRanges = [ranges[0]];

  for (let i = 1; i < ranges.length; i++) {
    const currentRange = ranges[i];
    const lastMergedRange = mergedRanges[mergedRanges.length - 1];

    if (currentRange.start <= lastMergedRange.end) {
      lastMergedRange.end = Math.max(lastMergedRange.end, currentRange.end);
    } else {
      mergedRanges.push(currentRange);
    }
  }

  return mergedRanges;
}

function findMissingRanges(start: number, end: number, ranges: KeyFrame[]) {
  const missingRanges = [];

  let current = start;

  for (const range of ranges) {
    if (range.start > current) {
      missingRanges.push({
        start: current,
        end: Utils.toFixedDigits(range.start - Utils.getFraction()),
      });
    }
    current = Math.max(
      Utils.toFixedDigits(range.end + Utils.getFraction()),
      current
    );
  }

  if (current <= end) {
    missingRanges.push({ start: current, end: end });
  }

  return missingRanges;
}

function reArrageFrames(frames: KeyFrame[], maxEnd: number) {
  const merged: KeyFrame[] = mergeRanges(frames).map((x) => ({
    ...x,
    isNone: false,
  }));

  const missing: KeyFrame[] = findMissingRanges(0, maxEnd, merged).map((x) => ({
    ...x,
    isNone: true,
  }));

  const rearranged=[...merged,...missing]
  

  return sortByStartTime(rearranged);
}

function sortByStartTime(frames: KeyFrame[]) {
  return frames.sort((a, b) => a.start - b.start);
}

const FrameUtils = {
  StartFrame: startFrame,
  EndFrame: endFrame,
  ReArrangeFrames: reArrageFrames,
  Sort: sortByStartTime,
};

export default FrameUtils;
