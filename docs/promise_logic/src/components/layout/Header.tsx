'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/dom'
import { Moon, Sun, Github, Menu, X } from 'lucide-react'
import { useTheme } from 'next-themes'

interface NavigationItem {
  name: string
  href: string
  description?: string
}

const navigation: NavigationItem[] = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Docs',
    href: '/docs',
  }
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // 初始化主题

  // 滚动检测
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  // 检查当前路径是否激活
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const { theme, setTheme } = useTheme()

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-gray-200/50 dark:bg-gray-900/80 dark:border-gray-700/50',
      isScrolled
        ? 'bg-white/80 backdrop-blur-md border-b border-gray-200/50 dark:bg-gray-900/80 dark:border-gray-700/50'
        : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full h-16">
          {/* Logo和品牌 */}
          <div className="flex items-center justify-between space-x-8">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PL</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PromiseLogic
              </span>
            </Link>

 
          </div>

          {/* 右侧功能区 */}
          <div className="flex items-center space-x-4">
                       {/* 桌面导航 */}
            <nav className="hidden md:flex items-center justify-end  w-full">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative group',
                    isActive(item.href)
                      ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            {/* GitHub链接 */}
            <a
              href="https://github.com/xier123456/promise-logic"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="GitHub仓库"
            >
              <Github className="w-5 h-5" />
            </a>

            {/* 主题切换 */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="切换主题"
            >
              {theme === 'dark' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            {/* 移动端菜单按钮 */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="切换菜单"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* 移动端菜单 */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 mt-2 pt-4 pb-4">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'px-4 py-3 text-base font-medium rounded-lg transition-all duration-200',
                    isActive(item.href)
                      ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                  )}
                >
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {item.description}
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}