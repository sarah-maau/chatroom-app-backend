import { DBRoomModel, RoomDocument} from './RoomSchema'
import { Room } from '../../../domain/models/room/Room'
import { IRoomProvider } from '../../../domain/providers/IRoomProvider'
import { ProviderErrors } from '../../errors/ProviderErrors'

export class DBRoomProvider implements IRoomProvider {
  private static toRoom(doc: RoomDocument): Room {
    return new Room({
      id: doc.id,
      name: doc.name,
      profileIds: doc.profileIds,
      createdDate: doc.createdDate,
      updatedDate: doc.updatedDate
    })
  }

  private static fromRoom(room: Room): RoomDocument {
    return {
      id: room.id,
      name: room.name,
      profileIds: room.profileIds,
      createdDate: room.createdDate,
      updatedDate: new Date()
    } as RoomDocument
  }

  async create(room: Room): Promise<Room> {
    return DBRoomProvider.toRoom(await DBRoomModel.create(DBRoomProvider.fromRoom(room)))
  }

  async findAll(): Promise<Room[]> {
    const results = await DBRoomModel.find().exec()
    return results.map((c) => DBRoomProvider.toRoom(c))
  }

  async findOneById(id: string): Promise<Room> {
    const room = await DBRoomModel.findById(id).exec()
    if (!room) {
      throw ProviderErrors.EntityNotFound(Room.name)
    }
    return DBRoomProvider.toRoom(room)
  }
}
