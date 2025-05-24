import type React from "react"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="flex h-16 items-center px-4 sm:px-6">
          <div className="flex items-center font-semibold">
            <h1 className="text-lg">Store Sales Tracker</h1>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </header>
      <div className="flex flex-1 flex-col md:grid md:grid-cols-[220px_1fr]">
        {/* Mobile nav shown above main content */}
        <div className="md:hidden border-b">
          <DashboardNav />
        </div>

        {/* Sidebar nav for desktop */}
        <aside className="hidden md:block border-r">
          <DashboardNav />
        </aside>

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
