import { Message } from '../../../../../../domain/models/message/Message'
import { ProfileVM } from '../../profile/entities/ProfileVM'
import S, { ObjectSchema } from 'fluent-json-schema'

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

  static getFluentSchema(): ObjectSchema {
    return S.object()
      .prop('id', S.string().required())
      .prop('content', S.string().required())
      .prop('profile', ProfileVM.getFluentSchema().required())
      .prop('createdDate', S.string().format(S.FORMATS.DATE_TIME).required())
  }

  static getValidationSchema(): Record<string, unknown> {
    return { ...this.getFluentSchema(), description: MessageVM.name }
  }
}
