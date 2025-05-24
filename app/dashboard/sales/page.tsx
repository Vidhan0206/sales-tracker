import type { Metadata } from "next"
import { getSalesRecords } from "@/lib/data"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { SalesRecords } from "@/components/sales-records"
import { SalesFilter } from "@/components/sales-filter"

export const metadata: Metadata = {
  title: "Sales Records - Store Sales Tracker",
  description: "View and manage your sales records",
}

export default async function SalesRecordsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = typeof searchParams.page === "string" ? Number.parseInt(searchParams.page) : 1
  const startDate = typeof searchParams.startDate === "string" ? searchParams.startDate : undefined
  const endDate = typeof searchParams.endDate === "string" ? searchParams.endDate : undefined
  const product = typeof searchParams.product === "string" ? searchParams.product : undefined

  const { sales, totalPages, products } = await getSalesRecords({
    page,
    startDate,
    endDate,
    product,
  })

  return (
    <DashboardShell>
      <DashboardHeader heading="Sales Records" description="View and manage your sales records" />
      <div className="grid gap-4">
        <SalesFilter products={products} />
        <SalesRecords sales={sales} totalPages={totalPages} currentPage={page} />
      </div>
    </DashboardShell>
  )
}
