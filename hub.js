'use strict';

require('dotenv').config();

const Queue = require('./Queue.js')

const deliveriesQueue = new Queue();

const port = process.env.PORT || 3000;

let queuesObject = {};const ordersQueue = new Queue();

const io = require('socket.io')(port);

const {handleDriverReady, handlePackageAvailable, handleInTransit, handleDelivered} = require('./hubHandlers.js');

console.log(`Server is running on port ${port}`);

io.on('connection', (socket) => {
  console.log('Connected', socket.id);

// event listeners
socket.on('package-available', ((payload) => {

  handlePackageAvailable(payload);
  
}));

socket.on('driver-ready', () => {
  let nextOrder = handleDriverReady();
  if(nextOrder)
    socket.emit('package-ready-for-pickup', nextOrder);
})
socket.on('in-transit', handleInTransit)
socket.on('delivered', ((payload) => {
  handleDelivered(payload);
  queuesObject[payload.store].enqueue(payload);
  //io.emit('package-delivered', payload);
}));
socket.on('get-delivery-info', (storeName) => {
  if(!queuesObject[storeName]){
    queuesObject[storeName] = new Queue();
  }
  while (!queuesObject[storeName].isEmpty()) {
    const payload = queuesObject[storeName].dequeue();
    socket.emit('package-delivered', payload);
    
    // Listen for the 'received' event from the client
    // socket.on('received', () => {
    //   queuesObject[storeName].dequeue();
    // });
  }
});

});

module.exports = io;




