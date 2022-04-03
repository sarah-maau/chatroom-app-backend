import { ProfileVM } from './entities/ProfileVM'
import { CreateProfileRequest, CreateProfileRequestPayload } from './requests/CreateProfileRequest'
import { ProfileService } from '../../../../../domain/services/ProfileService'
import { HttpRouteBaseUrl } from '../../../HttpRouteBaseUrl'
import express, { Response, Request } from 'express'
import { constants } from 'http2'

export class ProfileController {
  private readonly profileService: ProfileService
  BASE_URL = HttpRouteBaseUrl.BASE_URL_PROFILE

  constructor(p: { httpInstance: express.Application; profileService: ProfileService }) {
    this.profileService = p.profileService

    const router = express.Router()

    router.get('/', this.getAll.bind(this))
    router.get('/:id', this.getOne.bind(this))
    router.post('/', this.create.bind(this))

    p.httpInstance.use(this.BASE_URL, router)
  }

  async getAll(req: Request, res: Response) {
    const profiles = await this.profileService.findAll()
    return res.status(constants.HTTP_STATUS_OK).json({
      profiles
    })
  }

  async getOne(req: Request, res: Response) {
    const profile = await this.profileService.findOneById(req.params.id)
    return res.status(constants.HTTP_STATUS_OK).json(ProfileVM.from(profile))
  }

  async create(req: CreateProfileRequest, res: Response) {
    const profile = await this.profileService.create({
      profile: CreateProfileRequestPayload.toProfile(req.body)
    })
    return res.status(constants.HTTP_STATUS_OK).json(ProfileVM.from(profile))
  }
}
