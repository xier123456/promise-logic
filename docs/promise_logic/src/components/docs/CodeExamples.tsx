import { CodeExample } from '@/components/docs/home/CodeExample'
import { CodeExampleData } from '@/types/docs'

interface CodeExamplesProps {
  examples: CodeExampleData[]
}

export function CodeExamples({ examples }: CodeExamplesProps) {
  return (
    <div className="space-y-8">
      {examples.map((example, index) => (
        <CodeExample
          key={index}
          title={example.title}
          description={example.description}
          initialCode={example.initialCode}
        />
      ))}
    </div>
  )
}