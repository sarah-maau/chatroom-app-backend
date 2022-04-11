import { Profile } from '../../../../../../domain/models/profile/Profile'
import { IHttpRequest } from '../../../../../../gateways/IHttpGateway'

export type CreateProfileRequest = IHttpRequest<{
  Body: CreateProfileRequestPayload
}>

export class CreateProfileRequestPayload {
  username: string

  static toProfile(p: CreateProfileRequestPayload): Profile {
    return new Profile({
      username: p.username
    })
  }
}
