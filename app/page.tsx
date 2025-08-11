"use client";

import ReviewCard from "@/components/ReviewCard";
import ReviewForm from "@/components/ReviewForm";
import SearchBar from "@/components/SearchBar";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Review } from "@/types/review.type";
import { useState } from "react";

export default function Home() {
    const [reviews, setReviews] = useLocalStorage<Review[]>("reviews", []);
    const [editReview, setEditReview] = useState<Review | null>(null);
    const [search, setSearch] = useState("");

    const handleAddOrUpdateReview = (review: Review) => {
        if (editReview) {
            setReviews(reviews.map((r) => (r.id === review.id ? review : r)));
            setEditReview(null);
        } else {
            setReviews([review, ...reviews]);
        }
    };

    const handleDelete = (id: string) => {
        setReviews(reviews.filter((r) => r.id !== id));
    };

    const handleEdit = (review: Review) => {
        setEditReview(review);
    };

    const filteredReviews = reviews
        .filter((r) => r.shopName.toLowerCase().includes(search.toLowerCase()))
        .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-6">
            <ReviewForm
                onSubmitReview={handleAddOrUpdateReview}
                editReview={editReview}
            />
            <SearchBar search={search} setSearch={setSearch} />
            <div className="space-y-4">
                {filteredReviews.length > 0 ? (
                    filteredReviews.map((review) => (
                        <ReviewCard
                            key={review.id}
                            review={review}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500">
                        No reviews found.
                    </p>
                )}
            </div>
        </div>
    );
}
