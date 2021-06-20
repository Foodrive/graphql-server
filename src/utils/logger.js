const bunyan = require("bunyan");

module.exports = (loggerName) => {
  return bunyan.createLogger({
    name: loggerName,
    streams: [
      {
        level: "info",
        stream: process.stdout,
      },
      {
        level: "error",
        stream: process.stdout,
      },
    ],
  });
};
