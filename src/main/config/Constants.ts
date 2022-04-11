export const APPLICATION_CONSTANTS = {
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3005',
  // eslint-disable-next-line no-magic-numbers
  PORT: Number(process.env.HTTP_PORT) || 8081,
  HOST: process.env.HTTP_HOST || '127.0.0.1'
}