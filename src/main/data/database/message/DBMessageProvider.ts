import { MessageDocument, DBMessageModel } from './MessageSchema'
import { filterNullAndUndefinedAndEmpty } from '../../../domain/helpers/ArraysHelpers'
import { Message } from '../../../domain/models/message/Message'
import { IMessageProvider } from '../../../domain/providers/IMessageProvider'
import { ProviderErrors } from '../../errors/ProviderErrors'

export class DBMessageProvider implements IMessageProvider {
  private static toMessage(doc: MessageDocument): Message {
    return new Message({
      id: doc.id,
      content: doc.content,
      createdDate: doc.createdDate
    })
  }

  private static fromMessage(message: Message): MessageDocument {
    return {
      id: message.id,
      content: message.content,
      createdDate: message.createdDate,
    } as MessageDocument
  }

  async create(message: Message): Promise<Message> {
    return DBMessageProvider.toMessage(await DBMessageModel.create(DBMessageProvider.fromMessage(message)))
  }

  async findOneById(id: string): Promise<Message> {
    const message = await DBMessageModel.findById(id).exec()
    if (!message) {
      throw ProviderErrors.EntityNotFound(Message.name)
    }
    return DBMessageProvider.toMessage(message)
  }

  async findAll(): Promise<Message[]> {
    const results = await DBMessageModel.find().exec()
    return results.map((c) => DBMessageProvider.toMessage(c))
  }

  async findAllByIdIn(ids: string[]): Promise<Message[]> {
    const results = await DBMessageModel.find({
      _id: { $in: ids.filter(filterNullAndUndefinedAndEmpty()) }
    }).exec()
    return results.map((entity) => DBMessageProvider.toMessage(entity))
  }
}
