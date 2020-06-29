import processOrderBookSnapshot from '../../../src/lib/helpers/processOrderBookSnapshot';

describe('processOrderBookSnapshot', () => {
  let orderBookData;
  let snapshotOrderbook;
  beforeEach(() => {
    orderBookData = {
      ask: [
        [202, 1, 1000],
        [210, 2, 1000],
      ],
      bid: [
        [201, 1, 1000],
        [199, 2, 1000],
      ],
    };

    snapshotOrderbook = {
      lastUpdateId: 999,
      bids: [
        [201.2, 1, 999],
        [190, 2, 999],
      ],
      asks: [
        [201.5, 2, 999],
        [205, 1, 999],
      ],
    };
  });

  test('add orderbook from snapshot into cached orderbook', () => {
    const result = processOrderBookSnapshot(orderBookData, snapshotOrderbook);
    expect(result).toEqual(
      {
        ask: [
          [201.5, 2, 999],
          [202, 1, 1000],
          [205, 1, 999],
          [210, 2, 1000],
        ],
        bid: [
          [201.2, 1, 999],
          [201, 1, 1000],
          [199, 2, 1000],
          [190, 2, 999],
        ],
      },
    );
  });

  test('remove the out of date orders in cache', () => {
    snapshotOrderbook = {
      lastUpdateId: 1001,
      bids: [
        [201.2, 1, 1001],
        [190, 2, 1001],
      ],
      asks: [
        [201.5, 2, 1001],
        [205, 1, 1001],
      ],
    };
    const result = processOrderBookSnapshot(orderBookData, snapshotOrderbook);
    expect(result).toEqual(
      {
        ask: [
          [201.5, 2, 1001],
          [205, 1, 1001],
        ],
        bid: [
          [201.2, 1, 1001],
          [190, 2, 1001],
        ],
      },
    );
  });

  test('overwrite the cache order if the price is the same', () => {
    snapshotOrderbook = {
      lastUpdateId: 999,
      bids: [
        [201, 4, 999],
        [190, 0, 999],
      ],
      asks: [
        [201.5, 2, 999],
        [210, 3, 999],
      ],
    };
    const result = processOrderBookSnapshot(orderBookData, snapshotOrderbook);
    expect(result).toEqual(
      {
        ask: [
          [201.5, 2, 999],
          [202, 1, 1000],
          [210, 3, 999],
        ],
        bid: [
          [201, 4, 999],
          [199, 2, 1000],
          [190, 0, 999],
        ],
      },
    );
  });
});
