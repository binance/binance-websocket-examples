import WebSocket from 'ws';
import logger from './logger';

class SocketClient {
  constructor(path, baseUrl) {
    this.baseUrl = baseUrl || 'wss://stream.binance.com/';
    this._path = path;
    this._createSocket();
    this._handlers = new Map();
  }

  _createSocket() {
    console.log(`${this.baseUrl}${this._path}`);
    this._ws = new WebSocket(`${this.baseUrl}${this._path}`);

    this._ws.onopen = () => {
      logger.info('ws connected');
    };

    this._ws.on('pong', () => {
      logger.debug('receieved pong from server');
    });
    this._ws.on('ping', () => {
      logger.debug('==========receieved ping from server');
      this._ws.pong();
    });

    this._ws.onclose = () => {
      logger.warn('ws closed');
    };

    this._ws.onerror = (err) => {
      logger.warn('ws error', err);
    };

    this._ws.onmessage = (msg) => {
      try {
        const message = JSON.parse(msg.data);
        if (message.e) {
          if (this._handlers.has(message.e)) {
            this._handlers.get(message.e).forEach((cb) => {
              cb(message);
            });
          } else {
            logger.warn('Unprocessed method', message);
          }
        } else {
          logger.warn('Unprocessed method', message);
        }
      } catch (e) {
        logger.warn('Parse message failed', e);
      }
    };

    this.heartBeat();
  }

  heartBeat() {
    setInterval(() => {
      if (this._ws.readyState === WebSocket.OPEN) {
        this._ws.ping();
        logger.debug("ping server");
      }
    }, 5000);
  }

  setHandler(method, callback) {
    if (!this._handlers.has(method)) {
      this._handlers.set(method, []);
    }
    this._handlers.get(method).push(callback);
  }
}

export default SocketClient;
