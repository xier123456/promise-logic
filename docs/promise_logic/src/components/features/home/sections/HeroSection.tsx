'use client'

import { useState, useEffect, useRef } from 'react'
import { LogicGateCodeDemo } from '../logic-gate/LogicGateCodeDemo'
import { copyToClipboard } from '@/lib/utils/dom'
import { LOGIC_GATES, LOGIC_GATE_TRUTH_TABLE } from '@/lib/constants/logic-gates'
import { LogicGateType } from '@/lib/types/logic-gate'
import { Check, Copy } from 'lucide-react'

export function HeroSection() {
  const [copied, setCopied] = useState(false)
  const [activeGate, setActiveGate] = useState<LogicGateType>('AND')
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  // 滚动动画效果
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // 动态切换逻辑门演示
  useEffect(() => {
    let currentIndex = 0

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % LOGIC_GATES.length
      setActiveGate(LOGIC_GATES[currentIndex])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleCopyInstall = async () => {
    await copyToClipboard('npm install promise-logic')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section ref={heroRef} className="relative min-h-screen py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 
      bg-gradient-to-r
       from-blue-600/10 to-purple-600/10
       dark:from-blue-500/10 dark:to-purple-500/10
      " />
      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* 左侧内容 */}
          <div className="space-y-6 md:space-y-8">
            <div className={`space-y-4 md:space-y-6 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 leading-tight bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Compose Promises with{' '}
                <span className="text-primary-600 dark:text-primary-400">Logic Gate</span>
                <br className="hidden sm:block" />
                Semantics
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                <span className="font-semibold text-primary-600 dark:text-primary-400 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-300 dark:to-purple-300 bg-clip-text text-transparent">"Forget APIs, remember logic."</span>{' '}
                PromiseLogic provides intuitive logical gate semantics for Promise composition.
              </p>
            </div>

            {/* 安装命令 */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <code className="flex-1 bg-gray-900 dark:bg-gray-800 text-white px-6 py-4 rounded-xl font-mono text-sm border-l-4 border-blue-500 shadow-lg">
                  npm install promise-logic
                </code>
                <button
                  onClick={handleCopyInstall}
                  className="flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {copied ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                  <span className="font-medium">{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* 特性亮点 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
              <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">7+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Logic Gates</div>
              </div>
              <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">TypeScript</div>
              </div>
              <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">0</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Dependencies</div>
              </div>
              <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">∞</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Possibilities</div>
              </div>
            </div>
          </div>

          {/* 右侧代码块演示 */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-full min-w-xl ">
              <LogicGateCodeDemo
                activeGate={activeGate}
              />
              </div>
          </div>
        </div>
      </div>
    </section>
  )
}