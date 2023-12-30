import { useCallback, useEffect, useRef, useState } from 'react';
import { KeyFrame } from '../../types';
import {
  KeyTrigger,
  InsertTracksRequest,
  SavedTracks,
} from '../../../../shared/types';
import { FrameUtils } from '../../utilities';
import { KeyTriggerMap } from '../../../components/media-config-manager/data-provider/types';
import { useMediaStatus } from '../../../components/media-player';
import { TrackSyncWorker } from '../../workers';
import { InterfacingService } from '../../services';
const syncWorkerRef = new TrackSyncWorker();
const useConfigManager = () => {
  const [keyMapping, setKeyMapping] = useState<KeyTriggerMap>({});
  const [tracks, setTracks] = useState<{ [pinNo: number]: KeyFrame[] }>({});

  const { Duration, CurrentTime, IsPlaying } = useMediaStatus();
  const currentTimeRef = useRef(CurrentTime);
  useEffect(() => {
    window.ConnectToWs();
    return () => window.CloseWs();
  }, []);
  useEffect(() => {
    if (IsPlaying) {
      syncWorkerRef.Sync(CurrentTime);
    } else {
      syncWorkerRef.Reset();
    }
    currentTimeRef.current = CurrentTime;
  }, [CurrentTime, IsPlaying]);

  useEffect(() => {
    window.InvokeApi<KeyTrigger[]>('KeyMap:Select').then((x) => {
      setKeyMapping(
        x.reduce((prev, curr) => {
          const updated = {
            ...prev,
            [curr.PinNo]: prev[curr.PinNo]
              ? [...prev[curr.PinNo], curr]
              : [curr],
          };

          // return { ...prev, [curr.Key]: { ...curr } };
          return updated;
        }, keyMapping)
      );
    });
  }, []);

  const applySavedTracks = useCallback(async () => {
    const savedTracks = await window.InvokeApi<SavedTracks[]>(
      'Tracks:Fetch',
      1
    );
    syncWorkerRef.Init(savedTracks);

    let initialKeys: { [key: number]: KeyFrame[] } = {};
    Object.keys(keyMapping)
      .map((x) => +x)
      .forEach((k) => {
        initialKeys = {
          ...initialKeys,
          [k]: savedTracks
            .filter((x) => x.PinNo === k && x.State === 1)
            .map((p) => ({
              start: p.Start,
              end: p.End,
              isNone: false,
            })),
        };
      });

    setTracks(initialKeys);
  }, [keyMapping]);

  useEffect(() => {
    applySavedTracks();
  }, [applySavedTracks]);

  const saveTracks = useCallback(async () => {
    const requestBody: InsertTracksRequest = {
      MusicId: 1,
      Tracks: Object.keys(tracks)
        .map((x) => +x)
        .filter((k) => tracks[k].length > 0)
        .map((k) => {
          return {
            TriggerId: keyMapping[k][0].TriggerId,
            Frames: FrameUtils.ReArrangeFrames(tracks[k], Duration).map(
              (x) => ({
                Start: x.start,
                End: x.end,
                State: !x.isNone,
              })
            ),
          };
        }),
    };

    await window.InvokeApi('Tracks:Insert', requestBody);
    applySavedTracks();
  }, [keyMapping, tracks, Duration]);

  const onKeyDown = useCallback(
    (key: string) => {
      const triggers = Object.keys(keyMapping)
        .map((t) => +t)
        .filter((t) => keyMapping[t].some((x) => x.Key === key));

      if (triggers.length === 0) return;

      setTracks((prev) => {
        const updated = { ...prev };
        for (const trigger of triggers) {
          InterfacingService.Signal(trigger, true);
          updated[trigger] = FrameUtils.StartFrame(
            currentTimeRef.current,
            updated[trigger] ?? []
          );
        }
        return updated;
      });
    },
    [keyMapping]
  );

  const onKeyUp = useCallback(
    (key: string) => {
      const triggers = Object.keys(keyMapping)
        .filter((t) => keyMapping[+t].some((x) => x.Key === key))
        .map((t) => +t);
      if (triggers.length === 0) return;
      setTracks((prev) => {
        // if (!prev[key]) return prev;
        const current = currentTimeRef.current;
        const updated = { ...prev };
        for (const trigger of triggers) {
          if (updated[trigger]) {
            InterfacingService.Signal(trigger, false);
            updated[trigger] = FrameUtils.MergeFrames(
              FrameUtils.EndFrame(current, updated[trigger])
            ).map((x) => ({ ...x, isNone: false }));
          }
        }
        return updated;
      });
    },
    [keyMapping]
  );

  return {
    saveTracks,
    tracks,
    onKeyDown,
    onKeyUp,
    keyMapping,
  };
};

export default useConfigManager;
