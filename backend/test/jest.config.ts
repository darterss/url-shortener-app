export default {
  preset: 'ts-jest/presets/default-esm', // ESM режим
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // Чтобы jest корректно работал с расширениями .js
  },
  testEnvironment: 'node',
};
