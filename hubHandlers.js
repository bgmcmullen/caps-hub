'use strict';

const getDate = require('./getDate.js');

require('dotenv').config();



function handlePackageAvailable(payload){
  logEvent('pickup', payload);
}

function handleInTransit(payload){
  logEvent('in-transit', payload);
}

function handleDelivered(payload){
  logEvent('delivered', payload);
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