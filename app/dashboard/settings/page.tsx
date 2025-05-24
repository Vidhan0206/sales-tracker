import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { SettingsForm } from "@/components/settings-form"

export const metadata: Metadata = {
  title: "Settings - Store Sales Tracker",
  description: "Manage your store settings",
}

export default function SettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Settings" description="Manage your store settings and preferences" />
      <div className="grid gap-4">
        <SettingsForm />
      </div>
    </DashboardShell>
  )
}
