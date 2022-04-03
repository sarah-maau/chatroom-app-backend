import pino, { LoggerOptions } from 'pino'

const pinoOpts: LoggerOptions = {
  redact: {
    paths: ['req.headers.authorization', 'email', 'phone', 'password', 'secret'],
    censor: '**REDACTED**'
  },

  // eslint-disable-next-line no-process-env
  level: ['test'].includes(`${process.env.NODE_ENV}`) && process.env.CI ? 'silent' : 'info',
  // eslint-disable-next-line no-process-env
  serializers: ['local', 'test'].includes(`${process.env.NODE_ENV}`)
    ? {}
    : {
        // add headers to the logs
        req(req) {
          return {
            method: req.method,
            url: req.url,
            headers: req.headers,
            hostname: req.hostname,
            remoteAddress: req.ip,
            remotePort: req.socket?.remotePort
          }
        }
      },
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

const rootLogger = pino(pinoOpts)
export const logger = (module: string): pino.Logger => {
  return rootLogger.child({ module })
}
