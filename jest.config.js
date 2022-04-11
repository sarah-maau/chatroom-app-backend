// eslint-disable-next-line no-undef
module.exports = {
  preset: 'ts-jest',
  displayName: 'chatroom-app-backend',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/test'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest'
  },
  collectCoverageFrom: ['src/main/**/*.ts', '!src/test/**'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  setupFilesAfterEnv: ['./jest.setup.js']
}
