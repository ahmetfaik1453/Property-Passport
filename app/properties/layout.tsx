import React from 'react'
import DashboardLayout from '../dashboard/layout'

export default function PropertiesRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}
