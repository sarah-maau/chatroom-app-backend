import { IHttpRequest } from '../../../../../../gateways/IHttpGateway'
import S, { ObjectSchema } from 'fluent-json-schema'

export type LinkMessageProfileRoomRequest = IHttpRequest<{
  Body: LinkMessageProfileRoomRequestPayload
}>

export class LinkMessageProfileRoomRequestPayload {
  messageId: string
  profileId: string
  roomId: string

  static getFluentSchema(): ObjectSchema {
    return S.object().prop('messageId', S.string().required()).prop('profileId', S.string().required()).prop('roomId', S.string().required())
  }

  static getValidationSchema(): Record<string, unknown> {
    return {
      description: 'LinkMessageProfileRoomRequest',
      tags: ['Messages'],
      body: this.getFluentSchema()
    }
  }
}