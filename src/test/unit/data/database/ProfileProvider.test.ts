import { DBProfileProvider } from '../../../../main/data/database/profile/DBProfileProvider'
import { Profile } from '../../../../main/domain/models/profile/Profile'
import { TestHelpers } from '../../../TestHelpers'

let testHelpers: TestHelpers

beforeAll(async () => {
  testHelpers = new TestHelpers()
  await testHelpers.start()
})

beforeEach(async () => {
  await testHelpers.cleanUp()
})

// afterEach(async () => {})

afterAll(async () => {
  await testHelpers.stop()
})

test('ProfileProvider create', async () => {
  const profileProvider = new DBProfileProvider()

  const profiles: Profile[] = []
  const nbProfiles = testHelpers.chance.integer({ min: 12, max: 25 })
  // eslint-disable-next-line no-magic-numbers
  for (let i = 0; i < nbProfiles; i++) {
    const acc = await profileProvider.create(new Profile({ username: `${i}-${testHelpers.chance.name()}` }))
    profiles.push(acc)
  }

  const findAll = await profileProvider.findAll()
  expect(findAll.length).toBe(profiles.length)
  expect(findAll[0].id).toBe(profiles[0].id)
  expect(findAll[0].username).toBe(profiles[0].username)

  const findOneById = await profileProvider.findOneById(profiles[1].id)
  expect(findOneById.id).toBe(profiles[1].id)
})
