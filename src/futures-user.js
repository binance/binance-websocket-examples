#!/usr/bin/env node

import getListenKey from './lib/services/futures/getListenKey';
import SocketClient from './lib/socketClient';
import logger from './lib/logger';

const APIKEY = process.env.APIKEY || '';
const APISECET = process.env.APISECET || '';

export default async function createApp() {
  logger.info('start application');
  const listenKey = await getListenKey(APIKEY, APISECET, true);

  logger.info('key received.', listenKey);
  const socketApi = new SocketClient(`ws/${listenKey}`, 'wss://stream.binancefuture.com/');
  socketApi.setHandler('executionReport', (params) => logger.info(params));
  socketApi.setHandler('outboundAccountInfo', (params) => logger.info(params));

  // renew listenkey
}

createApp();
