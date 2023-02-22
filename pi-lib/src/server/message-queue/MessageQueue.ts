import client, { Channel, Connection, Message } from 'amqplib'

export class MessageQ {

    private _channel?: Channel;
    private _exchangeName: string = '';
    private _connection?: Connection;

    constructor(private readonly _amqpUrl: string) { }

    private async Connect() {
        this._connection = await client.connect(this._amqpUrl);
    }

    public async CreateChannel(exchange: string) {

        if (this._connection == undefined) {
            await this.Connect();
        }

        this._exchangeName=exchange;
        this._channel = await this._connection?.createChannel();
        //await this._channel?.assertExchange(exchange, 'direct', { durable: false });
    }

    public async BindQueue(queueName: string, routingKey: string) {
        if (this._channel == undefined) {
            throw new Error("Channel not initialized !!!");
        }
        await this._channel.assertQueue(queueName, { durable: true });
        this._channel.prefetch(1); //fetch 1 message at a time
        this._channel.bindQueue(queueName, this._exchangeName, routingKey);
    }


    public Consume(queueName: string, OnMessage: (msg: string) => Promise<void>) {
        if (this._channel == undefined) {
            throw new Error("Channel not initialized !!!");
        }

        this._channel.consume(queueName, async (msg) => {
            await OnMessage(msg?.content.toString('utf-8') as string)
            this._channel?.ack(msg as Message);
        }, { noAck: false })

    }

    public Publish(message: string, routingKey: string) {
        if (this._channel == undefined) {
            throw new Error("Channel not initialized !!!");
        }

        this._channel.publish(this._exchangeName, routingKey, Buffer.from(message, 'utf8'));
    }
}