import { SQLiteDb, DbUtils } from '../../utilities';
import { KeyTrigger } from '../../../shared/types';

const SelectKeyTriggers = async (): Promise<KeyTrigger[]> => {
  let response: KeyTrigger[] = [];
  const db = new SQLiteDb(DbUtils.GetDbPath());
  try {
    response = await db.SelectAll<KeyTrigger>(`SELECT
    KM.key Key
    ,KM.name KeyName
    ,TM.pin_no PinNo
    ,TM.id TriggerId
    ,TM.name TriggerName
    
FROM
    cfg_Trigger_To_Key_Map TKM
    INNER JOIN sys_Key_Master AS KM
        ON TKM.key_id=KM.id
    INNER JOIN sys_Trigger_Master AS TM 
        ON TKM.trigger_id=TM.id`);
  } catch (error) {
    console.error(error);
  } finally {
    db.Close();
  }
  return response;
};

export default SelectKeyTriggers;
