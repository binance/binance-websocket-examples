import mockAxios from 'axios';
import extendUserDataStream from '../../../src/lib/services/extendUserDataStream';

describe('extendUserDataStream', () => {

  const apiKey = 'xxxx';
  const apiSecet = 'yyyyy';
  const resp = {};

  beforeEach(() => {
    mockAxios.put.mockImplementationOnce(() => Promise.resolve(resp));
  });

  it('should extend the data stream', async () => {
    await expect(extendUserDataStream(apiKey, apiSecet)('xxxxx')).resolves.toBeDefined();
  });
});
