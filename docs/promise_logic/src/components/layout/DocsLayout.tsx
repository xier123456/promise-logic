'use client'

import { ReactNode, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Layout } from './Layout'
import { cn } from '@/lib/utils/dom'
import { ChevronRight, Menu, X } from 'lucide-react'

interface DocsSidebarItem {
  title: string
  href: string
  items?: {
    title: string
    href: string
    description?: string
  }[]
}
const sidebarItems: DocsSidebarItem[] = [
  {
    title: 'Getting Started',
    href: '/docs',
    items: [
      { title: 'Introduction', href: '/docs', description: 'PromiseLogic overview and design philosophy' },
      { title: 'Concepts', href: '/docs/concepts', description: 'Core concepts of PromiseLogic' },
      { title: 'Installation', href: '/docs/installation', description: 'Installation and usage guide' },
      { title: 'Quick Start', href: '/docs/quick-start', description: 'Quick start examples' }
    ]
  },
  {
    title: 'Core Logic Gates',
    href: '/docs/logic-gates',
    items: [
      { title: 'AND Gate', href: '/docs/logic-gates/and', description: 'Succeeds when all Promises succeed' },
      { title: 'OR Gate', href: '/docs/logic-gates/or', description: 'Returns the first successful Promise' },
      { title: 'XOR Gate', href: '/docs/logic-gates/xor', description: 'Succeeds when only one Promise succeeds' },
      { title: 'NAND Gate', href: '/docs/logic-gates/nand', description: 'Succeeds when not all Promises succeed' },
      { title: 'NOR Gate', href: '/docs/logic-gates/nor', description: 'Succeeds when all Promises fail' },
      { title: 'XNOR Gate', href: '/docs/logic-gates/xnor', description: 'Succeeds when all Promises succeed or all fail' },
      { title: 'MAJORITY Gate', href: '/docs/logic-gates/majority', description: 'Succeeds when the majority of Promises succeed' }
    ]
  },
  {
    title: 'Extended Features',
    href: '/docs/extended-features',
    items: [
      { title: 'allFulfilled', href: '/docs/extended-features/all-fulfilled', description: 'Get all successful results' },
      { title: 'allRejected', href: '/docs/extended-features/all-rejected', description: 'Get all failure reasons' },
    ]
  },
  {
    title: 'Utility Methods',
    href: '/docs/utility-methods',
    items: [
      { title: 'race', href: '/docs/utility-methods/race', description: 'Return the first Promise to settle' },
      { title: 'allSettled', href: '/docs/utility-methods/allSettled', description: 'Wait for all Promises to settle' }
    ]
  },
  {
    title: 'Factory Function',
    href: '/docs/factory-function',
    items: [
      { title: 'createPromiseLogic', href: '/docs/factory-function/create-promise-logic', description: 'Create a custom instance' }
    ]
  }
]

interface DocsLayoutProps {
  children: ReactNode
}

export function DocsLayout({ children }: DocsLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/docs') return pathname === '/docs'
    return pathname.startsWith(href)
  }

  return (
    <Layout>
      <div className="flex min-h-screen">
        {/* 移动端侧边栏开关 */}
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="fixed bottom-6 right-4 z-40 md:hidden p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="打开文档菜单"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* 侧边栏 */}
        <aside className={cn(
          'fixed top-16 left-0 bottom-0 w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-30 transform transition-transform duration-300 overflow-y-auto',
          'md:translate-x-0',
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}>
          <div className="p-6">
            {/* 关闭按钮（移动端） */}
            <div className="flex justify-end items-center mb-6 md:hidden">
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="关闭菜单"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 导航菜单 */}
            <nav className="space-y-8">
              {sidebarItems.map((section) => (
                <div key={section.title} className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
                    {section.title}
                  </h3>
                  <div className="space-y-1">
                    {section.items?.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileSidebarOpen(false)}
                        className={cn(
                          'block px-3 py-2 text-sm rounded-lg transition-colors duration-200 group',
                          isActive(item.href)
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{item.title}</span>
                          {isActive(item.href) && (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </div>
                        {item.description && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                            {item.description}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* 主内容区域 */}
        <div className="flex-1 md:pl-80">
          <div className=" mx-auto  md:px-6 py-8">
            {children}
          </div>
        </div>

        {/* 移动端遮罩 */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-opacity-50 z-20 md:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}
      </div>
    </Layout>
  )
}