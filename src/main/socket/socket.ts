import { ServerConnection, ClientEvent, ServerEvent } from './SocketTypes'
import log from '../helpers/logs/Logging'
import { Server, Socket } from 'socket.io'
import { v4 as randomUuid } from 'uuid'

const rooms: Record<string, { name: string }> = {}

function socket({ io }: { io: Server }) {
  log.info(`>>> socket connected`)

  io.on(ServerConnection, (socket: Socket) => {
    log.info(`user ${socket.id} connected `)

    socket.emit(ServerEvent.ROOMS, rooms)

    socket.on(ClientEvent.CREATE_ROOM, ({ roomName }) => {
      log.info(`room ${roomName} created `)

      const roomId = randomUuid()
      rooms[roomId] = {
        name: roomName
      }

      socket.join(roomId)

      socket.broadcast.emit(ServerEvent.ROOMS, rooms)

      socket.emit(ServerEvent.ROOMS, rooms)
      socket.emit(ServerEvent.JOINED_ROOM, roomId)
    })

    socket.on(ClientEvent.SEND_ROOM_MESSAGE, ({ roomId, message, username }) => {
      const date = new Date()

      socket.to(roomId).emit(ServerEvent.ROOM_MESSAGE, {
        message,
        username,
        time: `${date.getHours()}:${date.getMinutes()}`
      })
    })

    socket.on(ClientEvent.JOIN_ROOM, (roomId) => {
      socket.join(roomId)

      socket.emit(ServerEvent.JOINED_ROOM, roomId)
    })
  })
}

export default socket
