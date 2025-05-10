import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[150px]" />
        <Skeleton className="h-10 w-[120px]" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <div className="flex gap-4 py-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-[180px]" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardHeader className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-[200px]" />
                  <Skeleton className="h-6 w-[60px]" />
                </div>
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[80px]" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[80px]" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[80px]" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-[80px]" />
                    <Skeleton className="h-6 w-[80px]" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-[80px]" />
                  <Skeleton className="h-9 w-[80px]" />
                </div>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  )
}
