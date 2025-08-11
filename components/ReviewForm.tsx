"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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

const formSchema = z.object({
    shopName: z.string().min(2, "Shop name is required"),
    reviewText: z.string().min(5, "Review is too short"),
    rating: z.string().min(1, "Rating is required"),
});

type ReviewFormValues = z.infer<typeof formSchema>;

export default function ReviewForm({
    onSubmit,
}: {
    onSubmit: (data: ReviewFormValues) => void;
}) {
    const form = useForm<ReviewFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { shopName: "", reviewText: "", rating: "" },
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 bg-white p-4 rounded-lg shadow"
            >
                <FormField
                    control={form.control}
                    name="shopName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Shop Name</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. Amazon" {...field} />
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
                                    placeholder="Write your experience..."
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
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select rating" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[1, 2, 3, 4, 5].map((r) => (
                                        <SelectItem key={r} value={String(r)}>
                                            {r} Star{r > 1 ? "s" : ""}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">
                    Submit
                </Button>
            </form>
        </Form>
    );
}
