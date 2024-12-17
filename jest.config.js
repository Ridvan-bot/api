module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: './src/lib/test/globalSetup.ts',
  globalTeardown: './src/lib/test/globalTeardown.ts',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
};