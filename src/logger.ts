import winston from 'winston';

const Logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({ format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
    ) }),
  ],
  levels: winston.config.syslog.levels,
});

export default Logger;
