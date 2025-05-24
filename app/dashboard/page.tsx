import type { Metadata } from "next"
import { getSalesData } from "@/lib/data"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { SalesOverview } from "@/components/sales-overview"
import { RecentSales } from "@/components/recent-sales"
import { TopProducts } from "@/components/top-products"
import { SalesChart } from "@/components/sales-chart"

export const metadata: Metadata = {
  title: "Dashboard - Store Sales Tracker",
  description: "View your store sales analytics",
}

export default async function DashboardPage() {
  const { todaySales, weekSales, monthSales, recentSales, topProducts, dailySalesData } = await getSalesData()

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" description="Overview of your store sales" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SalesOverview title="Today's Sales" value={todaySales.total} description={`${todaySales.count} items sold`} />
        <SalesOverview title="This Week" value={weekSales.total} description={`${weekSales.count} items sold`} />
        <SalesOverview title="This Month" value={monthSales.total} description={`${monthSales.count} items sold`} />
        <SalesOverview title="Avg. Sale Value" value={monthSales.average} description="Per transaction" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <SalesChart data={dailySalesData} />
        </div>
        <div className="col-span-3">
          <TopProducts products={topProducts} />
        </div>
      </div>
      <div>
        <RecentSales sales={recentSales} />
      </div>
    </DashboardShell>
  )
}
