// 格式化代码
export function formatCode(code: string): string {
  return code
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n')
}

// 格式化输出
export function formatOutput(value: unknown): string {
  if (value === undefined) return 'undefined'
  if (value === null) return 'null'
  if (typeof value === 'object') {
    // 特殊处理包含result和console的对象
    if (value && 'result' in value && 'console' in value) {
      const { result, console: consoleOutput } = value as { result: unknown; console: string[] }
      let output = ''
      
      if (consoleOutput.length > 0) {
        output += consoleOutput.map(line => `console: ${line}`).join('\n') + '\n'
      }
      
      if (result !== undefined) {
        output += `result: ${typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result)}`
      }
      
      return output || 'No output'
    }
    return JSON.stringify(value, null, 2)
  }
  return String(value)
}