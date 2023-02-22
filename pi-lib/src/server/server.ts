import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import { MessageQ } from './message-queue/MessageQueue';
import { PinState } from './types';

const app = express();

//initialize a simple http server
const httpServer = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ 'server': httpServer });

const Group_Split = 32;

wss.on('connection', async (ws) => {
    // const processor = new MessageProcessor(4)

    const mq = new MessageQ('amqp://guest:guest@vrtdesignspi.local:5672');
    await mq.CreateChannel('amq.direct');
    mq.BindQueue('G1', 'Group_1')
    mq.BindQueue('G2', 'Group_2')
    ws.on('close', () => {
        console.log(`Client disconnected`)
    })
    ws.on('message', (data: string) => {
        const [pinNo, state] = data.toLocaleString().split('|');
        const groupNo = Math.ceil((+pinNo) / 32);
        const msg: PinState = { Pin: mapPinToGroup(groupNo, +pinNo), State: state === '1' }
        mq.Publish(JSON.stringify(msg), `Group_${groupNo}`)
    })

});


const mapPinToGroup = (groupNo: number, pinNo: number) => {
    return (pinNo - (Group_Split * (groupNo - 1)));
}

const PORT = 9000;
httpServer.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`)
});