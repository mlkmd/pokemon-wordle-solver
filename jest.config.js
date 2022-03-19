// @see https://nextjs.org/docs/testing#jest-and-react-testing-library
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  // @see https://github.com/facebook/jest/issues/2144
  modulePaths: ['<rootDir>/src/'],
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
