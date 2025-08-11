"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useEffect } from "react";

const formSchema = z.object({
    shopName: z.string().min(2, "Shop name is required"),
    reviewText: z.string().min(5, "Review is too short"),
    rating: z.string().min(1, "Rating is required"),
});

type EditReviewValues = z.infer<typeof formSchema>;

export default function EditReviewModal({
    open,
    onCancel,
    onSave,
    initialData,
}: {
    open: boolean;
    onCancel: () => void;
    onSave: (data: EditReviewValues) => void;
    initialData: {
        shopName: string;
        reviewText: string;
        rating: number;
    } | null;
}) {
    const form = useForm<EditReviewValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
            ? {
                  shopName: initialData.shopName,
                  reviewText: initialData.reviewText,
                  rating: String(initialData.rating),
              }
            : { shopName: "", reviewText: "", rating: "" },
    });

    // Reset form when modal opens with new data
    useEffect(() => {
        if (initialData) {
            form.reset({
                shopName: initialData.shopName,
                reviewText: initialData.reviewText,
                rating: String(initialData.rating),
            });
        }
    }, [initialData, form]);

    return (
        <Dialog open={open} onOpenChange={onCancel}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Review</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((data) => {
                            onSave(data);
                            onCancel();
                        })}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="shopName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Shop Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
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
                                        <Textarea {...field} />
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
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select rating" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[1, 2, 3, 4, 5].map((r) => (
                                                <SelectItem
                                                    key={r}
                                                    value={String(r)}
                                                >
                                                    {r} Star{r > 1 ? "s" : ""}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onCancel}
                            >
                                Cancel
                            </Button>
                            <Button type="submit">Save Changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
