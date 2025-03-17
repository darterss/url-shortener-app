export default {
  preset: 'ts-jest/presets/js-with-ts-esm',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '^src/url/url.controller.js$': 'src/url/url.controller.ts',
    '^src/url/url.module.js$': 'src/url/url.module.ts',
    '^src/url/url.service.js$': 'src/url/url.service.ts',
    '^src/app.controller.js$': 'src/app.controller.ts',
    '^src/app.module.js$': 'src/app.module.ts',
    '^src/app.service.js$': 'src/app.service.ts',
  },
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  verbose: true,
  rootDir: '../',  // Корневая директория = backend
  testMatch: [
    '**/src/**/*.spec.ts', // Ищем тесты только в папке src
  ],
};
