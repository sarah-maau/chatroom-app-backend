import { Message } from '../../../../../../domain/models/message/Message'
import { IHttpRequest } from '../../../../../../gateways/IHttpGateway'

export type CreateMessageRequest = IHttpRequest<{
  Body: CreateMessageRequestPayload
}>

export class CreateMessageRequestPayload {
  content: string

  static toMessage(p: CreateMessageRequestPayload): Message {
    return new Message({
      content: p.content,
      createdDate: new Date()
    })
  }
}
