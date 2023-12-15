import { KeyFrame } from "../../media-config-manager/types";

// function StartFrame(startTime: number, frames?: KeyFrame[]) {
//   if (frames === undefined) {
//     frames = [
//       { start: 0, end: startTime, isNone: true },
//       { start: startTime, isNone: false },
//     ];
//   } else {
//     //Start Frames by start time
//     frames.sort((a, b) => a.start - b.start);

//     const lastFrame = frames[frames.length - 1];
//     if (lastFrame.isNone) {
//       lastFrame.end = startTime;
//     }
//     frames.push({ start: startTime, isNone: false });
//   }

//   return frames;
// }

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
      missingRanges.push({ start: current, end: range.start - 0.00001 });
    }
    current = Math.max(range.end + 0.00001, current);
  }

  if (current <= end) {
    missingRanges.push({ start: current, end: end });
  }

  return missingRanges;
}

function reArrageFrames(frames: KeyFrame[], maxEnd: number) {
  let rearranged = [
    ...mergeRanges(frames).map((x) => ({
      start: x.start,
      end: x.end,
      isNone: false,
    })),
  ];
  rearranged = [
    ...rearranged,
    ...findMissingRanges(0, maxEnd, rearranged).map((x) => ({
      start: x.start,
      end: x.end,
      isNone: true,
    })),
  ];

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
