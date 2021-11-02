#!/usr/bin/env node

import logger from './lib/logger';
import SocketClient from './lib/socketClient';

export default async function createApp() {
  logger.info('Start application');

  let pairs = [
    'ethbtc',
    'ltcbtc',
    'bnbbtc',
  ];

  pairs = pairs.map((pair) => `${pair}@depth5`);
  const pairString = pairs.join('/');
  logger.info(pairString);

  const socketApi = new SocketClient(`stream?streams=${pairString}`);
  pairs.forEach(pair => {
    socketApi.setHandler(pair, (params) => logger.info(JSON.stringify(params)));
  })
}

createApp();
