import { InitConsumer, AddConsumers } from './mq-consumer'

console.log('Initializing Consumer started')
AddConsumers()
    .then(() => console.log('Add consumers done'));
// InitConsumer()
//     .then((mq) => {
//         console.log('Initializing Consumer done')
//         return mq
//     })
//     .then((mq) => AddConsumers(mq))
//     .then(() => console.log('Add consumers done'))