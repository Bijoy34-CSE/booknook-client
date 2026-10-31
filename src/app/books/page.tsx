import type { Metadata } from "next";
import BookCard from "@/components/BookCard";
import SectionHeading from "@/components/SectionHeading";
import { getBooks } from "@/lib/books";
import { CATEGORIES } from "@/lib/types";

export const metadata: Metadata = { title: "BookNook | All Books" };

const inputClass =
  "rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white";

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}) {
  const { search, category } = await searchParams;
  const { books, failed } = await getBooks({ search, category });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading
        title="All Books"
        subtitle="Find a book you like and borrow it for a week."
      />

      <form
        action="/books"
        className="mx-auto mb-10 flex max-w-2xl flex-col gap-3 sm:flex-row"
      >
        <input
          name="search"
          defaultValue={search}
          placeholder="Search by title or author"
          className={`${inputClass} flex-1`}
        />
        <select name="category" defaultValue={category ?? ""} className={inputClass}>
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Search
        </button>
      </form>

      {failed ? (
        <p className="rounded-xl bg-red-50 p-6 text-center text-red-600 dark:bg-red-950 dark:text-red-400">
          We could not load the books right now. Please try again in a moment.
        </p>
      ) : books.length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-500 dark:border-gray-700">
          No books found. Try another search or category.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}