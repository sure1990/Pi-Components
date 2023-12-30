import WSClient from 'ws';

const wsClient = new WSClient('ws://vrtdesignspi.local:9000');

wsClient.on('error', (err) => console.error(err));

function Send(msg: string) {
  wsClient.send(msg, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

const WSInterface = { Send };

export default WSInterface;
