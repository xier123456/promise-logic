'use client'

import { DocsLayout } from '@/components/layout/DocsLayout'
import { DocLinkCard } from '@/components/docs/home/DocLinkCard'
import { CodeMarkdown } from '@/components/features/code/markdown/code_markdown'

export default function DocsPage() {

  const coreConcepts = [
    {
      href: '/docs/installation',
      title: 'Installation',
      description: 'Step-by-step installation and configuration guide'
    },
    {
      href: '/docs/logic-gates',
      title: 'Logic Gate Semantics',
      description: 'Understand the core design philosophy of PromiseLogic'
    }
  ]

  const apiReferences = [
    {
      href: '/docs/and',
      title: 'Core Logic Gates',
      description: 'Basic logic operations like AND, OR, XOR'
    },
    {
      href: '/docs/extended-operations',
      title: 'Extended Operations',
      description: 'Advanced result analysis and validation features'
    }
  ]

  const quickStartCode = `import { PromiseLogic } from 'promise-logic';

// AND logic – succeeds when all Promises succeed
const results = await PromiseLogic.and([
  fetch('/api/users'),
  fetch('/api/posts')
]);

// OR logic – returns the first successful Promise
const data = await PromiseLogic.or([
  fetchPrimaryService(),
  fetchBackupService()
]);`

  return (
      <article className='w-100 sm:w-[75%] mx-auto'>
        {/* Page header */}
        <header className="my-12">
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Compose Promises with logic-gate semantics to make async programming intuitive.
            <span className="font-medium text-blue-600 dark:text-blue-400">"Forget the API, remember the logic."</span>
          </p>
        </header>

        {/* Feature highlights */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Features</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Complete Logic-Gate Semantics</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Full set of logic gates—AND, OR, XOR, NAND, NOR, XNOR, MAJORITY—makes async flows explicit. Combine multiple Promises to express complex async logic naturally.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Extended Promise Operations</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Collect all success/failure results, perform full settlement analysis, strict validation, and more—ready for demanding business scenarios.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Dual API Modes</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Static class methods plus configurable factory functions adapt to any coding style—pick the approach that fits your context.
              </p>
            </div>
          </div>
        </section>

        {/* Quick start */}
        <section className="rounded-xl p-8 mb-12 bg-gray-50 dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Start</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Install</h3>
                <CodeMarkdown content={`\`\`\`bash\nnpm install promise-logic\n\`\`\``} />
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Basic Usage</h3>
                <CodeMarkdown content={`\`\`\`javascript\n${quickStartCode}\n\`\`\``} />
            </div>
          </div>
        </section>

        {/* Documentation sections */}
        <section className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Core Concepts</h2>
            <div className="space-y-4">
              {coreConcepts.map((item, index) => (
                <DocLinkCard
                  key={index}
                  href={item.href}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">API Reference</h2>
            <div className="space-y-4">
              {apiReferences.map((item, index) => (
                <DocLinkCard
                  key={index}
                  href={item.href}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </section>
      </article>
  )
}