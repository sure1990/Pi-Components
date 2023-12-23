import { DbUtils, SQLiteDb } from '../../utilities';
import { InsertTracksRequest, TrackFrame } from './types';

const InsertTracks = async (tracks: InsertTracksRequest) => {
  const db = new SQLiteDb(DbUtils.GetDbPath());
  try {
    const tracksPromise: Promise<void>[] = [];
    for (const track of tracks.Tracks) {
      tracksPromise.push(
        InsertTrack(db, tracks.MusicId, track.TriggerId, track.Frames)
      );
    }
    await Promise.all(tracksPromise);
  } catch (error) {
    console.error(error);
  } finally {
    db.Close();
  }
  return 1;
};

async function InsertTrack(
  db: SQLiteDb,
  musicId: number,
  triggerId: number,
  frames: TrackFrame[]
) {
  const trackId = await db.Insert(
    'cfg_Music_Tracks_Master',
    ['music_id', 'trigger_id'],
    [[musicId, triggerId]]
  );
  if (trackId > 0) {
    await db.Insert(
      'cfg_Track_Frames_Map',
      ['track_id', 'start', 'end'],
      frames.map((x) => [trackId, x.Start, x.End])
    );
  }
}

export default InsertTracks;
