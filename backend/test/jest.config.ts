export default {
  preset: 'ts-jest/presets/js-with-ts-esm',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': ['$1.js', '$1.ts'], // Ищем .js, если не найдено — ищем .ts
  },
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  verbose: true,
  rootDir: '../',  // Корневая директория = backend
  testMatch: [
    '**/*.spec.ts',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    'cjs'
  ],
};
