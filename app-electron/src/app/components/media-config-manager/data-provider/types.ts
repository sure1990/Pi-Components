import { KeyTrigger } from '../../../../shared/types';
export type KeyTriggerMap = { [key: number]: Omit<KeyTrigger, 'PinNo'>[] };
