import { Message } from '../models/message/Message'
import { MessageProfileRoomRelationship } from '../models/message/MessageProfileRoomRelationship'
import { Profile } from '../models/profile/Profile'
import { Room } from '../models/room/Room'
import { IMessageProfileRoomRelationshipProvider } from '../providers/IMessageProfileRoomRelationshipProvider'
import { IMessageProvider } from '../providers/IMessageProvider'
import { IProfileProvider } from '../providers/IProfileProvider'
import { IRoomProvider } from '../providers/IRoomProvider'

export class MessageService {
  private profileProvider: IProfileProvider
  private messageProvider: IMessageProvider
  private roomProvider: IRoomProvider
  private messageProfileRoomRelationshipProvider: IMessageProfileRoomRelationshipProvider

  constructor(p: {
    profileProvider: IProfileProvider
    messageProvider: IMessageProvider
    roomProvider: IRoomProvider
    messageProfileRoomRelationshipProvider: IMessageProfileRoomRelationshipProvider
  }) {
    this.profileProvider = p.profileProvider
    this.messageProvider = p.messageProvider
    this.roomProvider = p.roomProvider
    this.messageProfileRoomRelationshipProvider = p.messageProfileRoomRelationshipProvider
  }

  async findAllMessagesByRoom(roomId: string): Promise<Message[]> {
    const relations = await this.messageProfileRoomRelationshipProvider.findByRoomId(roomId)
    const messages: Message[] = []
    for (const relation of relations) {
      messages.push(await this.messageProvider.findOneById(relation.messageId))
    }
    return messages
  }

  async findOneProfileByMessageAndRoomId(p: {
    roomId: string
    messageId: string
  }): Promise<MessageProfileRoomRelationship> {
    return this.messageProfileRoomRelationshipProvider.findOneProfileByRoomAndMessage({
      roomId: p.roomId,
      messageId: p.messageId
    })
  }

  async findOneById(id: string): Promise<Message> {
    return this.messageProvider.findOneById(id)
  }

  async create(p: { message: Message }): Promise<Message> {
    const message = await this.messageProvider.create(p.message)
    return message
  }

  async linkMessageToProfileAndRoom(p: {
    message: Message
    profile: Profile
    room: Room
  }): Promise<MessageProfileRoomRelationship> {
    const newRelationship = await this.messageProfileRoomRelationshipProvider.create(
      new MessageProfileRoomRelationship({
        messageId: p.message.id,
        profileId: p.profile.id,
        roomId: p.room.id
      })
    )
    return newRelationship
  }
}
