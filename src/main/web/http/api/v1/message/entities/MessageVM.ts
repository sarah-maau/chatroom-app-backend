import { Message } from '../../../../../../domain/models/message/Message'
import { ProfileVM } from '../../profile/entities/ProfileVM'

export class MessageVM {
  id: string
  content: string
  profile: ProfileVM
  createdDate: Date

  private constructor(p: MessageVM) {
    this.id = p.id
    this.content = p.content
    this.profile = p.profile
    this.createdDate = p.createdDate
  }

  static from(p: { message: Message; profile: ProfileVM }): MessageVM {
    return new MessageVM({
      id: p.message.id,
      content: p.message.content,
      profile: p.profile,
      createdDate: p.message.createdDate
    })
  }
}
