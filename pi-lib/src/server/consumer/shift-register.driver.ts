import { ByteCollection } from '../../utils/byte';
import { ShiftRegisters } from '../../utils/shift-register';
import srMapping from './shift-register.mapping';
import { PinState } from '../types';
import { IMessageProcessor } from '../../utils/message-queue';

export class ShiftRegisterDriver implements IMessageProcessor {
  private readonly sr: ShiftRegisters;
  private readonly byte: ByteCollection;
  constructor(groupName: string) {
    this.sr = srMapping[groupName].sr;
    this.byte = srMapping[groupName].bytes;
    this.sr.reset();
  }

  async OnMessage(msg: string) {
    if (msg.toUpperCase() === 'RESET') {
      this.sr.reset();
      return;
    }
    const { Pin, State } = JSON.parse(msg) as PinState;
    if (State) this.byte.SetBit(Pin);
    else this.byte.ClearBit(Pin);

    await this.sr.ShiftBytes(this.byte);
    console.log(this.byte.toString());
  }
}
