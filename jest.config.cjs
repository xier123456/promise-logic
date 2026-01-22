module.exports = {
  testEnvironment: 'node',
  
  // 转换配置
  transform: {
    '^.+\.js$': 'babel-jest',
    '^.+\.ts$': ['ts-jest', {
      tsconfig: 'tsconfig.jest.json'
    }]
  },
  
  // 忽略 node_modules 中的转换，但允许我们的源代码被转换
  transformIgnorePatterns: [
    'node_modules/(?!(.*))'
  ],
  
  // 模块映射
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^(\\.{1,2}/.*)\\.ts$': '$1'
  },
  
  // 测试文件匹配模式
  testMatch: [
    '**/src/test/**/*.test.js',
    '**/src/test/**/*.test.ts'
  ],
  
  collectCoverageFrom: [
    'src/**/*.js',
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/test/**'
  ],
  
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  
  moduleFileExtensions: ['js', 'ts', 'json', 'jsx', 'tsx', 'node']
}