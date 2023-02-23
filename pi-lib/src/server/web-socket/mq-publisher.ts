import { MessageQ } from "../../utils/message-queue";
import { PinState } from "../types";
import config from '../../config/shared.config.json';

const initialize = async () => {
    const mq = new MessageQ('amqp://localhost');
    await mq.CreateChannel('amq.direct');
    await createBindings(mq);
    return mq;
}


const publish = (data: string, mq: MessageQ) => {
    const [pinNo, state] = data.split('|');
    const groupNo = Math.ceil((+pinNo) / 32);
    const msg: PinState = { Pin: mapPinToGroup(groupNo, +pinNo), State: state === '1' }
    mq.Publish(JSON.stringify(msg), `Group_${groupNo}`)
}

const createBindings = async (mq: MessageQ) => {
    const bindings: { [key: string]: string } = config.Queue.Bindings;
    for (const key in bindings) {
        await mq.BindQueue(key, bindings[key])
    }
}

const mapPinToGroup = (groupNo: number, pinNo: number) => {
    return (pinNo - (config.ShiftRegister.Group_Split * (groupNo - 1)));
}


export { initialize as InitPublisher, publish as PublishMessage }