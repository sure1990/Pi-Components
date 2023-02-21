import { ByteCollection } from "../utils/byte";
import { ShiftRegisters } from "../utils/shift-register";


export class MessageProcessor {
    private readonly sr: ShiftRegisters;
    private readonly byte: ByteCollection
    constructor(count: number) {
        this.sr = new ShiftRegisters(21, 20, 16, count);
        this.byte = new ByteCollection(count);
        this.sr.reset();
    }

    async onMessage(msg: string) {
        const [pin, state] = msg.split('|');
        if (pin && state) {
            if (state == "1")
                this.byte.SetBit(+pin);
            else
                this.byte.ClearBit(+pin);
            await this.sr.ShiftBytes(this.byte);
        }
    }

}
