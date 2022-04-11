import { CreateMessageRequest, CreateMessageRequestPayload } from './requests/CreateMessageRequest'
import { LinkMessageProfileRoomRequest } from './requests/LinkMessageProfileRoomRequest'
import { MessageService } from '../../../../../domain/services/MessageService'
import { ProfileService } from '../../../../../domain/services/ProfileService'
import { RoomService } from '../../../../../domain/services/RoomService'
import { HttpRouteBaseUrl } from '../../../HttpRouteBaseUrl'
import express, { Response } from 'express'
import { constants } from 'http2'

export class MessageController {
  private readonly messageService: MessageService
  private readonly profileService: ProfileService
  private readonly roomService: RoomService

  BASE_URL = HttpRouteBaseUrl.BASE_URL_MESSAGE

  constructor(p: {
    httpInstance: express.Application
    messageService: MessageService
    profileService: ProfileService
    roomService: RoomService
  }) {
    this.messageService = p.messageService
    this.profileService = p.profileService
    this.roomService = p.roomService

    const router = express.Router()

    router.post('/', this.create.bind(this))
    router.post('/profileAndRoom', this.linkMessageProfileAndRoom.bind(this))

    p.httpInstance.use(this.BASE_URL, router)
  }

  async create(req: CreateMessageRequest, res: Response) {
    const message = await this.messageService.create({
      message: CreateMessageRequestPayload.toMessage(req.body)
    })
    return res.status(constants.HTTP_STATUS_OK).json(message)
  }

  async linkMessageProfileAndRoom(req: LinkMessageProfileRoomRequest, res: Response) {
    const { messageId, roomId, profileId } = req.body
    const message = await this.messageService.findOneById(messageId)
    if (!message) return res.status(constants.HTTP_STATUS_NOT_FOUND)

    const room = await this.roomService.findOneById(roomId)
    if (!message) return res.status(constants.HTTP_STATUS_NOT_FOUND)

    const profile = await this.profileService.findOneById(profileId)
    if (!message) return res.status(constants.HTTP_STATUS_NOT_FOUND)

    const relation = await this.messageService.linkMessageToProfileAndRoom({
      message: message,
      room: room,
      profile: profile
    })
    return res.status(constants.HTTP_STATUS_OK).json(relation)
  }
}
