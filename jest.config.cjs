module.exports = {
  testEnvironment: 'node',
  // 使用 Babel 转换 ES 模块
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  // 忽略 node_modules 中的转换，但允许我们的源代码被转换
  transformIgnorePatterns: [
    'node_modules/(?!(.*))'
  ],
  // 模块映射
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.d.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node']
}