'use strict';

const getDate = require('./getDate.js');

const events = require('./eventPool.js');

function handlePackageAvailable(payload){
  logEvent('pickup', payload);
  events.emit('package-ready-for-pickup', payload);
}

function handleInTransit(payload){
  logEvent('in-transit', payload);
}

function handleDelivered(payload){
  logEvent('delivered', payload);
  events.emit('package-delivered', payload)
}

function logEvent(eventType, payload){
  const event = { 
    event: eventType,
    time: getDate(),
    payload: payload
  }
  console.log('HUB SAYS: ', event);
}

module.exports = {handlePackageAvailable, handleInTransit, handleDelivered};