export class MessageProfileRoomRelationship {
  id: string
  messageId: string
  profileId: string
  roomId: string
  createdDate: Date
  updatedDate: Date

  constructor(p: Partial<MessageProfileRoomRelationship>) {
    this.id = p.id ?? ''
    this.messageId = p.messageId ?? ''
    this.profileId = p.profileId ?? ''
    this.roomId = p.roomId ?? ''
    this.createdDate = p.createdDate ?? new Date()
    this.updatedDate = p.updatedDate ?? new Date()
  }
}
