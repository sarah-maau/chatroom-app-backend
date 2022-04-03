import { Room } from '../../../../../../domain/models/room/Room'
import { IHttpRequest } from '../../../../../../gateways/IHttpGateway'
import S, { ObjectSchema } from 'fluent-json-schema'

export type CreateRoomRequest = IHttpRequest<{
  Body: CreateRoomRequestPayload
}>

export class CreateRoomRequestPayload {
  name: string
  profileIds: string[]

  static toRoom(p: CreateRoomRequestPayload): Room {
    return new Room({
      name: p.name,
      profileIds: p.profileIds
    })
  }

  static getFluentSchema(): ObjectSchema {
    return S.object().prop('name', S.string().required()).prop('profileIds', S.array().required())
  }

  static getValidationSchema(): Record<string, unknown> {
    return {
      description: 'CreateRoomRequest',
      tags: ['Room'],
      body: this.getFluentSchema()
    }
  }
}
