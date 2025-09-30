"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CalendarIcon, Search } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SalesFilterProps {
  products: string[]
}

export function SalesFilter({ products }: SalesFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [startDate, setStartDate] = useState<Date | undefined>(
    searchParams.get("startDate") ? new Date(searchParams.get("startDate") as string) : undefined,
  )

  const [endDate, setEndDate] = useState<Date | undefined>(
    searchParams.get("endDate") ? new Date(searchParams.get("endDate") as string) : undefined,
  )

  const [product, setProduct] = useState<string>(
    searchParams.get("product") || "All Products"
  )

  const handleFilter = () => {
    const params = new URLSearchParams()

    if (startDate) {
      params.set("startDate", format(startDate, "yyyy-MM-dd"))
    }

    if (endDate) {
      params.set("endDate", format(endDate, "yyyy-MM-dd"))
    }

    if (product && product !== "All Products") {
      params.set("product", product)
    }

    params.set("page", "1") // Reset pagination

    router.push(`/dashboard/sales?${params.toString()}`)
  }

  const handleReset = () => {
    setStartDate(undefined)
    setEndDate(undefined)
    setProduct("All Products")
    router.push("/dashboard/sales")
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Start Date */}
          <div className="grid gap-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="startDate"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* End Date */}
          <div className="grid gap-2">
            <Label htmlFor="endDate">End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="endDate"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Product Dropdown */}
          <div className="grid gap-2">
            <Label htmlFor="product">Product</Label>
            <Select value={product} onValueChange={setProduct}>
              <SelectTrigger id="product">
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Products">All Products</SelectItem>
                {products.map((prod) => (
                  <SelectItem key={prod} value={prod}>
                    {prod}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleFilter}>
            <Search className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
