import { Monaco, MonacoDiffEditor } from "@monaco-editor/react"

export interface PromiseLogicMethod {
  label: string
  documentation: string
  insertText: string
}

export interface MonacoCompletionItem {
  lineNumber: number
  column: number

}

export interface PromiseLogicCompletionProvider {
  triggerCharacters: string[]
  provideCompletionItems: (model: Monaco, position: MonacoCompletionItem) => { suggestions: [] }
}