import { futuresPrivateRequest } from '../../requestClient';

const getListenKey = (apiKey, apiSecret, baseURL) => futuresPrivateRequest(apiKey, apiSecret, baseURL)('POST', '/fapi/v1/listenKey')
  .post('/fapi/v1/listenKey')
  .then(({ data }) => data.listenKey)
  .catch(error => console.log(error)); 

export default getListenKey;
