import { Profile } from '../../../../../../domain/models/profile/Profile'

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
}
