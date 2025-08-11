# Online Shop Experience Review App

This is a simple Next.js 15 application that allows users to submit, view, edit, and delete reviews about their online shopping experiences. Reviews are stored locally in the browser using localStorage, so they persist across page reloads without the need for a backend.

## Live URL

👉 [https://online-shop-experience-review-app-six.vercel.app](https://online-shop-experience-review-app-six.vercel.app)

## Features

-   Submit reviews with Shop Name, Review Text, and Rating (1 to 5 stars)

-   Display submitted reviews with visual star ratings and submission date/time

-   Edit existing reviews in a modal window

-   Delete reviews with a confirmation modal and success toast notification

-   Search reviews by shop name (case-insensitive) with debounce for better performance

-   Filter reviews by rating

-   Clear filters with a single button

-   Loading skeleton shown while fetching data from localStorage and during search/filter

-   Responsive and clean UI using Tailwind CSS and shadcn UI components

-   Confirmation and toast notifications powered by Sonner

## Technologies Used

-   Next.js 15 (app directory with client components)

-   React Hook Form + Zod (form handling and validation)

-   Tailwind CSS + shadcn UI (UI components and styling)

-   Sonner (toast notifications)

-   LocalStorage (persistent storage of reviews)

## Setup Instructions

Clone the repository

-   Run `npm install` to install dependencies

-   Run `npm run dev` to start the development server

-   Open `http://localhost:3000` in your browse

## 📁 Folder Structure

```bash
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── DeleteConfirmModal.tsx
│   ├── EditReviewModal.tsx
│   ├── ReviewCard.tsx
│   ├── ReviewForm.tsx
│   ├── ReviewSkeleton.tsx
│   └── SearchFilterBar.tsx
├── hooks/
│   ├── useDebounce.ts
│   └── useLocalStorage.ts
├── types/
│   └── review.type.ts

```

## Time Taken

Approximately 3-4 hours including design, development, testing, and refactoring.

## Future Improvements

-   Add user authentication to associate reviews with user profiles

-   Integrate a backend API for centralized storage and multi-user support

-   Add pagination for large numbers of reviews

-   Enable sorting reviews by date or rating

-   Improve accessibility (ARIA roles, keyboard navigation)

-   Add unit and integration tests for components and hooks

-   Implement better state management for scalability (e.g., Zustand or Redux)

## Author

Made with ❤️ by Meharab Hossan Munna
