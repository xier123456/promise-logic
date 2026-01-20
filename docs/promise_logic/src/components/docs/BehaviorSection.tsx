import { Behavior } from '@/types/docs'

interface BehaviorSectionProps {
  behaviors: Behavior[]
}

export function BehaviorSection({ behaviors }: BehaviorSectionProps) {
  const getBehaviorStyles = (type: 'success' | 'error') => {
    if (type === 'success') {
      return {
        bg: 'bg-green-50 dark:bg-green-900/20',
        border: 'border-green-200 dark:border-green-800',
        title: 'text-green-800 dark:text-green-300',
        text: 'text-green-700 dark:text-green-400'
      }
    }
    return {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      title: 'text-red-800 dark:text-red-300',
      text: 'text-red-700 dark:text-red-400'
    }
  }

  return (
    <div className="space-y-4">
      {behaviors.map((behavior, index) => {
        const styles = getBehaviorStyles(behavior.type)
        return (
          <div 
            key={index}
            className={`${styles.bg} ${styles.border} rounded-lg p-4`}
          >
            <h3 className={`font-semibold mb-2 ${styles.title}`}>
              {behavior.title}
            </h3>
            <p className={`text-sm ${styles.text}`}>
              {behavior.description}
            </p>
          </div>
        )
      })}
    </div>
  )
}