export type Book = {
  _id: string;
  title: string;
  author: string;
  category: "Fiction" | "Science" | "History" | "Kids" | "Others";
  image: string;
  description: string;
  totalCopies: number;
  copies: number;
  addedBy: { name: string; email: string };
  createdAt: string;
};

export type Borrow = {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  userName: string;
  userEmail: string;
  borrowDate: string;
  returnDate: string;
};

export const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"] as const;