var bunyan = require('bunyan');

const logger = bunyan.createLogger({
    name: process.env.APPLICATION_NAME,
    level: 'trace'
});

module.exports = logger;