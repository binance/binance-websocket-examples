import mockAxios from 'axios';
import getUserDataStream from '../../../src/lib/services/getUserDataStream';

describe('getUserDataStream', () => {

  const apiKey = 'xxxx';
  const apiSecet = 'yyyyy';
  const resp = { data: { listenKey: 'xxxxxxxx' } };

  beforeEach(() => {
    mockAxios.post.mockImplementationOnce(() => Promise.resolve(resp));
  });

  it('should returun return listen key', async () => {
    await expect(getUserDataStream(apiKey, apiSecet)).resolves.toEqual('xxxxxxxx');
  });
});
