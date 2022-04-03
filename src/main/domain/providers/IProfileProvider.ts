import { Profile } from '../models/profile/Profile'

export interface IProfileProvider {
  create(profile: Profile): Promise<Profile>
  findOneById(id: string): Promise<Profile>
  findAll(): Promise<Profile[]>
  findAllByIdIn(ids: string[]): Promise<Profile[]>
}
