#!/usr/bin/env node

import SocketClient from '../lib/socketClient';


const streamName = 'btcusdt@depth';

const socketClient = new SocketClient(`ws/${streamName}`, 'wss://stream.binance.com:9443/');
socketClient.setHandler('depthUpdate', (params) => {
  const current = +new Date;
  const EvsNow = current - params.E;
  console.log(`[Spot ${streamName}] current:${current} delta EvsNow: ${EvsNow}`);
});
