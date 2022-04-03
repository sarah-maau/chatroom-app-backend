import { MessageVM } from './MessageVM'
import S, { ObjectSchema } from 'fluent-json-schema'

export class MessagesListVM {
  messages: MessageVM[]

  constructor(messages: MessageVM[]) {
    this.messages = messages
  }

  static getFluentSchema(): ObjectSchema {
    return S.object().prop('messages', S.array().items(MessageVM.getFluentSchema()))
  }

  static getValidationSchema(): Record<string, unknown> {
    return { ...this.getFluentSchema().valueOf(), description: MessagesListVM.name }
  }
}
