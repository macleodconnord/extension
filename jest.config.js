module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@meforma|vue|toastify-js)/)',
  ],
  moduleNameMapper: {
    '^@scripts/(.*)$': '<rootDir>/app/scripts/$1',
    '^@styles/(.*)$': '<rootDir>/app/assets/styles/$1',
    '^@assets/(.*)$': '<rootDir>/app/assets/$1',
    '^@/(.*)$': '<rootDir>/app/$1',
    '!!raw-loader!(.*)$': '<rootDir>/tests/__mocks__/rawLoaderMock.js',
    '\\.(css|styl|stylus)$': '<rootDir>/tests/__mocks__/styleMock.js',
  },
  setupFiles: ['<rootDir>/tests/__mocks__/chromeMock.js'],
  testMatch: ['<rootDir>/tests/**/*.test.js'],
};
