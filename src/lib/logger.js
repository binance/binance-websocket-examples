const logger = {
  debug: (...arg) => {
    console.log((new Date()).toISOString(), 'DEBUG', ...arg);
  },
  info: (...arg) => {
    console.log((new Date()).toISOString(), 'INFO', ...arg);
  },
  warn: (...arg) => {
    console.log((new Date()).toISOString(), 'WARN', ...arg);
  },
};

export default logger;
