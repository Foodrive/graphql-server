const bunyan = require("bunyan");

module.exports = ({ name, streams, serializers, level, ...rest }) =>
  bunyan.createLogger({
    name,
    streams,
    serializers,
    level: process.env.LOG_LEVEL || level,
    rest,
  });
