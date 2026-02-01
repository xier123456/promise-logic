import { CodeMarkdown } from '@/components/features/code/markdown/code_markdown'
import { ParameterTable } from '@/components/docs/ParameterTable'
import { ReturnValue } from '@/components/docs/ReturnValue'
import { BehaviorSection } from '@/components/docs/BehaviorSection'
import { NoteSection } from '@/components/docs/NoteSection'
import { CodeExamples } from '@/components/docs/CodeExamples'
import { ErrorTypes } from '@/components/docs/ErrorTypes'

export default function AllRejectedPage() {
  const parameters = [
    {
      name: 'iterable',
      type: 'Iterable<T | PromiseLike<T>>',
      description: 'An iterable collection of Promise objects'
    }
  ]

  const behaviors = [
    {
      type: 'success' as const,
      title: 'Success Condition',
      description: 'Waits for all Promises to complete, then returns a PromiseWithTimer that resolves to an array of reasons from all failed Promises.'
    },
    {
      type: 'error' as const,
      title: 'Special Case',
      description: 'The allRejected method never fails, even if all Promises succeed it will return an empty array.'
    }
  ]

  const errorTypes: Array<{ type: string; description: string }> = []

  const examples = [
    {
      title: 'Basic Usage',
      description: 'Get all failed operation reasons',
      initialCode: `// Get all failed operation reasons
const failures = await PromiseLogic.allRejected([
  Promise.resolve('Operation 1 succeeded'),
  Promise.reject('Operation 2 failed'),
  Promise.resolve('Operation 3 succeeded'),
  Promise.reject('Operation 4 failed')
])

console.log('Failed operation reasons:', failures)
console.log('Failure count:', failures.length)
return failures`
    },
    {
      title: 'Timeout Control',
      description: 'Add timeout control with maxTimer method',
      initialCode: `// Add timeout control with maxTimer method
try {
  const failures = await PromiseLogic.allRejected([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/invalid').then(r => r.json()),
    fetch('/api/comments').then(r => r.json())
  ]).maxTimer(5000) // 5 second timeout
  
  console.log('Got failure reasons within timeout:', failures)
  return failures
} catch (error) {
  console.log('Timeout or error:', error.message)
  return error
}`
    },
    {
      title: 'Error Analysis Report',
      description: 'Generate detailed error analysis report',
      initialCode: `// Generate detailed error analysis report
async function generateErrorReport() {
  const operations = [
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/invalid').then(r => r.json()),
    fetch('/api/comments').then(r => r.json()),
    fetch('/api/unknown').then(r => r.json())
  ]

  const failedReasons = await PromiseLogic.allRejected(operations)
  
  console.log('Error analysis report:')
  console.log('Total operations:', operations.length)
  console.log('Failed operations:', failedReasons.length)
  console.log('Failure rate:', (failedReasons.length / operations.length * 100).toFixed(1) + '%')
  
  // Analyze error types
  const errorTypes = failedReasons.reduce((acc, error) => {
    const type = error.name || 'UnknownError'
    acc[type] = (acc[type] || 0) + 1
    return acc
  }, {})
  
  console.log('Error type distribution:', errorTypes)
  console.log('Detailed error information:')
  failedReasons.forEach((error, index) => {
    console.log('Error ' + (index + 1) + ':', error.message)
  })
  
  return {
    total: operations.length,
    failed: failedReasons.length,
    failureRate: failedReasons.length / operations.length,
    errorTypes,
    details: failedReasons
  }
}

await generateErrorReport()`
    },
    {
      title: 'Real Application',
      description: 'Fault-tolerant system monitoring with timeout',
      initialCode: `// Real Application: Fault-tolerant system monitoring with timeout
class SystemMonitor {
  async monitorServices(services) {
    try {
      const servicePromises = services.map(service => 
        this.checkServiceHealth(service)
          .catch(error => {
            console.warn('Service ' + service + ' health check failed:', error.message)
            throw error
          })
      )

      // Get all failed service checks
      const failedServices = await PromiseLogic.allRejected(servicePromises).maxTimer(5000)
      
      if (failedServices.length > 0) {
        console.log('Number of unhealthy services found:', failedServices.length)
        
        // Implement recovery strategy
        await this.implementRecoveryStrategy(failedServices)
        
        // Generate monitoring report
        this.generateMonitoringReport({
          totalServices: services.length,
          failedServices: failedServices.length,
          healthyServices: services.length - failedServices.length,
          failures: failedServices
        })
      } else {
        console.log('All services running normally')
      }
      
      return failedServices
    } catch (error) {
      console.error('Timeout or error:', error)
      throw error
    }
  }

  async checkServiceHealth(service) {
    const response = await fetch('/api/health/' + service)
    if (!response.ok) {
      throw new Error('Service ' + service + ' response abnormal: ' + response.status)
    }
    const data = await response.json()
    if (data.status !== 'healthy') {
      throw new Error('Service ' + service + ' status abnormal: ' + data.status)
    }
    return data
  }

  async implementRecoveryStrategy(failures) {
    console.log('Implementing recovery strategy...')
    for (const failure of failures) {
      console.log('Handling failure:', failure.message)
    }
  }

  generateMonitoringReport(report) {
    console.log('=== System Monitoring Report ===')
    console.log('Total services:', report.totalServices)
    console.log('Healthy services:', report.healthyServices)
    console.log('Abnormal services:', report.failedServices)
    console.log('Health rate:', (report.healthyServices / report.totalServices * 100).toFixed(1) + '%')
  }
}

// Execute example
const monitor = new SystemMonitor()
const services = ['auth', 'database', 'cache', 'api', 'storage']
await monitor.monitorServices(services)`
    }
  ]

  const notes = [
    'allRejected always returns successful results, even if all Promises succeed it returns an empty array',
    'Returns PromiseWithTimer which supports maxTimer() for timeout control',
    'maxTimer can only detect timeout, cannot cancel Promise operation itself',
    'Suitable for scenarios where you need to analyze failure reasons without caring about success scenarios',
    'Can be used for error monitoring, system health checks, failure analysis, etc.',
    'Returned array only contains reasons from failed Promises, no success information'
  ]

  return (
    <div className="w-[90%] sm:w-[75%] mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          PromiseLogic.allRejected()
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded">
            Extended Feature
          </span>
          <span>Get all failure reasons, always returns a failure reason array</span>
        </div>
      </div>

      {/* Introduction */}
      <div className="prose prose-lg text-gray-600 dark:text-gray-300 dark:prose-invert max-w-none mb-12">
        <p>
          The <code>PromiseLogic.allRejected()</code> method returns all failure reasons as an array, ignoring successful results.
          It returns a <code>PromiseWithTimer</code> instance which wraps native Promise and provides additional functionality.
        </p>
      </div>

      {/* Syntax */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Syntax</h2>

        <pre className="rounded-md bg-gray-50">
          <CodeMarkdown
            content={`\`\`\`javascript\n PromiseLogic.allRejected(iterable)\n\`\`\``}
          />
        </pre>
      </div>

      {/* Parameters */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Parameters</h2>
        <ParameterTable parameters={parameters} />
      </div>

      {/* Return Value */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Return Value</h2>
        <ReturnValue 
          description="Returns a PromiseWithTimer that resolves to an array of reasons from all failed Promises (may be empty)."
          type="PromiseWithTimer<unknown[]>"
        />
      </div>

      {/* Behavior */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Behavior</h2>
        <BehaviorSection behaviors={behaviors} />
      </div>

      {/* Error Types */}
      <ErrorTypes errorTypes={errorTypes} />

      {/* Examples */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Examples</h2>
        <CodeExamples examples={examples} />
      </div>

      {/* Important Notes */}
      <NoteSection title="Important Notes" items={notes} />
    </div>
  )
}
