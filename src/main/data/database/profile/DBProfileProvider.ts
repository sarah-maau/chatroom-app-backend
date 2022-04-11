import { ProfileDocument, DBProfileModel } from './ProfileSchema'
import { filterNullAndUndefinedAndEmpty } from '../../../domain/helpers/ArraysHelpers'
import { Profile } from '../../../domain/models/profile/Profile'
import { IProfileProvider } from '../../../domain/providers/IProfileProvider'
import { ProviderErrors } from '../../errors/ProviderErrors'

export class DBProfileProvider implements IProfileProvider {
  private static toProfile(doc: ProfileDocument): Profile {
    return new Profile({
      id: doc.id,
      username: doc.username,
      createdDate: doc.createdDate,
      updatedDate: doc.updatedDate
    })
  }

  private static fromProfile(profile: Profile): ProfileDocument {
    return {
      id: profile.id,
      username: profile.username,
      createdDate: profile.createdDate,
      updatedDate: new Date()
    } as ProfileDocument
  }

  async create(profile: Profile): Promise<Profile> {
    return DBProfileProvider.toProfile(await DBProfileModel.create(DBProfileProvider.fromProfile(profile)))
  }

  async findOneById(id: string): Promise<Profile> {
    const profile = await DBProfileModel.findById(id).exec()
    if (!profile) {
      throw ProviderErrors.EntityNotFound(Profile.name)
    }
    return DBProfileProvider.toProfile(profile)
  }

  async findAll(): Promise<Profile[]> {
    const results = await DBProfileModel.find().exec()
    return results.map((c) => DBProfileProvider.toProfile(c))
  }

  async findAllByIdIn(ids: string[]): Promise<Profile[]> {
    const results = await DBProfileModel.find({
      _id: { $in: ids.filter(filterNullAndUndefinedAndEmpty()) }
    }).exec()
    return results.map((entity) => DBProfileProvider.toProfile(entity))
  }
}
