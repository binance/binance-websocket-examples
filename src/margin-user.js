#!/usr/bin/env node

import getUserDataStream from './lib/services/margin/getUserDataStream';
import SocketClient from './lib/socketClient';
import renewListenKey from './lib/helpers/renewListenKey';
import logger from './lib/logger';

const { APIKEY } = process.env;
const { APISECET } = process.env;

export default async function createApp() {
  logger.info('start application to get margin user account update');
  const listenKey = await getUserDataStream(APIKEY, APISECET);

  logger.info('key received.');
  const socketApi = new SocketClient(`ws/${listenKey}`);
  socketApi.setHandler('executionReport', (params) => logger.info(params));
  socketApi.setHandler('outboundAccountInfo', (params) => logger.info(params));

  renewListenKey(APIKEY, APISECET)(listenKey);
}

createApp();
