import Link from "next/link";
import type { Book } from "@/lib/types";

export default function BookCard({ book }: { book: Book }) {
  const available = book.copies > 0;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div className="relative h-64 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={book.image} alt={book.title} className="h-full w-full object-cover" />
        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
            available ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
          }`}
        >
          {available ? `${book.copies} available` : "Not Available"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="mb-2 w-fit rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          {book.category}
        </span>
        <h3 className="line-clamp-1 text-lg font-semibold text-gray-900 dark:text-white">
          {book.title}
        </h3>
        <p className="mt-1 line-clamp-1 text-sm text-gray-600 dark:text-gray-400">
          by {book.author}
        </p>

        <Link
          href={`/books/${book._id}`}
          className="mt-auto block rounded-lg bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}