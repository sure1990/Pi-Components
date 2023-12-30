import { MessageQ } from "../../utils/message-queue";
import { PinState, Exchange } from "../types";
import config from "../../config/shared.config.json";

const initialize = async () => {
  const mq = new MessageQ("amqp://vrtdesigns-mq");
  await mq.CreateChannel();
  await createBindings(mq);
  return mq;
};
const publish = (data: string, mq: MessageQ) => {
  if (data.toUpperCase() === "RESET") {
    mq.Publish("amq.fanout", data, "");
    return;
  }
  const [pinNo, state] = data.split("|");
  const groupNo = Math.ceil(+pinNo / config.ShiftRegister.Group_Split);
  const msg: PinState = {
    Pin: mapPinToGroup(groupNo, +pinNo),
    State: state === "1",
  };
  mq.Publish("amq.direct", JSON.stringify(msg), `Group_${groupNo}`);
};

const createBindings = async (mq: MessageQ) => {
  const bindings: { [key: string]: string } = config.Queue.Bindings;
  for (const key in bindings) {
    await mq.BindQueue("amq.direct", key, bindings[key]);
    await mq.BindQueue("amq.fanout", key, "");
  }
};

const mapPinToGroup = (groupNo: number, pinNo: number) => {
  return pinNo - config.ShiftRegister.Group_Split * (groupNo - 1);
};

export { initialize as InitPublisher, publish as PublishMessage };
