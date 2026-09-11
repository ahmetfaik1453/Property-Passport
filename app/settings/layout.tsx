import React from 'react'
import DashboardLayout from '../dashboard/layout'

export default function SettingsRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}
