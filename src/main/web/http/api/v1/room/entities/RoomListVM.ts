import { RoomVM } from './RoomVM'
import S, { ObjectSchema } from 'fluent-json-schema'

export class RoomsListVM {
  rooms: RoomVM[]

  constructor(rooms: RoomVM[]) {
    this.rooms = rooms
  }

  static getFluentSchema(): ObjectSchema {
    return S.object().prop('rooms', S.array().items(RoomVM.getFluentSchema()))
  }

  static getValidationSchema(): Record<string, unknown> {
    return { ...this.getFluentSchema().valueOf(), description: RoomsListVM.name }
  }
}
