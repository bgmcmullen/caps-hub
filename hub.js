'use strict';

const events = require('./eventPool.js');

const vendor = require('./vendor');

const driver = require('./driver');

const {handlePackageAvailable, handleInTransit, handleDelivered} = require('./hubHandlers.js');





// event listeners
events.on('package-available', handlePackageAvailable);
events.on('in-transit', handleInTransit)
events.on('delivered', handleDelivered)


