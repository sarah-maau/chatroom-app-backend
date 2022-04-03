import { MessageProfileRoomRelationship } from '../models/message/MessageProfileRoomRelationship'

export interface IMessageProfileRoomRelationshipProvider {
  create(relation: MessageProfileRoomRelationship): Promise<MessageProfileRoomRelationship>
  findByProfileId(id: string): Promise<MessageProfileRoomRelationship[]>
  findByRoomId(id: string): Promise<MessageProfileRoomRelationship[]>
  findOneProfileByRoomAndMessage(p: { messageId: string; roomId: string }): Promise<MessageProfileRoomRelationship>
}
