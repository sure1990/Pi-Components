import client, { Channel, Connection, Message } from "amqplib";
import { Exchange } from "../server/types";

export class MessageQ {
  private _channel?: Channel;
  //   private _exchangeName: string | undefined;
  private _connection?: Connection;

  constructor(private readonly _amqpUrl: string) {}

  private async Connect() {
    this._connection = await client.connect(this._amqpUrl);
  }

  public async CreateChannel() {
    if (this._connection == undefined) {
      await this.Connect();
    }

    this._channel = await this._connection?.createChannel();
    //await this._channel?.assertExchange(exchange, 'direct', { durable: false });
  }

  public async BindQueue(
    exchangeName: Exchange,
    queueName: string,
    routingKey: string
  ) {
    if (this._channel == undefined) {
      throw new Error("Channel not initialized !!!");
    }
    await this._channel.assertQueue(queueName, { durable: true });
    this._channel.prefetch(1); //fetch 1 message at a time
    this._channel.bindQueue(queueName, exchangeName, routingKey);
  }

  public async Consume(queueName: string, processor: IMessageProcessor) {
    if (this._channel == undefined) {
      throw new Error("Channel not initialized !!!");
    }
    await this._channel.assertQueue(queueName, { durable: true });
    this._channel.consume(
      queueName,
      async (msg) => {
        await processor.OnMessage(msg?.content.toString("utf-8") as string);
        this._channel?.ack(msg as Message);
      },
      { noAck: false }
    );
  }

  public Publish(exchangeName: Exchange, message: string, routingKey: string) {
    if (this._channel == undefined) {
      throw new Error("Channel not initialized !!!");
    }

    this._channel.publish(
      exchangeName,
      routingKey,
      Buffer.from(message, "utf8")
    );
  }

  public async Close() {
    await this._channel?.close();
    await this._connection?.close();
    this._channel = undefined;
    this._connection = undefined;
  }
}

export interface IMessageProcessor {
  OnMessage(msg: string): Promise<void>;
}
