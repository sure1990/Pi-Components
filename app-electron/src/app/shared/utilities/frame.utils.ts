import { KeyFrame } from '../types';
import { NumericUtils } from '.';
import { SavedTracks } from '../../../shared/types';

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
        end: NumericUtils.toFixedDigits(
          range.start - NumericUtils.getFraction()
        ),
      });
    }
    current = Math.max(
      NumericUtils.toFixedDigits(range.end + NumericUtils.getFraction()),
      current
    );
  }

  if (current <= end) {
    missingRanges.push({ start: current, end: end });
  }

  return missingRanges;
}

function reArrageFrames(frames: KeyFrame[], maxEnd: number) {
  // const merged: KeyFrame[] = mergeRanges(frames).map((x) => ({
  //   ...x,
  //   isNone: false,
  // }));

  const missing: KeyFrame[] = findMissingRanges(0, maxEnd, frames).map((x) => ({
    ...x,
    isNone: true,
  }));

  const rearranged = [...frames, ...missing];

  return sortByStartTime(rearranged);
}

function sortByStartTime(frames: KeyFrame[]) {
  return frames.sort((a, b) => a.start - b.start);
}

function findRangeBinarySearch(
  currentTime: number,
  ranges: SavedTracks[]
): number | null {
  let left = 0;
  let right = ranges.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const currentRange = ranges[mid];

    if (currentTime >= currentRange.Start && currentTime <= currentRange.End) {
      return mid;
    } else if (currentTime < currentRange.Start) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return null; // If number doesn't fall into any range
}

const FrameUtils = {
  StartFrame: startFrame,
  EndFrame: endFrame,
  ReArrangeFrames: reArrageFrames,
  MergeFrames: mergeRanges,
  Sort: sortByStartTime,
  GetCurrentFrame: findRangeBinarySearch,
};

export default FrameUtils;
