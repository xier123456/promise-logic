module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }]
  ],
  // 启用 ES 模块支持
  env: {
    test: {
      presets: [
        ['@babel/preset-env', { 
          targets: { node: 'current' },
          modules: 'commonjs' // 在测试环境中使用 CommonJS
        }]
      ]
    }
  }
}