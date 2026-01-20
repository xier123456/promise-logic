export const EDITOR_DEFAULT_OPTIONS = {
  minimap: { enabled: false },
  fontSize: 14,
  lineNumbers: 'on',
  scrollBeyondLastLine: false,
  automaticLayout: true,
  tabSize: 2,
  insertSpaces: true,
  wordWrap: 'on',
  theme: 'vs-light',
  suggest: {
    showMethods: true,
    showFunctions: true,
    showConstructors: true,
    showFields: true,
    preferShorterSuggestions: false,
    maxVisibleSuggestions: 12,
    insertMode: 'replace',
    verticalOffset: 0,
    horizontalOffset: -70,
    maxWidgetWidth: 500,
    matchOnWordStartOnly: false
  },
  fixedOverflowWidgets: true
}

export const DEFAULT_INITIAL_CODE = `// OR logic example - return the first successful Promise
const result = await PromiseLogic.or([
  Promise.resolve('Task 1 completed'),  // first success
  Promise.reject('Task 2 failed'),      // second failure (ignored)
  Promise.resolve('Task 3 completed')   // third success (not used)
])

console.log('First successful task:', result)
return result`