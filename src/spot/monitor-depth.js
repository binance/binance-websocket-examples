#!/usr/bin/env node

import SocketClient from '../lib/socketClient';


const streamName = 'btcusdt@depth@100ms';

const socketClient = new SocketClient(`ws/${streamName}`, 'wss://stream.binance.com:9443/');
let lastCurrent = +new Date;
socketClient.setHandler('depthUpdate', (params) => {
  const current = +new Date;
  const EvsNow = current - params.E;
  const fromLastEvent = current - lastCurrent
  console.log(`[Spot ${streamName}] current:${current} fromLastEvent: ${fromLastEvent} delta EvsNow: ${EvsNow}`);
  lastCurrent = current;
});
