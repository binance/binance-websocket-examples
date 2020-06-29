import appendUpdatedId from './helpers/appendUpdatedId';
import DataLostException from './errors/dataLostException';
import getOrderBookSnapshot from './services/getOrderBookSnapshot';
import logger from './logger';

const orderBookUpdateFromRESTfulAPI = (orderBook) => {
  getOrderBookSnapshot(orderBook.getSymbol()).then((data) => orderBook.updateOrderBookWithSnapshot(data));
};

const validateEventUpdateId = (id) => (orderBook) => {
  const { lastUpdateId } = orderBook.getOrderbook();
  if (id - lastUpdateId !== 1 && !orderBook.justInitialized()) {
    throw new DataLostException(`Event id is not continued, lastUpdateId: ${lastUpdateId}, Event Id: ${id}`);
  }
};

const orderbookUpdateFromWebsocket = (params) => (orderBook) => {
  try {
    // has to be uppcase 'U'
    validateEventUpdateId(params.U)(orderBook);

    const orders = appendUpdatedId(params.u, params.a, params.b);
    orderBook.updateLastUpdateId(params.u);
    orderBook.updateOrderbook(...orders);
  } catch (e) {
    if (e instanceof DataLostException) {
      // if lastUpdateId is not continued, fetch the snapshot
      logger.warn(e.message);
      orderBookUpdateFromRESTfulAPI(orderBook);
    } else {
      throw e;
    }
  }
};

export {
  orderbookUpdateFromWebsocket,
  orderBookUpdateFromRESTfulAPI,
};
