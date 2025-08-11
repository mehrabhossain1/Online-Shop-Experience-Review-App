"use client";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Props = {
    sortBy: string;
    setSortBy: (val: string) => void;
};

export default function SortOptions({ sortBy, setSortBy }: Props) {
    return (
        <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort reviews" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="highest">Highest Rating</SelectItem>
            </SelectContent>
        </Select>
    );
}
