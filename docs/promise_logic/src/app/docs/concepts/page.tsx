import { DocsLayout } from '@/components/layout/DocsLayout'
import { CodeMarkdown } from '@/components/features/code/markdown/code_markdown'
import { NoteSection } from '@/components/docs/NoteSection'

export default function ConceptsPage() {
  return (
      <div className="w-100 sm:w-[75%] mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Core Concepts
          </h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded">
              Theoretical Foundation
            </span>
            <span>Understand PromiseLogic's design philosophy and core concepts</span>
          </div>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg text-gray-600 dark:text-gray-300 dark:prose-invert max-w-none mb-12">
          <p>
            PromiseLogic's core design philosophy is <strong>"Forget the API, remember the logic"</strong>.
            By mapping complex Promise composition operations to intuitive logic gate semantics, 
            asynchronous programming becomes more natural and easier to understand.
          </p>
        </div>

        {/* Design Philosophy */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Design Philosophy</h2>
          
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">Logic Gate Semantic Mapping</h3>
              <p className="text-blue-700 dark:text-blue-400">
                Maps digital circuit logic gate concepts to Promise composition operations, 
                allowing developers to understand asynchronous operations using familiar logical thinking.
              </p>
              <div className="mt-4 bg-white dark:bg-gray-800 rounded">
                <CodeMarkdown
                  content={"```javascript\n// Traditional approach\nconst results = await Promise.all([promise1, promise2, promise3]);\n\n// PromiseLogic approach\nconst results = await PromiseLogic.and([promise1, promise2, promise3]);\n```"}
                />
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-3">Semantic Consistency</h3>
              <p className="text-green-700 dark:text-green-400">
                Maintains full compatibility with standard Promise API while providing more intuitive semantic naming.
                Each logic gate operation has clear semantic meaning for easy memorization and usage.
              </p>
              <div className="mt-4 bg-white dark:bg-gray-800 rounded">
                <CodeMarkdown
                  content={"```javascript\n// Standard Promise API\nPromise.all()      → PromiseLogic.and()\nPromise.race()     → PromiseLogic.race()\nPromise.any()      → PromiseLogic.or()\nPromise.allSettled() → PromiseLogic.allSettled()\n```"}
                />
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-3">Extensibility Design</h3>
              <p className="text-purple-700 dark:text-purple-400">
                Beyond standard logic gates, provides extended logic gate operations (XOR, NAND, NOR, etc.) 
                to meet more complex business scenario requirements.
              </p>
              <div className="mt-4 bg-white dark:bg-gray-800 rounded">
                <CodeMarkdown
                  content={"```javascript\n// Extended logic gate examples\nconst result = await PromiseLogic.xor([promise1, promise2]); // Exactly one succeeds\nconst result = await PromiseLogic.nand([promise1, promise2]); // At least one fails\nconst result = await PromiseLogic.majority([promise1, promise2, promise3]); // Majority succeeds\n```"}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Core Concepts */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Core Concepts</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Logic Gate Fundamentals</h3>
              <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-2">
                <li>• <strong>AND Logic</strong>: Output is true when all inputs are true</li>
                <li>• <strong>OR Logic</strong>: Output is true when at least one input is true</li>
                <li>• <strong>XOR Logic</strong>: Output is true when exactly one input is true</li>
                <li>• <strong>NOT Logic</strong>: Output is false when input is true, and vice versa</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Promise Mapping</h3>
              <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-2">
                <li>• <strong>Success</strong> → Logical true (true)</li>
                <li>• <strong>Failure</strong> → Logical false (false)</li>
                <li>• <strong>Pending</strong> → Logical undetermined (pending)</li>
                <li>• <strong>Settled</strong> → Logical determined (settled)</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Composition Operations</h3>
              <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-2">
                <li>• <strong>Parallel Execution</strong>: Launch multiple async operations simultaneously</li>
                <li>• <strong>Short-circuit Behavior</strong>: Terminate execution early under certain conditions</li>
                <li>• <strong>Result Aggregation</strong>: Combine multiple results into a single result</li>
                <li>• <strong>State Analysis</strong>: Analyze completion status of all operations</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Error Handling</h3>
              <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-2">
                <li>• <strong>Immediate Failure</strong>: Fail entirely if any operation fails</li>
                <li>• <strong>Fault Tolerance</strong>: Allow partial operation failures</li>
                <li>• <strong>State Preservation</strong>: Preserve status information of all operations</li>
                <li>• <strong>Error Aggregation</strong>: Collect all failure reasons</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Application Scenarios */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Application Scenarios</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Data Loading</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Use <code>PromiseLogic.and()</code> to ensure all required data loads successfully,
                or use <code>PromiseLogic.or()</code> for service degradation strategies.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Timeout Control</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Use <code>PromiseLogic.race()</code> to compete between requests and timeouts,
                implementing graceful timeout handling mechanisms.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Batch Operations</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Use <code>PromiseLogic.allSettled()</code> to execute batch operations and analyze results,
                understanding the completion status of each operation.
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Mutually Exclusive Operations</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Use <code>PromiseLogic.xor()</code> to ensure exactly one operation succeeds,
                suitable for resource locking or uniqueness validation scenarios.
              </p>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Best Practices</h2>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Choose Appropriate Logic Gates</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Select appropriate logic gates based on business needs: use AND when all operations must succeed,
                  use OR when partial failures are acceptable, use XOR for mutually exclusive operations.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Proper Error Handling</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Wrap potentially failing operations with try-catch, or use allSettled to get all operation statuses,
                  avoiding unhandled Promise rejections.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Performance Considerations</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  For large numbers of async operations, consider batch processing or concurrency control,
                  avoiding performance issues from launching too many Promises simultaneously.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Code Readability</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Use meaningful variable names, properly comment complex logic,
                  maintain code clarity and maintainability.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <NoteSection 
          title="Important Notes"
          items={[
            'PromiseLogic enhances the standard Promise API rather than replacing it',
            'All methods return standard Promise objects and can integrate seamlessly with existing code',
            'Logic gate semantics aim to improve code readability and maintainability',
            'In real projects, choose appropriate naming conventions based on team standards'
          ]}
        />
      </div>
  )
}
