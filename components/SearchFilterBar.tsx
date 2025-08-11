import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react"; // you can use any spinner icon

type Props = {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    ratingFilter: string;
    onRatingChange: (value: string) => void;
    onClear: () => void;
    loading?: boolean;
};

export default function SearchFilterBar({
    searchTerm,
    onSearchChange,
    ratingFilter,
    onRatingChange,
    onClear,
    loading = false,
}: Props) {
    return (
        <div className="flex flex-col md:flex-row gap-4 mt-4 items-center">
            <div className="relative flex-1">
                <Input
                    placeholder="Search by shop name..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pr-10"
                />
                {loading && (
                    <Loader2
                        className="animate-spin absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        size={20}
                    />
                )}
            </div>

            <Select value={ratingFilter} onValueChange={onRatingChange}>
                <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Filter by rating" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    {[1, 2, 3, 4, 5].map((r) => (
                        <SelectItem key={r} value={String(r)}>
                            {r} Star{r > 1 ? "s" : ""}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button variant="outline" onClick={onClear}>
                Clear Filters
            </Button>
        </div>
    );
}
