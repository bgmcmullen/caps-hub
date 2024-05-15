'use strict';

require('dotenv').config();

const port = process.env.PORT || 3000;

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
  io.emit('package-delivered', payload);
}));

});

module.exports = io;




