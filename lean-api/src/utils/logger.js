const { createLogger, LoggerOptions, transports } = require('winston');

const options = {
    transports: [
        new transports.Console({
            level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
        }),
        new transports.File({ filename: 'debug.log', level: 'debug' }),
    ],
};

const logger = createLogger(options);

if (process.env.NODE_ENV !== 'production') {
    logger.debug('Logging initialized at debug level');
}

module.exports = logger;
