export type Review = {
    id: string; // unique id for edit/delete
    shopName: string;
    reviewText: string;
    rating: number; // 1–5
    date: string; // formatted date
};
