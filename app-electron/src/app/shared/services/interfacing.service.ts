class _InterfacingService {
  Signal(pinNo: number, state: boolean) {
    console.log('Signal', `${pinNo}=>${state}`);
  }
}

const InterfacingService = new _InterfacingService();

export default InterfacingService;
