import { SavedTracks } from '../../../shared/types';
import { DbUtils, SQLiteDb } from '../../utilities';

const fetchTracks = async (musicId: number) => {
  let response: SavedTracks[] = [];
  const db = new SQLiteDb(DbUtils.GetDbPath());
  try {
    response = await db.SelectAll<SavedTracks>(
      `SELECT
      MTM.trigger_id TriggerId    
      ,TM.pin_no PinNo
      ,TFM.start Start
      ,TFM.end End
      ,TFM.state State
  FROM
      cfg_Track_Frames_Map TFM
      INNER JOIN cfg_Music_Tracks_Master MTM
          ON MTM.id=TFM.track_id
      INNER JOIN sys_Trigger_Master TM
          ON MTM.trigger_id=TM.id
  WHERE
       MTM.music_id=?`,
      [musicId]
    );
  } catch (error) {
    console.error(error);
  } finally {
    db.Close();
  }
  return response;
};

export default fetchTracks;
