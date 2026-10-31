"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Modal from "@/components/Modal";
import Spinner from "@/components/Spinner";
import { useSession } from "@/lib/auth-client";
import { api } from "@/lib/api";
import type { Book } from "@/lib/types";

const readOnlyClass =
  "w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-500 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-400";
const labelClass = "mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300";

const formatDate = (d: Date | string) =>
  new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function BookDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: session } = useSession();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [borrowing, setBorrowing] = useState(false);

  const loadBook = useCallback(async () => {
    try {
      setBook(await api<Book>(`/books/${id}`));
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load this book.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadBook();
  }, [loadBook]);

  const handleBorrow = async () => {
    setBorrowing(true);
    try {
      await api("/borrows", { method: "POST", body: JSON.stringify({ bookId: id }) });
      toast.success("Book borrowed! Enjoy reading.");
      setModalOpen(false);
      router.push("/my-borrows");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not borrow the book.");
      setModalOpen(false);
      loadBook(); // refresh copies
    } finally {
      setBorrowing(false);
    }
  };

  if (loading) return <Spinner label="Loading book details..." />;

  if (error || !book) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <p className="mb-6 rounded-xl bg-red-50 p-6 text-red-600 dark:bg-red-950 dark:text-red-400">
          {error || "Book not found."}
        </p>
        <Link
          href="/books"
          className="inline-block rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Back to All Books
        </Link>
      </div>
    );
  }

  const available = book.copies > 0;
  const returnBy = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/books" className="mb-6 inline-block text-sm text-indigo-600 hover:underline">
        ← Back to All Books
      </Link>

      <div className="grid gap-8 overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:grid-cols-2 md:p-8">
        <div className="h-96 w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={book.image} alt={book.title} className="h-full w-full object-cover" />
        </div>

        <div className="flex flex-col">
          <span className="mb-3 w-fit rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
            {book.category}
          </span>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{book.title}</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">by {book.author}</p>

          <p className="mt-5 text-gray-700 dark:text-gray-300">{book.description}</p>

          <dl className="mt-6 space-y-2 text-sm">
            <div className="flex gap-2">
              <dt className="w-28 text-gray-500">Added by</dt>
              <dd className="font-medium text-gray-900 dark:text-white">
                {book.addedBy.name} ({book.addedBy.email})
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-28 text-gray-500">Added on</dt>
              <dd className="font-medium text-gray-900 dark:text-white">
                {formatDate(book.createdAt)}
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-28 text-gray-500">Availability</dt>
              <dd
                className={`font-medium ${available ? "text-emerald-600" : "text-red-600"}`}
              >
                {available
                  ? `${book.copies} of ${book.totalCopies} copies available`
                  : "Not Available"}
              </dd>
            </div>
          </dl>

          <button
            onClick={() => setModalOpen(true)}
            disabled={!available}
            className="mt-auto rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {available ? "Borrow This Book" : "Not Available"}
          </button>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Borrow This Book">
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          You are borrowing <strong>{book.title}</strong>. Please return it by{" "}
          <strong>{formatDate(returnBy)}</strong>.
        </p>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Your Name</label>
            <input readOnly value={session?.user.name ?? ""} className={readOnlyClass} />
          </div>
          <div>
            <label className={labelClass}>Your Email</label>
            <input readOnly value={session?.user.email ?? ""} className={readOnlyClass} />
          </div>
          <button
            onClick={handleBorrow}
            disabled={borrowing}
            className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {borrowing ? "Borrowing..." : "Confirm Borrow"}
          </button>
        </div>
      </Modal>
    </div>
  );
}