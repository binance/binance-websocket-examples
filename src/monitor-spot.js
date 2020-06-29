#!/usr/bin/env node

import SocketClient from './lib/socketClient';


const streamName = 'btcusdt@trade';

const socketClient = new SocketClient(`ws/${streamName}`);
socketClient.setHandler('trade', (params) => {
  const current = +new Date;
  const TvsNow = current - params.T;
  const EvsNow = current - params.E;
  const EvsT = params.E - params.T;
  console.log(`[Spot ${streamName}] delta TvsNow: ${TvsNow}, EvsNow: ${EvsNow}, EvsT: ${EvsT}`);
});
