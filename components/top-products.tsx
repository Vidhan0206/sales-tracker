import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface Product {
  name: string
  quantity: number
  revenue: number
  percentage: number
}

interface TopProductsProps {
  products: Product[]
}

export function TopProducts({ products }: TopProductsProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
        <CardDescription>Your best-selling products by revenue</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium">{product.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {product.quantity} sold · Rs {product.revenue.toFixed(2)}
                  </span>
                </div>
                <span className="text-sm font-medium">{product.percentage}%</span>
              </div>
              <Progress value={product.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
