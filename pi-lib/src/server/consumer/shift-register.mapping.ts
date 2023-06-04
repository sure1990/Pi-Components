import { ByteCollection } from "../../utils/byte";
import { ShiftRegisters } from "../../utils/shift-register";

type Group = {
  sr: ShiftRegisters;
  bytes: ByteCollection;
};

const createMapping = (registerCount: number): { [key: string]: Group } => {
  return {
    Group_1: {
      sr: createRegister(13, 19, 26, registerCount),
      bytes: createByteCollection(registerCount),
    },
    Group_2: {
      sr: createRegister(0, 5, 6, registerCount),
      bytes: createByteCollection(registerCount),
    },
    Group_3: {
      sr: createRegister(10, 9, 11, registerCount),
      bytes: createByteCollection(registerCount),
    },
    Group_4: {
      sr: createRegister(17, 27, 22, registerCount),
      bytes: createByteCollection(registerCount),
    },
    Group_5: {
      sr: createRegister(16, 20, 21, registerCount),
      bytes: createByteCollection(registerCount),
    },
    Group_6: {
      sr: createRegister(8, 7, 1, registerCount),
      bytes: createByteCollection(registerCount),
    },
    Group_7: {
      sr: createRegister(23, 24, 25, registerCount),
      bytes: createByteCollection(registerCount),
    },
    // Group_8: {
    //   sr: createRegister(14, 15, 18, registerCount),
    //   bytes: createByteCollection(registerCount),
    // },
  };
};

const createRegister = (
  dataPin: number,
  clockPin: number,
  latchPin: number,
  registerCount: number
) => {
  return new ShiftRegisters(dataPin, clockPin, latchPin, registerCount);
};

const createByteCollection = (byteSize: number) => {
  return new ByteCollection(byteSize);
};

export default createMapping(1);
