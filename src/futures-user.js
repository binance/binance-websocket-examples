#!/usr/bin/env node

import getListenKey from './lib/services/futures/getListenKey';
import extendUserDataStream from './lib/services/futures/extendUserDataStream';
import SocketClient from './lib/socketClient';
import logger from './lib/logger';

const APIKEY = process.env.APIKEY || '';
const APISECET = process.env.APISECET || '';
const WSS_BASE_URL = process.env.WSS_BASE_URL || 'wss://fstream.binance.com/';
const HTTP_BASE_URL = process.env.HTTP_BASE_URL || 'https://fapi.binance.com/';

export default async function createApp() {
  logger.info('start application');
  const listenKey = await getListenKey(APIKEY, APISECET, HTTP_BASE_URL);

  logger.info('key received.', listenKey);
  const socketApi = new SocketClient(`ws/${listenKey}`, WSS_BASE_URL);
  socketApi.setHandler('executionReport', (params) => logger.info(params));
  socketApi.setHandler('outboundAccountInfo', (params) => logger.info(params));

  // renew listenkey
  setInterval(() => {
    extendUserDataStream(APIKEY, APISECET, HTTP_BASE_URL)
      .then(logger.info('ListenKey is renewed'));
  }, 1000 * 60 * 45); // review the key every 45 mins
}

createApp();
