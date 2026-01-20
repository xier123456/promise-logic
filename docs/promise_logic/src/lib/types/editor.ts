export interface CodeExecutionResult {
  result: unknown
  console: string[]
}

export interface EditorOutput {
  type: 'result' | 'error'
  value: unknown
}

export interface InteractiveCodeEditorProps {
  initialCode: string
  language?: 'javascript' | 'typescript'
  height?: number
  onRun?: (code: string) => Promise<unknown>
  showConsole?: boolean
  livePreview?: boolean
  readOnly?: boolean
  className?: string
}

export interface EditorToolbarProps {
  language: string
  livePreview?: boolean
  isRunning?: boolean
  onRun?: () => void
  onClear?: () => void
  showConsole?: boolean
}

export interface ConsoleOutputProps {
  outputs: { type: 'result' | 'error'; value: unknown }[]
  error: string | null
}