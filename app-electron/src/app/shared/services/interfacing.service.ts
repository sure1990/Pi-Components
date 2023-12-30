function Signal(pinNo: number, state: boolean) {
  window.SendSignal(`${pinNo}|${state ? '1' : '0'}`);
}

function Reset() {
  window.SendSignal('RESET');
}

const InterfacingService = { Signal, Reset };

export default InterfacingService;
