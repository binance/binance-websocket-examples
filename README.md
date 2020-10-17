# Binance Websocket Examples

## Local orderbook(Spot)

```bash
# cache loal orderbook and echo best price
# btcusdt by default
npm run orderbook

# or provide the trading pair
SYMBOL=bnbusdt npm run orderbook

```

## SPOT user data stream

```bash
# get user data steam
APIKEY=xxxxxx APISECET=xxxxx npm run user

# get margin account update from websocket
APIKEY=xxxxxx APISECET=xxxxx npm run margin-user
```

## Futures user data stream

```bash
# get user data steam on production
APIKEY=xxxxxx APISECET=xxxxx npm run futures-user

# on testnet
APIKEY=xxxxxx APISECET=xxxxx WSS_BASE_URL="wss://stream.binancefuture.com/" HTTP_BASE_URL="https://testnet.binancefuture.com/" npm run futures-user
```

## Delivery Futures user data stream

```bash
# get user data steam, by default, it's working on production
APIKEY=xxxxxx APISECET=xxxxx npm run delivery-futures-user
```

## Combined streams

```bash
# get multi pairs stream, setting the pairs in src/multi-stream-depth
npm run multi-stream
```

## Spot trade stream delay monitoring

```bash
npm run monitor-spot
```

## Futures depth stream delay monitoring

```bash
npm run monitor-futures
```

## How to setup

```bash

npm install

# run test
npm run test

```

## License
MIT
