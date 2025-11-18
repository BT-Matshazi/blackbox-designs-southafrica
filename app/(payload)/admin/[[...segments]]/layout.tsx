import type { Metadata } from 'next'
import './custom.scss'

export const metadata: Metadata = {
  title: 'Blackbox Designs CMS',
  description: 'Content Management System',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
