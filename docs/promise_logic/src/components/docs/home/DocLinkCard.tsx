import Link from 'next/link'

interface DocLinkCardProps {
  href: string
  title: string
  description: string
}

export function DocLinkCard({ href, title, description }: DocLinkCardProps) {
  return (
    <Link 
      href={href} 
      className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
    >
      <div className="flex items-center justify-between">
        <span className="font-medium text-gray-900 dark:text-white">{title}</span>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
        {description}
      </p>
    </Link>
  )
}