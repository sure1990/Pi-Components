import { Byte, ByteCollection } from './utils/byte';
import { ShiftRegisters } from './utils/shift-register';
import sleep from './utils/sleep';


const run = async () => {

    const sr = new ShiftRegisters(21, 20, 16, 2);
    await sr.reset();

    await sleep(5000);

    var byte = new ByteCollection(2);
    byte.SetBit(1);
    byte.SetBit(4);
    byte.SetBit(6);
    byte.SetBit(8);
    byte.SetBit(10);
    byte.SetBit(12);
    byte.SetBit(15);
    byte.SetBit(16);

    for (let index = 0; index < byte.length; index++) {
        const element = byte[index];
        console.log(element.toString())

    }
    await sr.ShiftBytes(byte);

    await sleep(5000);
    await sr.reset();
}

run().then(() => console.log('done'))



