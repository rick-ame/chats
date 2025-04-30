import { createLogger, format, transports } from 'winston'

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.errors({ stack: true }),
    format.timestamp(),
    format.json(),
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(
          (info) =>
            `[${info.timestamp}] ${info.level} - ${info.message} ${info.stack ? '\n' + info.stack : ''}`,
        ),
      ),
    }),
  ],
})
