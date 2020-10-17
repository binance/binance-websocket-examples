import { futuresPrivateRequest } from '../../requestClient';

const extendUserDataStream = (apiKey, apiSecret, baseURL) => futuresPrivateRequest(apiKey, apiSecret, baseURL)('PUT', '/fapi/v1/listenKey')
  .put('/fapi/v1/listenKey');

export default extendUserDataStream;
