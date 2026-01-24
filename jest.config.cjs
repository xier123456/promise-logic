module.exports = {
  testEnvironment: 'node',
  
  // 转换配置
  transform: {
    '^.+\.js$': 'babel-jest',
    '^.+\.ts$': ['ts-jest', {
      tsconfig: 'tsconfig.jest.json'
    }]
  },
  

  transformIgnorePatterns: [
    'node_modules/(?!(.*))'
  ],
  

  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^(\\.{1,2}/.*)\\.ts$': '$1'
  },
  

  // 测试文件匹配模式
  testMatch: [
    '**/src/test/**/*.test.js',
    '**/src/test/**/*.test.ts'
  ],
  
  // 收集覆盖率的文件模式
  collectCoverageFrom: [
    'src/**/*.js',
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/test/**'
  ],
  
  coverageThreshold: {
    global: {
      branches: 80,  // 分支覆盖率
      functions: 80,  // 函数覆盖率
      lines: 80,   // 行覆盖率
      statements: 80  // 语句覆盖率
    }
  },
  
  // 模块文件扩展名
  moduleFileExtensions: ['js', 'ts', 'json', 'jsx', 'tsx', 'node']
}