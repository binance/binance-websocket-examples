#!/usr/bin/env node

import getDeliveryListenKey from './lib/services/futures/getDeliveryListenKey';
import SocketClient from './lib/socketClient';
import logger from './lib/logger';

const APIKEY = process.env.APIKEY || '';
const APISECRET = process.env.APISECRET || '';
const WS_BASEURL = process.env.WS_BASEURL || 'wss://dstream.binance.com/';

export default async function createApp() {
  logger.info('start application');
  const listenKey = await getDeliveryListenKey(APIKEY, APISECRET, false);

  logger.info('key received.', listenKey);
  const socketApi = new SocketClient(`ws/${listenKey}`, WS_BASEURL);
  socketApi.setHandler('executionReport', (params) => logger.info(JSON.stringify(params)));
  socketApi.setHandler('outboundAccountInfo', (params) => logger.info(JSON.stringify(params)));

  // renew listenkey
}

createApp();
