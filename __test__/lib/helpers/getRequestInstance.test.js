import axios from 'axios';
import getRequestInstance from '../../../src/lib/helpers/getRequestInstance';

it('should return axios create func', () => {
  expect(typeof getRequestInstance()).toBe(typeof axios);
});
