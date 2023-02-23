import express from 'express';
import http from 'http';
import WebSocket from 'ws';

import { InitPublisher, PublishMessage } from './mq-publisher';
import wsConfig from '../../config/ws-server.config.json';

const app = express();

//initialize a simple http server
const httpServer = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ 'server': httpServer });

wss.on('connection', async (ws) => {
    console.log('Client connected');
    console.log('Initializing MQ started');
    //Initialize Message Q
    const mq = await InitPublisher();
    console.log('Initializing MQ done');

    ws.on('close', async () => {
        console.log(`Client disconnected`);
        await mq.Close();
    })

    ws.on('message', (data: string) => {
        PublishMessage(data.toLocaleString(), mq);
    })
});

const PORT = wsConfig.Port;
httpServer.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`)
});