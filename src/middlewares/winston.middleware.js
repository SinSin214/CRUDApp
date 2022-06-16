const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, errorCode, timestamp }) => {
    return `${timestamp} [${errorCode}] ${level}: ${message}`;
});

const logger = createLogger({
    level: "error",
    format: combine(timestamp(), myFormat),
    transports: [
        new transports.File({ filename: "logs/error.log", level: "error" }),
    ],
});

module.exports = logger;
