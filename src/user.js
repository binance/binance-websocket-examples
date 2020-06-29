#!/usr/bin/env node

import getUserDataStream from './lib/services/getUserDataStream';
import SocketClient from './lib/socketClient';
import renewListenKey from './lib/helpers/renewListenKey';
import logger from './lib/logger';

const APIKEY = process.env.APIKEY || '';
const APISECET = process.env.APISECET || '';

export default async function createApp() {
  logger.info('start application');
  const listenKey = await getUserDataStream(APIKEY, APISECET);

  logger.info('key received.', listenKey);
  const socketApi = new SocketClient(`ws/${listenKey}`);
  socketApi.setHandler('executionReport', (params) => logger.info(params));
  socketApi.setHandler('outboundAccountInfo', (params) => logger.info(params));

  renewListenKey(APIKEY, APISECET)(listenKey);
}

createApp();
