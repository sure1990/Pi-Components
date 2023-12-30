function Signal(pinNo: number, state: boolean) {
  window.SendSignal(`${pinNo}|${state ? '1' : '0'}`);
}

const InterfacingService = { Signal };

export default InterfacingService;
