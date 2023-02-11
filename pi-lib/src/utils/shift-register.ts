import { Gpio } from "onoff";
import { Byte, ByteCollection } from "./byte";
import sleep from "./sleep";

export class ShiftRegister {

    protected readonly ser: Gpio;
    protected readonly clock: Gpio;
    protected readonly latch: Gpio;

    constructor(dataPin: number, clockPin: number, latchPin: number) {
        this.ser = new Gpio(dataPin, 'out');//SER PIN 14
        this.clock = new Gpio(clockPin, 'out'); //SRCLK PIN 11
        this.latch = new Gpio(latchPin, 'out'); //RCLK PIN12

        this.latch.writeSync(0);
        this.ser.writeSync(0);
        this.clock.writeSync(0);
    }

    protected async WriteToRegister(byte: Byte) {

        for (var j = 0; j < 8; j++) {
            await this.ser.write(byte.IsBitSet(j) ? 1 : 0);
            await this.clock.write(1);
            await this.clock.write(0);
        }
    }

    async ShiftByte(byte: Byte) {
        await this.WriteToRegister(byte);
        await this.latch.write(1);
        await sleep(5);
        await this.latch.write(0);
    }

    async reset() {
        await this.ShiftByte(new Byte());
    }

}

export class ShiftRegisters extends ShiftRegister {

    constructor(dataPin: number, clockPin: number, latchPin: number, private count: number) {
        super(dataPin, clockPin, latchPin);
    }

    async ShiftBytes(bytes: ByteCollection): Promise<void> {
        if (bytes.length != this.count) {
            throw new Error(`Byte size(${bytes.length})  doesn't match with the shiftregister count(${this.count})`)
        }
        for (let index = 0; index < this.count; index++) {
            const byte = bytes[index];
            await this.WriteToRegister(byte);
        }

        await this.latch.write(1);
        await sleep(5)
        await this.latch.write(0);
    }

    async reset(): Promise<void> {
        await this.ShiftBytes(new ByteCollection(this.count))
    }
}