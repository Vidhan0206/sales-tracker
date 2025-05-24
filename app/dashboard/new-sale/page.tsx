import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { SaleForm } from "@/components/sale-form"

export const metadata: Metadata = {
  title: "New Sale - Store Sales Tracker",
  description: "Record a new sale",
}

export default function NewSalePage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="New Sale" description="Record a new sales transaction" />
      <div className="grid gap-4">
        <SaleForm />
      </div>
    </DashboardShell>
  )
}
