var bunyan = require('bunyan');

const logger = bunyan.createLogger({
    name: `${process.env.APPLICATION_NAME}:${process.env.APPLICATION_VERSION}`,
    level: 'trace'
});

module.exports = logger;