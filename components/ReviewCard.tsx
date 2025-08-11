"use client";
import { Button } from "@/components/ui/button";
import { Review } from "@/types/review.type";
import { Star } from "lucide-react";

export default function ReviewCard({
    review,
    onDelete,
    onEdit,
}: {
    review: Review;
    onDelete: () => void;
    onEdit: () => void;
}) {
    return (
        <div className="p-4 border rounded-lg shadow bg-white space-y-2">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{review.shopName}</h3>
                <div className="flex space-x-1 text-yellow-500">
                    {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                    ))}
                </div>
            </div>
            <p className="text-gray-600">{review.reviewText}</p>
            <small className="text-gray-400">{review.date}</small>
            <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" onClick={onEdit}>
                    Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={onDelete}>
                    Delete
                </Button>
            </div>
        </div>
    );
}
