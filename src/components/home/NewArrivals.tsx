import Link from "next/link";
import BookCard from "@/components/BookCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { getBooks } from "@/lib/books";

export default async function NewArrivals() {
  const { books } = await getBooks({ limit: "6" });

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="New Arrivals"
          subtitle="The latest books added to the shelf by our readers."
        />

        {books.length === 0 ? (
          <p className="rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-500 dark:border-gray-700">
            No books yet. Be the first to add one!
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book, i) => (
              <Reveal key={book._id} delay={(i % 3) * 0.1} className="h-full">
                <BookCard book={book} />
              </Reveal>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/books"
            className="inline-block rounded-lg bg-indigo-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            See All Books
          </Link>
        </div>
      </div>
    </section>
  );
}