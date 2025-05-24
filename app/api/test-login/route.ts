// app/api/test-login/route.ts
import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { compare } from "bcrypt"

export async function POST(req: Request) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ error: "Missing email or password" }, { status: 400 })
  }

  const { db } = await connectToDatabase()
  const user = await db.collection("users").findOne({ email })

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const isValid = await compare(password, user.password)
  if (!isValid) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 })
  }

  return NextResponse.json({ message: "Login successful", user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  } })
}
