const createLogger = () => {
  const log = (level, message, meta = {}) => {
    const payload = {
      level,
      message,
      ...meta,
      timestamp: new Date().toISOString(),
    };
    // Keep logging simple and production-friendly while avoiding raw console spam.
    console.log(JSON.stringify(payload));
  };

  return {
    info: (message, meta) => log('info', message, meta),
    warn: (message, meta) => log('warn', message, meta),
    error: (message, meta) => log('error', message, meta),
  };
};

const logger = createLogger();

export default logger;
