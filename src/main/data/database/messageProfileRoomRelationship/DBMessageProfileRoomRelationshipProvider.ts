import {
  DBMessageProfileRelationshipModel,
  MessageProfileRoomRelationshipDocument
} from './MessageProfileRoomRelationshipSchema'
import { MessageProfileRoomRelationship } from '../../../domain/models/message/MessageProfileRoomRelationship'
import { IMessageProfileRoomRelationshipProvider } from '../../../domain/providers/IMessageProfileRoomRelationshipProvider'
import { ProviderErrors } from '../../errors/ProviderErrors'

export class DBMessageProfileRoomRelationshipProvider implements IMessageProfileRoomRelationshipProvider {
  private static toMessageProfileRoomRelationship(
    doc: MessageProfileRoomRelationshipDocument
  ): MessageProfileRoomRelationship {
    return new MessageProfileRoomRelationship({
      id: doc.id,
      messageId: doc.messageId,
      profileId: doc.profileId,
      roomId: doc.roomId,
      createdDate: doc.createdDate,
      updatedDate: doc.updatedDate
    })
  }

  private static fromMessageProfileRoomRelationship(
    doc: MessageProfileRoomRelationship
  ): MessageProfileRoomRelationshipDocument {
    return {
      id: doc.id,
      messageId: doc.messageId,
      profileId: doc.profileId,
      roomId: doc.roomId,
      createdDate: doc.createdDate,
      updatedDate: doc.updatedDate
    } as MessageProfileRoomRelationshipDocument
  }

  async create(relation: MessageProfileRoomRelationship): Promise<MessageProfileRoomRelationship> {
    return DBMessageProfileRoomRelationshipProvider.toMessageProfileRoomRelationship(
      await DBMessageProfileRelationshipModel.create(
        DBMessageProfileRoomRelationshipProvider.fromMessageProfileRoomRelationship(relation)
      )
    )
  }

  async findByProfileId(id: string): Promise<MessageProfileRoomRelationship[]> {
    const MessageProfileRelationships = await DBMessageProfileRelationshipModel.find({
      profileId: id
    }).exec()
    return MessageProfileRelationships.map((MessageProfileRelationship) =>
      DBMessageProfileRoomRelationshipProvider.toMessageProfileRoomRelationship(MessageProfileRelationship)
    )
  }

  async findByRoomId(id: string): Promise<MessageProfileRoomRelationship[]> {
    const MessageProfileRelationships = await DBMessageProfileRelationshipModel.find({
      roomId: id
    }).exec()
    return MessageProfileRelationships.map((MessageProfileRelationship) =>
      DBMessageProfileRoomRelationshipProvider.toMessageProfileRoomRelationship(MessageProfileRelationship)
    )
  }

  async findOneProfileByRoomAndMessage(p: {
    messageId: string
    roomId: string
  }): Promise<MessageProfileRoomRelationship> {
    const relation = await DBMessageProfileRelationshipModel.findOne({
      messageId: p.messageId,
      roomId: p.roomId
    }).exec()
    if (!relation) {
      throw ProviderErrors.EntityNotFound(MessageProfileRoomRelationship.name)
    }
    return DBMessageProfileRoomRelationshipProvider.toMessageProfileRoomRelationship(relation)
  }
}
