import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import { MessageProcessor } from './message-processor';

const app = express();

//initialize a simple http server
const httpServer = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ 'server': httpServer });


wss.on('connection', (ws) => {
    const processor = new MessageProcessor(4)

    ws.on('close', () => {
        console.log(`Client disconnected`)
    })
    ws.on('message', (data: string) => {
        processor.onMessage(data.toLocaleString())
            .then(() => console.log(data.toLocaleString()));
    })

});


const PORT = 9000;
httpServer.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`)
})