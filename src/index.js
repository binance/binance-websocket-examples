#!/usr/bin/env node

import SocketClient from './lib/socketClient';
import getServerTime from './lib/services/getServerTime';


getServerTime().then(data => console.log(data));
// getOrderBookSnapshot('BTCUSDT').then(data => console.log(data));

// const socketClient = new SocketClient('ws/btcusdt@bookTicker');
// socketClient.setHandler('depthUpdate', (params) => console.log(JSON.stringify(params)));
