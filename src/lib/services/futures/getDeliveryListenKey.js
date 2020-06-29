import { deliveryFuturesPrivateRequest } from '../../requestClient';

const getDeliveryListenKey = (apiKey, apiSecret, testnet = false) => deliveryFuturesPrivateRequest(apiKey, apiSecret, testnet)('POST', '/dapi/v1/listenKey')
  .post('/dapi/v1/listenKey')
  .then(({ data }) => data.listenKey);

export default getDeliveryListenKey;
