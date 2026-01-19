// jest.config.cjs
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/Test/setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { 
      tsconfig: {
        // Esto sobreescribe la regla conflictiva solo para Jest
        verbatimModuleSyntax: false,
        jsx: 'react-jsx'
      }
    }],
  },
  testMatch: [
    '**/+(*.)+(spec|test).ts',
    '**/+(*.)+(spec|test).tsx',
  ],
};