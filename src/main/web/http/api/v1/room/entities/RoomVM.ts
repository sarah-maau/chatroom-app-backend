import { MessageVM } from '../../message/entities/MessageVM'
import { Room } from '../../../../../../domain/models/room/Room'
import { ProfileVM } from '../../profile/entities/ProfileVM'

export class RoomVM {
  id: string
  name: string
  numOfProfiles: number
  profiles: ProfileVM[]
  messages: MessageVM[]

  private constructor(p: RoomVM) {
    this.id = p.id
    this.name = p.name
    this.numOfProfiles = p.numOfProfiles
    this.profiles = p.profiles
    this.messages = p.messages
  }

  static from(p: { room: Room; profiles: ProfileVM[]; messages: MessageVM[] }): RoomVM {
    return new RoomVM({
      id: p.room.id,
      name: p.room.name,
      numOfProfiles: p.room.profileIds.length,
      profiles: p.profiles,
      messages: p.messages
    })
  }
}
