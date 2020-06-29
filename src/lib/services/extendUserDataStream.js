import { spotPublicRequest } from '../requestClient';

const extendUserDataStream = (apiKey, apiSecret) => (listenKey) => spotPublicRequest(apiKey, apiSecret)('PUT', '/api/v1/userDataStream', { listenKey })
  .put(`/api/v1/userDataStream?listenKey=${listenKey}`);

export default extendUserDataStream;
