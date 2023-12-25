import { KeyTrigger } from '../../../../shared/types';
export type KeyTriggerMap = { [key: string]: Omit<KeyTrigger, 'Key'> };
