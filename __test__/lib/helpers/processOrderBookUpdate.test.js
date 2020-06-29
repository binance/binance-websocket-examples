import processOrderBookUpdate from '../../../src/lib/helpers/processOrderBookUpdate';

describe('processOrderBookUpdate', () => {
  let data;
  let bid = [];
  let ask = [];

  beforeEach(() => {
    data = {
      bid: [
        [201, 1],
        [199, 2],
      ],
      ask: [
        [202, 1],
        [210, 2],
      ],
    };
    bid = [];
    ask = [];
  });

  test('update bid', () => {
    bid = [
      [200, 5],
      [180, 1],
    ];
    const result = processOrderBookUpdate(data, bid, ask);
    expect(result).toEqual(
      {
        bid: [
          [201, 1],
          [200, 5],
          [199, 2],
          [180, 1],
        ],
        ask: [
          [202, 1],
          [210, 2],
        ],
      },
    );
  });

  test('update bid', () => {
    ask = [
      [200, 5],
      [180, 1],
    ];
    const result = processOrderBookUpdate(data, bid, ask);
    expect(result).toEqual(
      {
        bid: [
          [201, 1],
          [199, 2],
        ],
        ask: [
          [180, 1],
          [200, 5],
          [202, 1],
          [210, 2],
        ],
      },
    );
  });

  test('remove order with 0 volume', () => {
    bid = [
      [201, 0],
      [199, 2],
    ];
    ask = [
      [180, 1],
      [210, 0],
    ];
    const result = processOrderBookUpdate(data, bid, ask);
    expect(result).toEqual(
      {
        bid: [
          [199, 2],
        ],
        ask: [
          [180, 1],
          [202, 1],
        ],
      },
    );
  });
});
