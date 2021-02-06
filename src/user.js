#!/usr/bin/env node

import getUserDataStream from './lib/services/getUserDataStream';
import SocketClient from './lib/socketClient';
import renewListenKey from './lib/helpers/renewListenKey';
import logger from './lib/logger';

const APIKEY = process.env.APIKEY || '';

export default async function createApp() {
  logger.info('start application');
  const listenKey = await getUserDataStream(APIKEY);

  logger.info(`key received : ${listenKey}`);
  const socketApi = new SocketClient(`ws/${listenKey}`);
  socketApi.setHandler('executionReport', (params) => logger.info(params));
  socketApi.setHandler('outboundAccountPosition', (params) => logger.info(params));
  renewListenKey(APIKEY)(listenKey);
}

createApp();
