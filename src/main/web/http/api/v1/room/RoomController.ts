import { RoomVM } from './entities/RoomVM'
import { CreateRoomRequest } from './requests/CreateRoomRequest'
import { Room } from '../../../../../domain/models/room/Room'
import { MessageService } from '../../../../../domain/services/MessageService'
import { ProfileService } from '../../../../../domain/services/ProfileService'
import { RoomService } from '../../../../../domain/services/RoomService'
import { HttpRouteBaseUrl } from '../../../HttpRouteBaseUrl'
import { MessageVM } from '../message/entities/MessageVM'
import { ProfileVM } from '../profile/entities/ProfileVM'
import express, { Response, Request } from 'express'
import { constants } from 'http2'

export class RoomController {
  private readonly roomService: RoomService
  private profileService: ProfileService
  private messageService: MessageService

  BASE_URL = HttpRouteBaseUrl.BASE_URL_ROOM

  constructor(p: {
    httpInstance: express.Application
    roomService: RoomService
    profileService: ProfileService
    messageService: MessageService
  }) {
    this.roomService = p.roomService
    this.profileService = p.profileService
    this.messageService = p.messageService

    const router = express.Router()

    router.get('/', this.getAll.bind(this))
    router.get('/:id', this.get.bind(this))
    router.post('/', this.create.bind(this))

    p.httpInstance.use(this.BASE_URL, router)
  }

  async getAll(req: Request, res: Response) {
    const rooms = await this.roomService.findAll()
    return res.status(constants.HTTP_STATUS_OK).json(rooms)
  }

  async get(req: Request, res: Response) {
    const room = await this.roomService.findOneById(req.params.id)
    if (!room) return res.status(constants.HTTP_STATUS_NOT_FOUND)
    const profiles: ProfileVM[] = []
    for (const id of room.profileIds) {
      profiles.push(await this.getAllProfileInfo(id))
    }
    const messages: MessageVM[] = []
    const roomMessages = await this.messageService.findAllMessagesByRoom(room.id)
    for (const message of roomMessages) {
      messages.push(await this.getAllMessageInfo(message.id, room.id))
    }

    return res.status(constants.HTTP_STATUS_OK).json(
      RoomVM.from({
        room: room,
        profiles: profiles,
        messages: messages
      })
    )
  }

  async create(req: CreateRoomRequest, res: Response) {
    const room = await this.roomService.create({
      room: new Room(req.body)
    })
    return res.status(constants.HTTP_STATUS_OK).json(room)
  }

  private async getAllProfileInfo(profileId: string): Promise<Awaited<ProfileVM>> {
    const profile = await this.profileService.findOneById(profileId)
    return ProfileVM.from(profile)
  }

  private async getAllMessageInfo(messageId: string, roomId: string): Promise<Awaited<MessageVM>> {
    const message = await this.messageService.findOneById(messageId)
    const relation = await this.messageService.findOneProfileByMessageAndRoomId({
      messageId: message.id,
      roomId: roomId
    })
    const profile = await this.profileService.findOneById(relation.profileId)

    return MessageVM.from({
      message: message,
      profile: profile
    })
  }
}
