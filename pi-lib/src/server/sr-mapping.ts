import { ByteCollection } from "utils/byte";
import { ShiftRegisters } from "utils/shift-register";

type Group = {
    sr: ShiftRegisters;
    bytes: ByteCollection;
}

const createMapping = (registerCount: number): { [key: string]: Group } => {
    return {
        "Group_1": { sr: createRegister(21, 20, 16, registerCount), bytes: createByteCollection(registerCount) },
        "Group_2": { sr: createRegister(26, 19, 13, registerCount - 2), bytes: createByteCollection(registerCount - 2) }
    }
}


const createRegister = (dataPin: number, clockPin: number, latchPin: number, registerCount: number) => {
    return new ShiftRegisters(dataPin, clockPin, latchPin, registerCount);
}

const createByteCollection = (byteSize: number) => {
    return new ByteCollection(byteSize);
}

export default createMapping(4);