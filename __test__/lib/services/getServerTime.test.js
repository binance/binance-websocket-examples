import mockAxios from 'axios';
import getServerTime from '../../../src/lib/services/getServerTime';

describe('getServerTime', () => {
  const now = Date.now();
  const resp = { data: now };

  beforeEach(() => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(resp));
  });

  it('should returun server time', async () => {
    await expect(getServerTime()).resolves.toEqual(now);
  });
});
