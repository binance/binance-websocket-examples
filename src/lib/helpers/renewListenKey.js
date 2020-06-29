import extendUserDataStream from '../services/extendUserDataStream';
import logger from '../logger';

const renewListenKey = (apiKey, apiSecret) => (listenKey) => {
  setInterval(() => {
    extendUserDataStream(apiKey, apiSecret)(listenKey)
      .then(logger.info('ListenKey is renewed'));
  }, 1000 * 60 * 45); // review the key every 45 mins
};

export default renewListenKey;
