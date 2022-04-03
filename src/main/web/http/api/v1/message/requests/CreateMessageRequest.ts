import { Message } from '../../../../../../domain/models/message/Message'
import { IHttpRequest } from '../../../../../../gateways/IHttpGateway'
import S, { ObjectSchema } from 'fluent-json-schema'

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

  static getFluentSchema(): ObjectSchema {
    return S.object()
      .prop('content', S.string().required())
      .prop('createdDate', S.string().format(S.FORMATS.DATE_TIME))
  }

  static getValidationSchema(): Record<string, unknown> {
    return {
      description: 'CreateMessageRequest',
      tags: ['Messages'],
      body: this.getFluentSchema()
    }
  }
}
