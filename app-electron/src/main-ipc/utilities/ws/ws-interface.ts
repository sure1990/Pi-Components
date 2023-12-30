import WebSocket from 'ws';

let connection: WebSocket;

function connect() {
  connection = new WebSocket('ws://vrtdesignspi.local:9000');

  connection.onopen = function () {
    console.log('Connection established!');
  };
  connection.onclose = function () {
    console.log('Connection closed!');
  };
  connection.onerror = function () {
    console.log('Connection error!');
  };
}

function close() {
  connection.close();
}

function send(msg: string) {
  connection.send(msg);
}

const WSInterface = {
  Connect: connect,
  Close: close,
  Send: send,
};

export default WSInterface;
