import { MessageVM } from '../../message/entities/MessageVM'
import { Room } from '../../../../../../domain/models/room/Room'
import { ProfileVM } from '../../profile/entities/ProfileVM'
import S, { ObjectSchema } from 'fluent-json-schema'

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

  static getFluentSchema(): ObjectSchema {
    return S.object()
      .prop('id', S.string().required())
      .prop('name', S.string().required())
      .prop('numOfProfile', S.number().required())
      .prop('profiles', S.array().items(ProfileVM.getFluentSchema()))
      .prop('messages', S.array().items(MessageVM.getFluentSchema()))
  }

  static getValidationSchema(): Record<string, unknown> {
    return { ...this.getFluentSchema(), description: ProfileVM.name }
  }
}
