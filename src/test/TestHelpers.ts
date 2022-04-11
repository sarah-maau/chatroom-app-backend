import { BackendApplicationParams } from '../main/config/BackEndApplicationParams'
import { IHttpRouter } from '../main/gateways/IHttpGateway'
import { AppDependencies, BackendApplication } from '../main/main'
import { Chance } from 'chance'
import { GenericContainer, StartedTestContainer } from 'testcontainers'

export class TestHelpers {
  application: BackendApplication
  dependencies: AppDependencies
  private mongod: StartedTestContainer
  chance: Chance.Chance

  constructor() {
    this.chance = new Chance()
  }

  /* eslint-disable no-magic-numbers */
  async start(): Promise<boolean> {
    this.mongod = await new GenericContainer('mongo:5.0.6-focal').withExposedPorts(27017).start()

    const awsConfig = {
      enabled: false,
      bucketName: this.chance.guid(),
      region: 'eu-west-3',
      accessKey: this.chance.guid(),
      secretKey: this.chance.guid()
    }

    const mailjetConfig = {
      apiKey: this.chance.guid(),
      apiSecretKey: this.chance.guid(),
      apiSenderAddress: this.chance.email()
    }

    // const nockScope = nock(`https://${awsConfig}.s3.amazonaws.com`).persist(true)
    // nockScope.put('/key').reply(200)

    // instantiate the core
    this.application = new BackendApplication()
    this.dependencies = await this.application.init(
      new BackendApplicationParams({
        http: {
          port: this.chance.integer({ min: 30000, max: 31000 }),
          host: '127.0.0.1'
        },
        db: {
          uri: `mongodb://${this.mongod.getHost()}:${this.mongod.getMappedPort(27017)}/${this.chance.guid()}`
        }
      })
    )

    // start the core
    await this.application.start()

    return true
  }

  async sleep(waitTimeInMs?: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, waitTimeInMs ?? 1000))
  }

  async stop(): Promise<boolean> {
    if (this.application) {
      await this.application.stop()
    }
    if (this.mongod) {
      await this.mongod.stop()
    }
    return true
  }

  async cleanUp(): Promise<boolean> {
    await this.dependencies.databaseGateway.getConnection().dropDatabase()
    return true
  }
}
