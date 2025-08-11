import { Skeleton } from "@/components/ui/skeleton";

export default function ReviewSkeleton() {
    return (
        <div className="border rounded-lg p-4 space-y-3">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-20 w-full" />
        </div>
    );
}
