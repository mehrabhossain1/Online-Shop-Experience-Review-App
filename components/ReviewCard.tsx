"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Review } from "@/types/review.type";

type Props = {
    review: Review;
    onEdit: (review: Review) => void;
    onDelete: (id: string) => void;
};

export default function ReviewCard({ review, onEdit, onDelete }: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    {review.shopName}
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-4 w-4 ${
                                    i < review.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                }`}
                            />
                        ))}
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm">{review.reviewText}</p>
                <p className="text-xs text-gray-500 mt-2">{review.date}</p>
                <div className="flex gap-2 mt-2">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(review)}
                    >
                        Edit
                    </Button>
                    <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDelete(review.id)}
                    >
                        Delete
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
