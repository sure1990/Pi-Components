import { ByteCollection } from '../../utils/byte';
import { ShiftRegisters } from '../../utils/shift-register';
import config from '../../config/consumer.config.json';

type Group = {
  sr: ShiftRegisters;
  bytes: ByteCollection;
};

const createMapping = (registerCount: number): { [key: string]: Group } => {
  return {
    Group_1: {
      sr: createRegister('Group_1', registerCount),
      bytes: createByteCollection(registerCount),
    },
    Group_2: {
      sr: createRegister('Group_2', registerCount),
      bytes: createByteCollection(registerCount),
    },
    Group_3: {
      sr: createRegister('Group_3', registerCount),
      bytes: createByteCollection(registerCount),
    },
    Group_4: {
      sr: createRegister('Group_4', registerCount),
      bytes: createByteCollection(registerCount),
    },
    Group_5: {
      sr: createRegister('Group_5', registerCount),
      bytes: createByteCollection(registerCount),
    },
    Group_6: {
      sr: createRegister('Group_6', registerCount),
      bytes: createByteCollection(registerCount),
    },
    Group_7: {
      sr: createRegister('Group_7', registerCount),
      bytes: createByteCollection(registerCount),
    },
    Group_8: {
      sr: createRegister('Group_8', registerCount),
      bytes: createByteCollection(registerCount),
    },
  };
};

const createRegister = (
  groupName:
    | 'Group_8'
    | 'Group_7'
    | 'Group_6'
    | 'Group_5'
    | 'Group_4'
    | 'Group_3'
    | 'Group_2'
    | 'Group_1',
  registerCount: number
) => {
  const { data, latch, clock } = config.Interface[groupName];
  return new ShiftRegisters(data, clock, latch, registerCount);
};

const createByteCollection = (byteSize: number) => {
  return new ByteCollection(byteSize);
};

export default createMapping(2);
