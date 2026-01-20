import { Cpu, Code, Shield, Zap } from 'lucide-react'
import { FeatureItem } from '../types/common'

export const FEATURES: FeatureItem[] = [
  {
    icon: Cpu,
    title: 'Logic-Gate Semantics',
    description: 'Compose Promises using AND, OR, XOR and other logic-gate concepts for more intuitive async programming'
  },
  {
    icon: Code,
    title: 'Dual-Mode API',
    description: 'Supports both static class methods and factory functions to suit different development scenarios'
  },
  {
    icon: Shield,
    title: 'Type Safety',
    description: 'Full TypeScript support with excellent developer experience and code hints'
  },
  {
    icon: Zap,
    title: 'Production Ready',
    description: 'Rigorously tested and tree-shakeable, ready for production environments'
  }
]