"use server"

import { revalidatePath } from "next/cache"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth" // adjust path if needed

interface SaleInput {
  itemName: string
  quantity: number
  price: number
  date: Date
}

function getSalesCollectionName(userId: string) {
  return `sales_${userId}`
}

export async function createSale(data: SaleInput) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) throw new Error("Unauthorized: Not logged in")

  const userId = session.user.id
  const { db } = await connectToDatabase()

  const sale = {
    itemName: data.itemName,
    quantity: data.quantity,
    price: data.price,
    total: data.quantity * data.price,
    createdAt: data.date || new Date(),
  }

  await db.collection(getSalesCollectionName(userId)).insertOne(sale)

  revalidatePath("/dashboard")
  revalidatePath("/dashboard/sales")
}

export async function updateSale(id: string, data: SaleInput) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) throw new Error("Unauthorized: Not logged in")

  const userId = session.user.id
  const { db } = await connectToDatabase()

  const updatedSale = {
    itemName: data.itemName,
    quantity: data.quantity,
    price: data.price,
    total: data.quantity * data.price,
    createdAt: data.date,
  }

  await db
    .collection(getSalesCollectionName(userId))
    .updateOne({ _id: new ObjectId(id) }, { $set: updatedSale })

  revalidatePath("/dashboard")
  revalidatePath("/dashboard/sales")
}

export async function deleteSale(id: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) throw new Error("Unauthorized: Not logged in")

  const userId = session.user.id
  const { db } = await connectToDatabase()

  await db
    .collection(getSalesCollectionName(userId))
    .deleteOne({ _id: new ObjectId(id) })

  revalidatePath("/dashboard")
  revalidatePath("/dashboard/sales")
}

export async function exportSalesCSV() {
  // Placeholder function for exporting CSV
  return { success: true }
}
