export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface CodeExecutionRequest {
  code: string
  language: 'javascript' | 'typescript'
}