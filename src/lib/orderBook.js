import logger from './logger';
import processOrderBookUpdate from './helpers/processOrderBookUpdate';
import processOrderBookSnapshot from './helpers/processOrderBookSnapshot';

class OrderBook {
  constructor(symbol) {
    this._data = {
      symbol,
      ask: [],
      bid: [],
      lastUpdateId: '',
    };
  }

  getOrderbook() {
    return this._data;
  }

  getSymbol() {
    return this._data.symbol;
  }

  getBestBid() {
    return this._data.bid[0][0];
  }

  getBestAsk() {
    return this._data.ask[0][0];
  }
  justInitialized() {
    return this._data.ask.length === 0;
  }

  updateLastUpdateId(id) {
    this._data.lastUpdateId = id;
  }

  updateOrderbook(ask, bid) {
    this._data = processOrderBookUpdate(this._data, bid, ask);
  }


  updateOrderBookWithSnapshot(snapshot) {
    this._data = processOrderBookSnapshot(this._data, snapshot);
  }

  inspect() {
    setInterval(() => {
      logger.info('orderbook:', this._data);
    }, 4000);
  }

  best_price() {
    setInterval(() => {
      if (this._data.ask.length == 0) {
        logger.info('waiting for warm up');
        return;
      }
      logger.info('Best Ask:', this.getBestAsk());
      logger.info('Best Bid:', this.getBestBid());
    }, 1000);
  }
}

export default OrderBook;
