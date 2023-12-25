export type InsertTracksRequest = {
  MusicId: number;
  Tracks: MusicTrack[];
};

export type MusicTrack = {
  TriggerId: number;
  Frames: TrackFrame[];
};

export type TrackFrame = { Start: number; End: number };
