import { spotPrivateRequest } from '../requestClient';

const getUserDataStream = (apiKey, apiSecret) => spotPrivateRequest(apiKey, apiSecret)('POST', '/api/v3/userDataStream')
  .post('/api/v3/userDataStream')
  .then(({ data }) => data.listenKey);

export default getUserDataStream;
