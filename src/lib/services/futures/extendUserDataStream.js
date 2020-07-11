import { futuresPrivateRequest } from '../../requestClient';

const extendUserDataStream = (apiKey, apiSecret) => futuresPrivateRequest(apiKey, apiSecret)('PUT', '/fapi/v1/listenKey')
  .put('/fapi/v1/listenKey');

export default extendUserDataStream;
