import { IHttpRequest } from '../../../../../../gateways/IHttpGateway'

export type LinkMessageProfileRoomRequest = IHttpRequest<{
  Body: LinkMessageProfileRoomRequestPayload
}>

export class LinkMessageProfileRoomRequestPayload {
  messageId: string
  profileId: string
  roomId: string
}