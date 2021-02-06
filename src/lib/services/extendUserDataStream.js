import { spotMarketDataRequest } from '../requestClient';

const extendUserDataStream = (apiKey) => (listenKey) => spotMarketDataRequest(apiKey)('PUT', '/api/v3/userDataStream', { listenKey })
  .put(`/api/v3/userDataStream?listenKey=${listenKey}`);

export default extendUserDataStream;
