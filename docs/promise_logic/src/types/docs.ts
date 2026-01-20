export interface Parameter {
  name: string
  type: string
  description: string
}

export interface Behavior {
  type: 'success' | 'error'
  title: string
  description: string
}

export interface CodeExampleData {
  title: string
  description: string
  initialCode: string
}

export interface LogicGateDocConfig {
  title: string
  tag: string
  description: string
  syntax: string
  parameters: Parameter[]
  returnType: string
  returnDescription: string
  behaviors: Behavior[]
  examples: CodeExampleData[]
  notes: string[]
}

export interface FeatureCardData {
  title: string
  description: string
  color: 'blue' | 'green' | 'purple'
}

export interface DocLinkData {
  href: string
  title: string
  description: string
}