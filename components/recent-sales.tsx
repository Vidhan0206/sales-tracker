import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Sale {
  _id: string
  itemName: string
  quantity: number
  price: number
  total: number
  createdAt: Date
}

interface RecentSalesProps {
  sales: Sale[]
}

export function RecentSales({ sales }: RecentSalesProps) {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>Your most recent sales transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.map((sale) => (
              <TableRow key={sale._id}>
                <TableCell className="font-medium">{sale.itemName}</TableCell>
                <TableCell className="text-right">{sale.quantity}</TableCell>
                <TableCell className="text-right">Rs {sale.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">Rs {sale.total.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  {formatDistanceToNow(new Date(sale.createdAt), { addSuffix: true })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
