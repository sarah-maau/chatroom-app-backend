import { Profile } from '../../../../../../domain/models/profile/Profile'
import { IHttpRequest } from '../../../../../../gateways/IHttpGateway'
import S, { ObjectSchema } from 'fluent-json-schema'

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

  static getFluentSchema(): ObjectSchema {
    return S.object().prop('pseudo', S.string().required())
  }

  static getValidationSchema(): Record<string, unknown> {
    return {
      description: 'CreateProfileRequest',
      tags: ['Profile'],
      body: this.getFluentSchema()
    }
  }
}
