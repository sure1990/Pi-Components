import { ByteCollection } from "../utils/byte";
import { ShiftRegisters } from "../utils/shift-register";
import srMapping from "./sr-mapping";
import { PinState } from "./types";


export class MessageProcessor {
    private readonly sr: ShiftRegisters;
    private readonly byte: ByteCollection
    constructor(groupName: string) {
        this.sr = srMapping[groupName].sr;
        this.byte = srMapping[groupName].bytes;
        this.sr.reset();
    }

    async onMessage(msg: string) {
        const { Pin, State } = JSON.parse(msg) as PinState;
        if (Pin && State) {
            if (State)
                this.byte.SetBit(Pin);
            else
                this.byte.ClearBit(Pin);
            await this.sr.ShiftBytes(this.byte);
        }
    }

}
