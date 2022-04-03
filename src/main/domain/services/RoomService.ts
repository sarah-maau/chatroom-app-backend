import { logger } from '../helpers/logs/Logging'
import { Room } from '../models/room/Room'
import { IRoomProvider } from '../providers/IRoomProvider'

export class RoomService {
  private roomProvider: IRoomProvider
  private readonly logger = logger(this.constructor.name)

  constructor(p: { roomProvider: IRoomProvider }) {
    this.roomProvider = p.roomProvider
  }

  async create(p: { room: Room }): Promise<Room> {
    const room = await this.roomProvider.create(p.room)
    this.logger.info(`create > Room[${room.id}]`)
    return room
  }

  async findOneById(id: string): Promise<Room> {
    return this.roomProvider.findOneById(id)
  }

  async findAll(): Promise<Room[]> {
    return this.roomProvider.findAll()
  }
}
