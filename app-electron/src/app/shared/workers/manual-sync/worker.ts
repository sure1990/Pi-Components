import { InterfacingService } from '../../services';

self.onmessage = (event) => {
  const { PinNo, State } = event.data;
  InterfacingService.Signal(PinNo, State);
};
