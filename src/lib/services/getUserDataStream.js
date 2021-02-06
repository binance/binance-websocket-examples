import { spotMarketDataRequest } from '../requestClient';

const getUserDataStream = (apiKey) => spotMarketDataRequest(apiKey)('POST', '/api/v3/userDataStream')
  .post('/api/v3/userDataStream')
  .then(({ data }) => data.listenKey);

export default getUserDataStream;
