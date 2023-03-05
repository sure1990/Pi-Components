class _PiService {

    private readonly ws = new WebSocket('ws://vrtdesignspi.local:9000');

    constructor(){

    }
    On(pin: number) {
        this.ws.send(`${pin}|1`);
    }

    Off(pin: number) {
        this.ws.send(`${pin}|0`);
    }


}

const PiService = new _PiService()

export default PiService;