#!/usr/bin/env node

import logger from './lib/logger';
import SocketClient from './lib/socketClient';

const streamName = 'btcusdt@depth@100ms';

const socketClient = new SocketClient(`ws/${streamName}`, 'wss://fstream.binance.com/');
socketClient.setHandler('depthUpdate', (params) => {
  const current = +(new Date);
  const TvsNow = current - params.T;
  const EvsNow = current - params.E;
  const EvsT = params.E - params.T;
  console.log(`[Futures ${streamName}] delta TvsNow: ${TvsNow}, EvsNow: ${EvsNow}, EvsT: ${EvsT}`);
});
