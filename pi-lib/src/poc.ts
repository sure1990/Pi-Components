import { Byte } from "./utils/byte";

const byteString = (n: number) => {
    if (n < 0 || n > 255 || n % 1 !== 0) {
        throw new Error(n + " does not fit in a byte");
    }
    return ("000000000" + n.toString(2)).substr(-8)
}

var byte = new Byte();
byte.SetBit(2);
console.log(byte.toString());

byte = new Byte();
byte.SetBit(5);
console.log(byte.toString());

// var mask = 1 << 6; //to get the nth bit - sets 7th bit
// var data=128;
// console.log(byteString(data));
// data |= mask; // set a the nth bit in data
// console.log(byteString(data));
// data &= ~mask; //clear the nth bit in data
// console.log(byteString(data));
// if ((data & mask) != 0) { //check if nth bit is set in data
// console.log("bit is set");
//   } else {
//     console.log("bit is not set");
//   }

//   var mask = 1 << 5; // gets the 6th bit
// To test if a bit is set:

// if ((n & mask) != 0) {
//   // bit is set
// } else {
//   // bit is not set
// }
// To set a bit:

// n |= mask;
// To clear a bit:

// n &= ~mask;