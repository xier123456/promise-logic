import { DocsLayout } from '@/components/layout/DocsLayout'
import { CodeMarkdown } from '@/components/features/code/markdown/code_markdown'
import { NoteSection } from '@/components/docs/NoteSection'

export default function InstallationPage() {
  return (
    <div  className='w-100 sm:w-[75%] mx-auto'>
      {/* Page Header */}
      <div className="mb-8 ">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Installation Guide
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded">
            Getting Started
          </span>
          <span>Quickly install PromiseLogic and get started</span>
        </div>
      </div>

      {/* Introduction */}
      <div className="prose prose-lg text-gray-600 dark:text-gray-300 dark:prose-invert max-w-none mb-12">
        <p>
          PromiseLogic is a lightweight JavaScript library that provides Promise composition operations based on logic gate semantics.
          With intuitive logic gate naming, asynchronous programming becomes clearer and easier to understand.
        </p>
      </div>

      {/* Environment Requirements */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Environment Requirements</h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">Supported Environments</h3>
          <ul className="text-blue-700 dark:text-blue-400 text-sm space-y-2">
            <li>• <strong>Node.js</strong>: Version 12.0.0 and above</li>
            <li>• <strong>Browser</strong>: Modern browsers with ES6 support (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)</li>
          </ul>
        </div>
      </div>
      {/* npm install promise-logic */}

      {/* Installation Methods */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Installation Methods</h2>

        {/* npm installation */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Install with npm</h3>
              <CodeMarkdown
                content={`\`\`\`Npm\nnpm install promise-logic\n\`\`\``}
              />
        </div>

        {/* yarn installation */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Install with yarn</h3>
            <CodeMarkdown
              content={`\`\`\`Yarn\nyarn add promise-logic\n\`\`\``}
            />
        </div>

        {/* pnpm installation */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Install with pnpm</h3>
          <div className="bg-gray-50 dark:bg-gray-800 ">
            <CodeMarkdown
              content={`\`\`\`Pnpm\npnpm add promise-logic\n\`\`\``}
            />
          </div>
        </div>

        {/* CDN installation */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Install via CDN (Browser Environment)</h3>
          <div className="bg-gray-50 dark:bg-gray-800 ">
            <CodeMarkdown
                content={`\`\`\`Html\n<script src="https://unpkg.com/promise-logic@latest/dist/promise-logic.umd.js"></script>\n\`\`\``}

              />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
            After importing via CDN, the global variable is <code>PromiseLogic</code>
          </p>
        </div>
      </div>

      {/* Import and Usage */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Import and Usage</h2>

        {/* ES6 module import */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">ES6 Module Import</h3>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg ">
            <CodeMarkdown
              content={`\`\`\`Javascript\nimport { PromiseLogic } from 'promise-logic';\n\`\`\``}
             />
          </div>
        </div>

        {/* CommonJS import */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">CommonJS Import</h3>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg ">
            <CodeMarkdown
              content={`\`\`\`Javascript\nconst { PromiseLogic } = require('promise-logic');\n\`\`\``}
            />
          </div>
        </div>

        {/* Global variable usage */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Global Variable Usage (CDN Method)</h3>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg ">
            <CodeMarkdown
              content={`\`\`\`Javascript\n// Use directly after importing via script tag\nconst result = await PromiseLogic.and([promise1, promise2]);\n\`\`\``}
            />
          </div>
        </div>
      </div>

      {/* Verify Installation */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Verify Installation</h2>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg ">
          <CodeMarkdown
            content={`\`\`\`Javascript\n// Verify that PromiseLogic is correctly installed\nimport { PromiseLogic } from 'promise-logic';\n
async function verifyInstallation() {\n  try {\n    const result = await PromiseLogic.and([\n      Promise.resolve('Verification successful'),\n      Promise.resolve('PromiseLogic is working correctly')\n    ]);\n    \n    console.log('✅ PromiseLogic installed successfully!');\n    console.log('Verification result:', result);\n    return result;\n  } catch (error) {\n    console.error('❌ PromiseLogic installation failed:', error);\n    throw error;\n  }\n}\n
// Execute verification\nverifyInstallation();\n\`\`\``}
          />
        </div>
      </div>

      {/* Important Notes */}
      <NoteSection
        title="Installation Notes"
        items={[
          'Ensure your Node.js version meets requirements, check with node --version',
          'If you encounter installation issues, try clearing npm cache: npm cache clean --force',
          'For browser environments, ensure your build tool correctly configures external dependencies'
        ]}
      />
    </div>
  )
}