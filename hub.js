'use strict';

require('dotenv').config();

const port = process.env.PORT || 3000;

// const vendor = require('./vendor');

// const driver = require('./driver');


const io = require('socket.io')(port);

const {handlePackageAvailable, handleInTransit, handleDelivered} = require('./hubHandlers.js');

console.log(`Server is running on port ${port}`);

io.on('connection', (socket) => {
  console.log('Connected', socket.id);

  // event listeners
socket.on('package-available', ((payload) => {
  handlePackageAvailable(payload);
  io.emit('package-ready-for-pickup', payload);
}));
socket.on('in-transit', handleInTransit)
socket.on('delivered', ((payload) => {
  handleDelivered(payload);
  io.emit('package-delivered', payload);
}));

});

module.exports = io;




