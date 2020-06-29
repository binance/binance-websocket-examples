import { futuresPrivateRequest } from '../../requestClient';

const getListenKey = (apiKey, apiSecret, testnet = false) => futuresPrivateRequest(apiKey, apiSecret, testnet)('POST', '/fapi/v1/listenKey')
  .post('/fapi/v1/listenKey')
  .then(({ data }) => data.listenKey);

export default getListenKey;
