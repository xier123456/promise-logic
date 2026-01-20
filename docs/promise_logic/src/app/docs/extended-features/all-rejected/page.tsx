import { DocsLayout } from '@/components/layout/DocsLayout'
import { CodeMarkdown } from '@/components/features/code/markdown/code_markdown'
import { ParameterTable } from '@/components/docs/ParameterTable'
import { ReturnValue } from '@/components/docs/ReturnValue'
import { BehaviorSection } from '@/components/docs/BehaviorSection'
import { NoteSection } from '@/components/docs/NoteSection'
import { CodeExamples } from '@/components/docs/CodeExamples'
import { LogicGateDocConfig } from '@/types/docs'

export default function AllRejectedPage() {
  const config: LogicGateDocConfig = {
    title: 'PromiseLogic.allRejected()',
    tag: 'Extended Feature',
    description: 'Get all failure reasons, always returns a failure reason array',
    syntax: 'PromiseLogic.allRejected(iterable)',
    parameters: [
      {
        name: 'iterable',
        type: 'Iterable<Promise<T>>',
        description: 'An iterable collection of Promise objects'
      }
    ],
    returnType: 'Promise<Error[]>',
    returnDescription: 'Always returns a Promise that resolves to an array of reasons from all failed Promises (may be empty).',
    behaviors: [
      {
        type: 'success' as const,
        title: 'Success Condition',
        description: 'Waits for all Promises to complete, then returns an array of reasons from all failed Promises.'
      },
      {
        type: 'error' as const,
        title: 'Special Case',
        description: 'The allRejected method never fails, even if all Promises succeed it will return an empty array.'
      }
    ],
    examples: [
      {
        title: 'Basic Usage',
        description: 'Get all failed operation reasons',
        initialCode: `// Get all failed operation reasons
import { PromiseLogic } from 'promise-logic';

async function getAllFailedReasons() {
  const failures = await PromiseLogic.allRejected([
    Promise.resolve('Operation 1 succeeded'),
    Promise.reject('Operation 2 failed'),
    Promise.resolve('Operation 3 succeeded'),
    Promise.reject('Operation 4 failed')
  ]);

  console.log('Failed operation reasons:', failures);
  console.log('Failure count:', failures.length);
  return failures;
}

await getAllFailedReasons();`
      },
      {
        title: 'Error Analysis Report',
        description: 'Generate detailed error analysis report',
        initialCode: `// Generate detailed error analysis report
import { PromiseLogic } from 'promise-logic';

async function generateErrorReport() {
  const operations = [
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/invalid').then(r => r.json()), // This will fail
    fetch('/api/comments').then(r => r.json()),
    fetch('/api/unknown').then(r => r.json())  // This will also fail
  ];

  const failedReasons = await PromiseLogic.allRejected(operations);
  
  console.log('Error analysis report:');
  console.log('Total operations:', operations.length);
  console.log('Failed operations:', failedReasons.length);
  console.log('Failure rate:', (failedReasons.length / operations.length * 100).toFixed(1) + '%');
  
  // Analyze error types
  const errorTypes = failedReasons.reduce((acc, error) => {
    const type = error.name || 'UnknownError';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});
  
  console.log('Error type distribution:', errorTypes);
  console.log('Detailed error information:');
  failedReasons.forEach((error, index) => {
    console.log('Error '+(index + 1)+':', error.message);
  });
  
  return {
    total: operations.length,
    failed: failedReasons.length,
    failureRate: failedReasons.length / operations.length,
    errorTypes,
    details: failedReasons
  };
}

await generateErrorReport();`
      },
      {
        title: 'Fault-Tolerant System Monitoring',
        description: 'Monitor system errors and implement recovery strategies',
        initialCode: `// Monitor system errors and implement recovery strategies
import { PromiseLogic } from 'promise-logic';

class SystemMonitor {
  async monitorServices(services) {
    const servicePromises = services.map(service => 
      this.checkServiceHealth(service)
        .catch(error => {
          console.warn('Service '+service+' health check failed:', error.message);
          throw error; // Continue throwing error, let allRejected collect
        })
    );

    // Get all failed service checks
    const failedServices = await PromiseLogic.allRejected(servicePromises);
    
    if (failedServices.length > 0) {
      console.log('Number of unhealthy services found:', failedServices.length);
      
      // Implement recovery strategy
      await this.implementRecoveryStrategy(failedServices);
      
      // Generate monitoring report
      this.generateMonitoringReport({
        totalServices: services.length,
        failedServices: failedServices.length,
        healthyServices: services.length - failedServices.length,
        failures: failedServices
      });
    } else {
      console.log('All services running normally');
    }
    
    return failedServices;
  }

  async checkServiceHealth(service) {
    // Simulate service health check
    const response = await fetch('/api/health/'+service);
    if (!response.ok) {
      throw new Error('Service '+service+' response abnormal: '+response.status);
    }
    const data = await response.json();
    if (data.status !== 'healthy') {
      throw new Error('Service '+service+' status abnormal: '+data.status);
    }
    return data;
  }

  async implementRecoveryStrategy(failures) {
    console.log('Implementing recovery strategy...');
    // Here you can implement specific recovery logic
    // Such as restarting services, switching backups, sending alerts, etc.
    for (const failure of failures) {
      console.log('Handling failure:', failure.message);
    }
  }

  generateMonitoringReport(report) {
    console.log('=== System Monitoring Report ===');
    console.log('Total services:', report.totalServices);
    console.log('Healthy services:', report.healthyServices);
    console.log('Abnormal services:', report.failedServices);
    console.log('Health rate:', (report.healthyServices / report.totalServices * 100).toFixed(1) + '%');
  }
}

// Execute example
const monitor = new SystemMonitor();
const services = ['auth', 'database', 'cache', 'api', 'storage'];
await monitor.monitorServices(services);`
      }
    ],
    notes: [
      'allRejected always returns successful results, even if all Promises succeed it returns an empty array',
      'Suitable for scenarios where you need to analyze failure reasons without caring about success scenarios',
      'Can be used for error monitoring, system health checks, failure analysis, etc.',
      'Returned array only contains reasons from failed Promises, no success information',
      'Combined with allFulfilled can build a complete operation analysis system'
    ]
  }

  return (
      <div className="w-100 sm:w-[75%] mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {config.title}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded">
              {config.tag}
            </span>
            <span>{config.description}</span>
          </div>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg text-gray-600 dark:text-gray-300 dark:prose-invert max-w-none mb-12">
          <p>
            The <code>{config.title}</code> method is used to get reasons from all failed Promises,
            regardless of how many Promises succeed, it always returns a failure reason array.
          </p>
          <p>
            This method is particularly suitable for applications that need to deeply analyze error causes,
            such as error monitoring systems, fault diagnosis, performance analysis, etc.
          </p>
        </div>

        {/* Syntax */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Syntax</h2>
            <CodeMarkdown
              content={`\`\`\`javascript\n ${config.syntax}\n\`\`\``}
            />
        </div>

        {/* Parameters */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Parameters</h2>
          <ParameterTable parameters={config.parameters} />
        </div>

        {/* Return Value */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Return Value</h2>
          <ReturnValue 
            description={config.returnDescription}
            type={config.returnType}
          />
        </div>

        {/* Behavior */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Behavior</h2>
          <BehaviorSection behaviors={config.behaviors} />
        </div>

        {/* Examples */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Examples</h2>
          <CodeExamples examples={config.examples} />
        </div>

        {/* Combined use with allFulfilled */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Combined use with allFulfilled</h2>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">Complete Operation Analysis</h3>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg">
              <CodeMarkdown
                content={"```javascript\nimport { PromiseLogic } from 'promise-logic';\n\nasync function analyzeOperations(operations) {\n  // Parallelly get successful and failed results\n  const [successfulResults, failedReasons] = await Promise.all([\n    PromiseLogic.allFulfilled(operations),\n    PromiseLogic.allRejected(operations)\n  ]);\n  \n  return {\n    total: operations.length,\n    successful: successfulResults.length,\n    failed: failedReasons.length,\n    successRate: successfulResults.length / operations.length,\n    successfulResults,\n    failedReasons\n  };\n}\n```"}
              />
            </div>
            
            <p className="text-blue-700 dark:text-blue-400 text-sm mt-4">
              This combined usage can build a complete operation analysis system, simultaneously getting detailed information about successes and failures.
            </p>
          </div>
        </div>

        {/* Important Notes */}
        <NoteSection title="Important Notes" items={config.notes} />
      </div>
  )
}