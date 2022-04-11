import { Room } from '../../../../../../domain/models/room/Room'
import { IHttpRequest } from '../../../../../../gateways/IHttpGateway'

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
}
