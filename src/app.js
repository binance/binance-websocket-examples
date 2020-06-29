#!/usr/bin/env node

import logger from './lib/logger';
import OrderBook from './lib/orderBook';
import SocketClient from './lib/socketClient';
import { orderbookUpdateFromWebsocket, orderBookUpdateFromRESTfulAPI } from './lib/orderBookManager';

const SYMBOL = process.env.SYMBOL || 'BTCUSDT';

export default async function createApp() {
  logger.info('Start application');

  const socketApi = new SocketClient(`ws/${SYMBOL.toLowerCase()}@depth`);

  const orderBook = new OrderBook(SYMBOL.toUpperCase());

  socketApi.setHandler('depthUpdate', (params) => orderbookUpdateFromWebsocket(params)(orderBook));

  // leave a time gap to wait for websokect connection first
  setTimeout(() => {
    orderBookUpdateFromRESTfulAPI(orderBook);
  }, 3000);

  // inspection
  orderBook.best_price();
}

createApp();
