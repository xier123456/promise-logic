'use client'

import { Layout } from '@/components/layout/Layout'
import { HeroSection } from '@/components/features/home/sections/HeroSection'
import { FeaturesSection } from '@/components/features/home/sections/FeaturesSection'
import { LiveDemoSection } from '@/components/features/home/sections/LiveDemoSection'
import { FooterSection } from '@/components/features/home/sections/FooterSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <LiveDemoSection />
      <FeaturesSection />
      <FooterSection />
    </>
  )
}