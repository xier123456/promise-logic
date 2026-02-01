// PromiseLogicCompletionProvider.ts
import { MonacoCompletionItem, PromiseLogicCompletionProvider as ProviderType } from '@/lib/types/promise-logic'
import { Monaco } from '@monaco-editor/react'

export function createPromiseLogicCompletionProvider(monaco: Monaco) {
  return {
    triggerCharacters: ['.'],
    provideCompletionItems: (model: Monaco, position: MonacoCompletionItem) => {
      const word = model.getWordUntilPosition(position)
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn
      }

      // 获取当前行的文本
      const lineContent = model.getLineContent(position.lineNumber)
      const textUntilPosition = lineContent.substring(0, position.column - 1)

      // 检查是否在输入 PromiseLogic. 之后
      const isAfterPromiseLogicDot = textUntilPosition.endsWith('PromiseLogic.')
      
      // 检查是否在输入 PromiseLogic 之后
      const isAfterPromiseLogic = textUntilPosition.endsWith('PromiseLogic')

      const suggestions = []

      // 如果是在 PromiseLogic. 之后，显示所有方法
      if (isAfterPromiseLogicDot) {
        const methods = [
          { label: 'and', documentation: 'AND逻辑门 - 所有Promise都成功时成功', insertText: 'and([$1])', detail: 'PromiseLogic.and(promises)' },
          { label: 'or', documentation: 'OR逻辑门 - 返回第一个成功的Promise', insertText: 'or([$1])', detail: 'PromiseLogic.or(promises)' },
          { label: 'race', documentation: 'RACE逻辑 - 返回第一个完成的Promise（无论成功或失败）', insertText: 'race([$1])', detail: 'PromiseLogic.race(promises)' },
          { label: 'allSettled', documentation: 'ALL_SETTLED逻辑 - 等待所有Promise完成，返回结果数组', insertText: 'allSettled([$1])', detail: 'PromiseLogic.allSettled(promises)' },
          { label: 'xor', documentation: 'XOR逻辑门 - 只有一个Promise成功时成功', insertText: 'xor([$1])', detail: 'PromiseLogic.xor(promises)' },
          { label: 'nand', documentation: 'NAND逻辑门 - 不是所有Promise都成功时成功', insertText: 'nand([$1])', detail: 'PromiseLogic.nand(promises)' },
          { label: 'nor', documentation: 'NOR逻辑门 - 所有Promise都失败时成功', insertText: 'nor([$1])', detail: 'PromiseLogic.nor(promises)' },
          { label: 'xnor', documentation: 'XNOR逻辑门 - 所有Promise都成功或都失败时成功', insertText: 'xnor([$1])', detail: 'PromiseLogic.xnor(promises)' },
          { label: 'majority', documentation: 'MAJORITY逻辑 - 多数Promise成功时成功', insertText: 'majority([$1])', detail: 'PromiseLogic.majority(promises)' },
          { label: 'create', documentation: '创建PromiseLogic实例（工厂模式）', insertText: 'create()', detail: 'PromiseLogic.create()' }
        ]

        methods.forEach(method => {
          suggestions.push({
            label: method.label,
            kind: monaco.languages.CompletionItemKind.Method,
            documentation: method.documentation,
            detail: method.detail,
            insertText: method.insertText,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range
          })
        })
      } else if (isAfterPromiseLogic) {
        // 如果是在 PromiseLogic 之后，建议添加点号
        suggestions.push({
          label: 'PromiseLogic',
          kind: monaco.languages.CompletionItemKind.Class,
          documentation: 'PromiseLogic库 - 使用逻辑门语义组合Promise',
          detail: 'PromiseLogic - 异步逻辑操作库',
          insertText: 'PromiseLogic',
          range: range
        })
      } else {
        // 其他情况下显示完整的PromiseLogic类
        suggestions.push({
          label: 'PromiseLogic',
          kind: monaco.languages.CompletionItemKind.Class,
          documentation: 'PromiseLogic库 - 使用逻辑门语义组合Promise',
          detail: 'PromiseLogic - 异步逻辑操作库',
          insertText: 'PromiseLogic',
          range: range
        })
      }

      return { suggestions }
    }
  }
}