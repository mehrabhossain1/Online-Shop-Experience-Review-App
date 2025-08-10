"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Star } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Review } from "@/types/review.type";

export default function Home() {
    const [reviews, setReviews] = useLocalStorage<Review[]>("reviews", []);
    const [shopName, setShopName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState<number>(0);
    const [search, setSearch] = useState("");
    const [editId, setEditId] = useState<string | null>(null);

    const handleSubmit = () => {
        if (!shopName || !reviewText || rating === 0) return;

        if (editId) {
            setReviews(
                reviews.map((r) =>
                    r.id === editId
                        ? {
                              ...r,
                              shopName,
                              reviewText,
                              rating,
                              date: new Date().toLocaleString(),
                          }
                        : r
                )
            );
            setEditId(null);
        } else {
            const newReview: Review = {
                id: uuidv4(),
                shopName,
                reviewText,
                rating,
                date: new Date().toLocaleString(),
            };
            setReviews([newReview, ...reviews]);
        }

        setShopName("");
        setReviewText("");
        setRating(0);
    };

    const handleDelete = (id: string) => {
        setReviews(reviews.filter((r) => r.id !== id));
    };

    const handleEdit = (review: Review) => {
        setShopName(review.shopName);
        setReviewText(review.reviewText);
        setRating(review.rating);
        setEditId(review.id);
    };

    const filteredReviews = reviews.filter((r) =>
        r.shopName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>
                        {editId ? "Edit Review" : "Add Review"}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input
                        placeholder="Shop Name"
                        value={shopName}
                        onChange={(e) => setShopName(e.target.value)}
                    />
                    <Textarea
                        placeholder="Write your review..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                    />
                    <Select
                        onValueChange={(val) => setRating(Number(val))}
                        value={rating ? String(rating) : ""}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select Rating" />
                        </SelectTrigger>
                        <SelectContent>
                            {[1, 2, 3, 4, 5].map((n) => (
                                <SelectItem key={n} value={String(n)}>
                                    {n} Star{n > 1 && "s"}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button onClick={handleSubmit}>
                        {editId ? "Update" : "Submit"}
                    </Button>
                </CardContent>
            </Card>

            <Input
                placeholder="Search by shop name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="space-y-4">
                {filteredReviews.length > 0 ? (
                    filteredReviews.map((review) => (
                        <Card key={review.id}>
                            <CardHeader>
                                <CardTitle className="flex justify-between">
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
                                <p className="text-xs text-gray-500 mt-2">
                                    {review.date}
                                </p>
                                <div className="flex gap-2 mt-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleEdit(review)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => handleDelete(review.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No reviews yet.</p>
                )}
            </div>
        </div>
    );
}
