// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth" // ✅ FIXED: correct path based on your structure

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
