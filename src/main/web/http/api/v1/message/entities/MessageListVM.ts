import { MessageVM } from './MessageVM'

export class MessagesListVM {
  messages: MessageVM[]

  constructor(messages: MessageVM[]) {
    this.messages = messages
  }
}
