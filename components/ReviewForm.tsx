"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { v4 as uuidv4 } from "uuid";
import { Review } from "@/types/review.type";

const formSchema = z.object({
    shopName: z.string().min(2, "Shop name must be at least 2 characters"),
    reviewText: z.string().min(5, "Review must be at least 5 characters"),
    rating: z
        .string()
        .refine((val) => Number(val) > 0, {
            message: "Please select a rating",
        }),
});

type Props = {
    onSubmitReview: (review: Review) => void;
    editReview?: Review | null;
};

export default function ReviewForm({ onSubmitReview, editReview }: Props) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            shopName: editReview?.shopName || "",
            reviewText: editReview?.reviewText || "",
            rating: editReview?.rating ? String(editReview.rating) : "",
        },
    });

    const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
        const newReview: Review = {
            id: editReview?.id || uuidv4(),
            shopName: values.shopName,
            reviewText: values.reviewText,
            rating: Number(values.rating),
            date: new Date().toLocaleString(),
        };
        onSubmitReview(newReview);
        form.reset({ shopName: "", reviewText: "", rating: "" });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {editReview ? "Edit Review" : "Add Review"}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleFormSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="shopName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Shop Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter shop name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="reviewText"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Review</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Write your review..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="rating"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rating</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select rating" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {[1, 2, 3, 4, 5].map((n) => (
                                                    <SelectItem
                                                        key={n}
                                                        value={String(n)}
                                                    >
                                                        {n} Star{n > 1 && "s"}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            {editReview ? "Update Review" : "Submit Review"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
