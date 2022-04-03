import { Request } from 'express'

export type GetProfileRequest = Request<never>

export const GetProfileRequestSchema = {
  description: 'GetProfileRequest',
  tags: ['Account']
}
