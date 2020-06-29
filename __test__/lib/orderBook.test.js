
import OrderBook from '../../src/lib/orderBook';

describe('initialize', () => {
  it('should initial orderbook', () => {
    const symbol = 'BTCUSDT';
    const orderBook = new OrderBook(symbol);
    expect(orderBook.getSymbol()).toEqual(symbol);
    expect(orderBook._data.bid.length).toEqual(0);
    expect(orderBook._data.ask.length).toEqual(0);
    expect(orderBook._data.lastUpdateId).toEqual('');
    expect(orderBook.justInitialized()).toBeTruthy();
  });
});

describe('updateLastUpdateId', () => {
  let orderBook;
  beforeEach(() => {
    orderBook = new OrderBook('BTCUSDT');
  });

  it('should update lastUpdateId', () => {
    orderBook.updateLastUpdateId(12345678);
    expect(orderBook._data.lastUpdateId).toEqual(12345678);
  });

  describe('updateOrderbook', () => {
    let orderBook;
    const symbol = 'BTCUSDT';
    const orders = { ask: [[199, 2], [201, 1]], bid: [[210, 2], [202, 1]] };

    beforeEach(() => {
      orderBook = new OrderBook(symbol);
      orderBook.updateOrderbook([[199, 2], [201, 1]], [[210, 2], [202, 1]]);
    });

    it('should update the orderbook', () => {
      expect(orderBook.getOrderbook()).toEqual({
        symbol,
        ask: orders.ask,
        bid: orders.bid,
        lastUpdateId: '',
      });
      expect(orderBook.getBestAsk()).toEqual(199);
    });

    it('should get best ask', () => {
      expect(orderBook.getBestAsk()).toEqual(199);
    });

    it('should get best bid', () => {
      expect(orderBook.getBestBid()).toEqual(210);
    });
  });

  describe('updateOrderBookWithSnapshot', () => {
    let orderBook;
    const symbol = 'BTCUSDT';
    const snapshot = {
      lastUpdateId: 110000,
      bids: [[210, 2], [202, 1]],
      asks: [[199, 2], [201, 1]],
    };
    beforeEach(() => {
      orderBook = new OrderBook(symbol);
      orderBook.updateOrderBookWithSnapshot(snapshot);
    });

    it('should update the orderbook', () => {
      expect(orderBook.getOrderbook()).toEqual({
        symbol,
        ask: [[199, 2, 110000], [201, 1, 110000]],
        bid: [[210, 2, 110000], [202, 1, 110000]],
        lastUpdateId: '',
      });
      expect(orderBook.getBestAsk()).toEqual(199);
    });

    it('should get best ask', () => {
      expect(orderBook.getBestAsk()).toEqual(199);
    });

    it('should get best bid', () => {
      expect(orderBook.getBestBid()).toEqual(210);
    });
  });
});
