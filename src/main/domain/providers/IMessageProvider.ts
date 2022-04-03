import { Message } from '../models/message/Message'

export interface IMessageProvider {
  create(message: Message): Promise<Message>
  findOneById(id: string): Promise<Message>
  findAll(): Promise<Message[]>
}
