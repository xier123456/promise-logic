export interface FeatureItem {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

export interface NavigationItem {
  name: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface SocialLink {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}