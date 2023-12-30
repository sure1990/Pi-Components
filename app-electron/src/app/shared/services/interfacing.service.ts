class _InterfacingService {
  Signal(pinNo: number, state: boolean) {
    console.log('Signal', `${pinNo}=>${state}`);
    window.SendSignal(`${pinNo}|${state ? '1' : '0'}`);
  }
}

const InterfacingService = new _InterfacingService();

export default InterfacingService;
