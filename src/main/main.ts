import { BackendApplicationParams } from './config/BackEndApplicationParams'
import { APPLICATION_CONSTANTS } from './config/Constants'
import { DBMessageProvider } from './data/database/message/DBMessageProvider'
import { DBMessageProfileRoomRelationshipProvider } from './data/database/messageProfileRoomRelationship/DBMessageProfileRoomRelationshipProvider'
import { MongoGateway } from './data/database/MongoGateway'
import { DBProfileProvider } from './data/database/profile/DBProfileProvider'
import { DBRoomProvider } from './data/database/room/DBRoomProvider'
import { MessageService } from './domain/services/MessageService'
import { ProfileService } from './domain/services/ProfileService'
import { RoomService } from './domain/services/RoomService'
import { IMongoGateway } from './gateways/IMongoGateway'
import log from './helpers/logs/Logging'
import socket from './socket/socket'
import { MessageController } from './web/http/api/v1/message/MessageController'
import { ProfileController } from './web/http/api/v1/profile/ProfileController'
import { RoomController } from './web/http/api/v1/room/RoomController'
import { config } from 'dotenv'
import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
const main = express()
main.use(express.json())

const httpServer = createServer(main)

const io = new Server(httpServer, {
  cors: {
    origin: APPLICATION_CONSTANTS.CORS_ORIGIN,
    credentials: true
  }
})

export class BackendApplication {
  private dependencies: AppDependencies

  async init(p: BackendApplicationParams): Promise<AppDependencies> {
    // load environment variables
    config()
    /**
     * GATEWAYS
     */
    const database = new MongoGateway({ uri: p.db.uri, proxyUri: p.db.proxyUri })

    /**
     * PROVIDERS
     */
    const profileProvider = new DBProfileProvider()
    const roomProvider = new DBRoomProvider()
    const messageProvider = new DBMessageProvider()
    const messageProfileRoomRelationshipProvider = new DBMessageProfileRoomRelationshipProvider()
    /**
     * SERVICES
     */

    const profileService = new ProfileService({
      profileProvider: profileProvider
    })
    const roomService = new RoomService({ roomProvider: roomProvider })
    const messageService = new MessageService({
      profileProvider: profileProvider,
      messageProvider: messageProvider,
      roomProvider: roomProvider,
      messageProfileRoomRelationshipProvider: messageProfileRoomRelationshipProvider
    })

    /**
     * CONTROLLERS
     */
    new ProfileController({
      httpInstance: main,
      profileService: profileService
    })

    new RoomController({
      httpInstance: main,
      roomService: roomService,
      profileService: profileService,
      messageService: messageService
    })

    new MessageController({
      httpInstance: main,
      messageService: messageService,
      profileService: profileService,
      roomService: roomService
    })

    this.dependencies = new AppDependencies({
      databaseGateway: database
    })
    return this.dependencies
  }

  async start(): Promise<boolean> {
    await this.dependencies.databaseGateway.start()

    httpServer.listen(APPLICATION_CONSTANTS.PORT, APPLICATION_CONSTANTS.HOST, () => {
      log.info(`🚀 Server is listening at port ${APPLICATION_CONSTANTS.PORT} 🚀`)
      log.info(`http://${APPLICATION_CONSTANTS.HOST}:${APPLICATION_CONSTANTS.PORT}`)

      socket({ io })
    })

    // eslint-disable-next-line no-process-env
    return Promise.resolve(true)
  }

  async stop(): Promise<boolean> {
    await this.dependencies.databaseGateway.stop()
    return Promise.resolve(true)
  }
}

export class AppDependencies {
  databaseGateway: IMongoGateway

  constructor(p: AppDependencies) {
    this.databaseGateway = p.databaseGateway
  }
}
