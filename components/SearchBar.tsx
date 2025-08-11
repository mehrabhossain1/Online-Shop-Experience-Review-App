"use client";
import { Input } from "@/components/ui/input";

type Props = {
    search: string;
    setSearch: (val: string) => void;
};

export default function SearchBar({ search, setSearch }: Props) {
    return (
        <Input
            placeholder="Search by shop name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4"
        />
    );
}
