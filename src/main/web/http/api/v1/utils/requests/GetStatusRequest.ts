import { Request } from 'express'

export type GetStatusRequest = Request<never>

export const GetStatusRequestSchema = {
  description: 'GetStatusRequest',
  tags: ['Status']
}
