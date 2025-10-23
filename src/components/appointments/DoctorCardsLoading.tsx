import { Card, CardContent, CardHeader } from "../ui/card"
import { Skeleton } from "../ui/skeleton"


function DoctorCardSkeleton() {
    return (
        <Card className="cursor-pointer transition-all hover:shadow-lg">
            <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                    <Skeleton className="w-16 h-16 rounded-full" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="w-32 h-5 " />
                        <Skeleton className="w-24 h-4 " />
                        <div className="flex items-center gap-2 mt-2">
                            <Skeleton className="w-16 h-4 " />
                        <Skeleton className="w-20 h-4 " />
                    </div>
                </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                    <Skeleton className="w-4 h-4 " />
                        <Skeleton className="w-24 h-4 " />
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="w-4 h-4 " />
                        <Skeleton className="w-24 h-4 " />
                </div>
                    <Skeleton className="w-full h-12 " />
                    <Skeleton className="w-20 h-6 " />
            </CardContent>
        </Card>
    )
}

export function DoctorCardsLoading() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({length: 6}).map((_, i) => (
            <DoctorCardSkeleton key={i} />
        ))}
    </div>
  )
}

export default DoctorCardsLoading