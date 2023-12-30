// import WSClient from 'ws';

// const wsClient = new WSClient('ws://vrtdesignspi.local:9000');

// wsClient.on('error', (err) => console.error(err));

// function Send(msg: string) {
//   wsClient.send(msg, (err) => {
//     if (err) {
//       console.error(err);
//     }
//   });
// }
import WebSocket from 'ws';

let connection: WebSocket;

function connect() {
  connection = new WebSocket('ws://vrtdesignspi.local:9000');

  connection.onopen = function () {
    // this.connection_status = true;
    console.log('Connection established!');
  };

  // Closed window
  connection.onclose = function () {
    console.log('Connection closed!');
    // this.connection_status = false;
  };

  // Error window
  connection.onerror = function () {
    console.log('Connection error!');
    // this.connection_status = false;
  };
}

connect();

const WSInterface = { Send: (msg: string) => connection.send(msg) };

export default WSInterface;
