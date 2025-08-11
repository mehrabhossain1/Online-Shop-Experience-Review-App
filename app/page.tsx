"use client";

import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import EditReviewModal from "@/components/EditReviewModal";
import ReviewCard from "@/components/ReviewCard";
import ReviewForm from "@/components/ReviewForm";
import ReviewSkeleton from "@/components/ReviewSkeleton";
import SearchFilterBar from "@/components/SearchFilterBar";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Review } from "@/types/review.type";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function Home() {
    const [reviews, setReviews, loading] = useLocalStorage<Review[]>(
        "reviews",
        []
    );
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [editId, setEditId] = useState<string | null>(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [ratingFilter, setRatingFilter] = useState<string>("all");
    const [isFiltering, setIsFiltering] = useState(false);

    // Debounce searchTerm changes
    useEffect(() => {
        setIsFiltering(true);
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
            setIsFiltering(false);
        }, 300);

        return () => clearTimeout(handler);
    }, [searchTerm]);

    const addReview = (data: {
        shopName: string;
        reviewText: string;
        rating: string;
    }) => {
        const newReview: Review = {
            id: crypto.randomUUID(),
            shopName: data.shopName,
            reviewText: data.reviewText,
            rating: parseInt(data.rating),
            date: new Date().toLocaleString(),
        };
        setReviews([newReview, ...reviews]);
        toast.success("Review added successfully!");
    };

    const handleConfirmDelete = () => {
        const deletedReview = reviews.find((r) => r.id === deleteId);
        if (!deletedReview) return;
        setReviews(reviews.filter((r) => r.id !== deleteId));
        setDeleteId(null);
        toast.success(`Review for "${deletedReview.shopName}" deleted`);
    };

    const handleSaveEdit = (data: {
        shopName: string;
        reviewText: string;
        rating: string;
    }) => {
        setReviews((prev) =>
            prev.map((r) =>
                r.id === editId
                    ? {
                          ...r,
                          shopName: data.shopName,
                          reviewText: data.reviewText,
                          rating: parseInt(data.rating),
                          date: new Date().toLocaleString(),
                      }
                    : r
            )
        );
        toast.success("Review updated successfully!");
        setEditId(null);
    };

    const editData = editId
        ? reviews.find((r) => r.id === editId) || null
        : null;

    const filteredReviews = useMemo(() => {
        return reviews.filter((review) => {
            const matchesSearch = review.shopName
                .toLowerCase()
                .includes(debouncedSearchTerm.toLowerCase());
            const matchesRating =
                ratingFilter === "all"
                    ? true
                    : review.rating === parseInt(ratingFilter);
            return matchesSearch && matchesRating;
        });
    }, [reviews, debouncedSearchTerm, ratingFilter]);

    const clearFilters = () => {
        setSearchTerm("");
        setRatingFilter("all");
    };

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-6">
            <h1 className="text-2xl font-bold">
                Online Shop Experience Reviews
            </h1>

            <ReviewForm onSubmit={addReview} />

            <SearchFilterBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                ratingFilter={ratingFilter}
                onRatingChange={setRatingFilter}
                onClear={clearFilters}
                loading={isFiltering}
            />

            {loading ? (
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <ReviewSkeleton key={i} />
                    ))}
                </div>
            ) : filteredReviews.length > 0 ? (
                <div className="space-y-4">
                    {filteredReviews.map((r) => (
                        <ReviewCard
                            key={r.id}
                            review={r}
                            onDelete={() => setDeleteId(r.id)}
                            onEdit={() => setEditId(r.id)}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No reviews match your criteria.</p>
            )}

            <DeleteConfirmModal
                open={!!deleteId}
                onCancel={() => setDeleteId(null)}
                onConfirm={handleConfirmDelete}
            />

            <EditReviewModal
                open={!!editId}
                onCancel={() => setEditId(null)}
                onSave={handleSaveEdit}
                initialData={
                    editData
                        ? {
                              shopName: editData.shopName,
                              reviewText: editData.reviewText,
                              rating: editData.rating,
                          }
                        : null
                }
            />
        </div>
    );
}
