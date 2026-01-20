interface NoteSectionProps {
  title: string
  items: string[]
}

export function NoteSection({ title, items }: NoteSectionProps) {
  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-3">
        {title}
      </h3>
      <ul className="text-yellow-700 dark:text-yellow-400 text-sm space-y-2">
        {items.map((item, index) => (
          <li key={index}>• {item}</li>
        ))}
      </ul>
    </div>
  )
}