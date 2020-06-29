import appendUpdatedId from '../../../src/lib/helpers/appendUpdatedId';

test('appendUpdatedId', () => {
  const updateId = 1234567;
  const ask = [
    [100, 1],
    [200, 2],
  ];
  const bid = [
    [10, 1],
    [20, 2],
  ];
  const result = appendUpdatedId(updateId, ask, bid);
  expect(result).toEqual([
    [
      [100, 1, updateId],
      [200, 2, updateId],
    ],
    [
      [10, 1, updateId],
      [20, 2, updateId],
    ],
  ]);
});
