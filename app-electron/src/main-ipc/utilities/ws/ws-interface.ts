import WebSocket from 'ws';

let connection: WebSocket;

let isAvailable = false;

function connect() {
  connection = new WebSocket('ws://vrtdesignspi.local:9000');

  connection.onopen = function () {
    isAvailable = true;
    console.log('Connection established!');
  };
  connection.onclose = function () {
    isAvailable = false;

    console.log('Connection closed!');
  };
  connection.onerror = function () {
    isAvailable = false;
    console.log('Connection error!');
  };
}

function close() {
  connection.close();
}

function send(msg: string) {
  if (isAvailable) connection.send(msg);
}

const WSInterface = {
  Connect: connect,
  Close: close,
  Send: send,
};

export default WSInterface;
