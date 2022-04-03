import { Room } from '../models/room/Room'

export interface IRoomProvider {
  create(room: Room): Promise<Room>
  findAll(): Promise<Room[]>
  findOneById(id: string): Promise<Room>
}
