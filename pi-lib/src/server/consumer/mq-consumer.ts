import { MessageQ } from "../../utils/message-queue";
import config from '../../config/shared.config.json';
import { ShiftRegisterDriver } from "./shift-register.driver";

const initialize = async () => {
    const mq = new MessageQ('amqp://vrtdesigns-mq');
    await mq.CreateChannel('amq.direct');
    return mq;
}

const addConsumers = async () => {
    const bindings: { [key: string]: string } = config.Queue.Bindings;

    for (const key in bindings) {
        const mq = await initialize();
        const driver = new ShiftRegisterDriver(bindings[key]);
        await mq.Consume(key, driver);
    }
}

export { initialize as InitConsumer, addConsumers as AddConsumers }