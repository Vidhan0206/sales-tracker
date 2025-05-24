import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold tracking-tight">404</h1>
        <p className="mt-2 text-lg text-muted-foreground">The page you're looking for doesn't exist.</p>
        <Button asChild className="mt-4">
          <Link href="/">Go back home</Link>
        </Button>
      </div>
    </div>
  )
}
