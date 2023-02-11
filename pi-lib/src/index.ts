import { Byte, ByteCollection } from './utils/byte';
import { ShiftRegisters } from './utils/shift-register';
import sleep from './utils/sleep';


const run = async () => {

    const count = 4
    const sr = new ShiftRegisters(21, 20, 16, count);
    await sr.reset();
    await sleep(2000);

    var byte = new ByteCollection(count);


    while (true) {
        let bit = getRandomInt(count * 8);
        if (bit === 0) break;
        console.log('Bit(1)=>', bit);
        byte.SetBit(bit);
        sr.ShiftBytes(byte);
        await sleep(50);

        bit = getRandomInt(count * 8);
        if (bit === 0) break;
        console.log('Bit(0)=>', bit);
        byte.ClearBit(bit);
        sr.ShiftBytes(byte);
        await sleep(50);
    }


}

function getRandomInt(max: number) {
    return Math.ceil(Math.random() * max);
}



run().then(() => console.log('done'))



