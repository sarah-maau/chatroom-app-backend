import { Profile } from '../../../../../../domain/models/profile/Profile'
import S, { ObjectSchema } from 'fluent-json-schema'

export class ProfileVM {
  id: string
  username: string

  private constructor(p: ProfileVM) {
    this.id = p.id
    this.username = p.username
  }

  static from(profile: Profile): ProfileVM {
    return new ProfileVM({
      id: profile.id,
      username: profile.username
    })
  }

  static getFluentSchema(): ObjectSchema {
    return S.object().prop('id', S.string().required()).prop('username', S.string())
  }

  static getValidationSchema(): Record<string, unknown> {
    return { ...this.getFluentSchema(), description: ProfileVM.name }
  }
}
