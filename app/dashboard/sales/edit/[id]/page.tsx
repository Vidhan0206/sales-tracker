import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getSaleById } from "@/lib/data"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { EditSaleForm } from "@/components/edit-sale-form"

export const metadata: Metadata = {
  title: "Edit Sale - Store Sales Tracker",
  description: "Edit a sales record",
}

export default async function EditSalePage({
  params,
}: {
  params: { id: string }
}) {
  const sale = await getSaleById(params.id)

  if (!sale) {
    notFound()
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Edit Sale" description="Update a sales record" />
      <div className="grid gap-4">
        <EditSaleForm sale={sale} />
      </div>
    </DashboardShell>
  )
}
