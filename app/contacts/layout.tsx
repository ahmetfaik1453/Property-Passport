import React from 'react'
import DashboardLayout from '../dashboard/layout'

export default function ContactsRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}
