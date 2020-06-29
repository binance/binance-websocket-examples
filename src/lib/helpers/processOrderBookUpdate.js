import Big from 'big.js';
import {
  uniqBy, sort, filter, cond, equals,
} from 'ramda';

const processOrderBookUpdate = (data, bid, ask) => {
  const validateValue = (v) => Big(v[0]);
  const compareValueFn = cond([
    [equals('ask'), () => (a, b) => (new Big(a[0])).minus(b[0])],
    [equals('bid'), () => (a, b) => (new Big(b[0])).minus(a[0])],
  ]);
  const purgeEmptyVolume = (v) => Big(v[1]).gt(0);

  data.bid = uniqBy(validateValue, [...bid, ...data.bid])
    .sort(compareValueFn('bid'), data.bid)
    .filter(purgeEmptyVolume, data.bid);

  data.ask = uniqBy(validateValue, [...ask, ...data.ask])
    .sort(compareValueFn('ask'), data.ask)
    .filter(purgeEmptyVolume, data.ask);
  return data;
};

export default processOrderBookUpdate;
