import log from './helpers/logs/Logging'
import socket from './socket/socket'
import { APPLICATION_CONSTANTS } from '../config/Constants'
import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'

const start = express()

const httpServer = createServer(start)

const io = new Server(httpServer, {
  cors: {
    origin: APPLICATION_CONSTANTS.CORS_ORIGIN,
    credentials: true
  }
})

start.get('/', (_, res) => res.send(`Server is up and running 🎉🕺`))

httpServer.listen(APPLICATION_CONSTANTS.PORT, APPLICATION_CONSTANTS.HOST, () => {
  log.info(`🚀 Server is listening at port ${APPLICATION_CONSTANTS.PORT} 🚀`)
  log.info(`http://${APPLICATION_CONSTANTS.HOST}:${APPLICATION_CONSTANTS.PORT}`)

  socket({ io })
})
