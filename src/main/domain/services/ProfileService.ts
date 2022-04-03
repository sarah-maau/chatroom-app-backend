import { logger } from '../helpers/logs/Logging'
import { Profile } from '../models/profile/Profile'
import { IProfileProvider } from '../providers/IProfileProvider'

export class ProfileService {
  private profileProvider: IProfileProvider
  private readonly logger = logger(this.constructor.name)

  constructor(p: { profileProvider: IProfileProvider }) {
    this.profileProvider = p.profileProvider
  }

  async create(p: { profile: Profile }): Promise<Profile> {
    const profile = await this.profileProvider.create(new Profile({ username: p.profile.username }))
    this.logger.info(`create > Profile[${profile.id}]`)
    return profile
  }

  async findAll(): Promise<Profile[]> {
    return this.profileProvider.findAll()
  }

  async findOneById(id: string): Promise<Profile> {
    return this.profileProvider.findOneById(id)
  }

  async findAllByIdIn(ids: string[]): Promise<Profile[]> {
    return this.profileProvider.findAllByIdIn(ids)
  }
}
