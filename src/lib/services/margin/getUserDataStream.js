import { spotPrivateRequest } from '../../requestClient';

const getUserDataStream = (apiKey, apiSecret) => spotPrivateRequest(apiKey, apiSecret)('POST', '/sapi/v1/userDataStream')
  .post('/sapi/v1/userDataStream')
  .then(({ data }) => data.listenKey);

export default getUserDataStream;
