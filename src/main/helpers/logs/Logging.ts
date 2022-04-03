import dayjs from 'dayjs'
import logger, { LoggerOptions } from 'pino'

const pinoOpts: LoggerOptions = {
  prettyPrint: true,
  base: {
    pid: false
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
  transport:
    // eslint-disable-next-line no-process-env
    ['local', 'test'].includes(`${process.env.NODE_ENV}`) && !process.env.CI
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'yyyy-mm-dd HH:MM:ss',
            ignore: 'pid,hostname,module',
            singleLine: true,
            messageFormat: '{module} > {msg}'
          }
        }
      : undefined
}

const log = logger(pinoOpts)

export default log
