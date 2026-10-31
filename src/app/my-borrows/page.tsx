"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import SectionHeading from "@/components/SectionHeading";
import Spinner from "@/components/Spinner";
import { api } from "@/lib/api";
import type { Borrow } from "@/lib/types";

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function MyBorrowsPage() {
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [returningId, setReturningId] = useState("");

  useEffect(() => {
    api<Borrow[]>("/borrows")
      .then(setBorrows)
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Could not load your borrows.")
      )
      .finally(() => setLoading(false));
  }, []);

  const handleReturn = async (borrow: Borrow) => {
    setReturningId(borrow._id);
    try {
      await api(`/borrows/${borrow._id}`, { method: "DELETE" });
      setBorrows((list) => list.filter((b) => b._id !== borrow._id));
      toast.success(`"${borrow.bookTitle}" returned. Thank you!`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not return the book.");
    } finally {
      setReturningId("");
    }
  };

  if (loading) return <Spinner label="Loading your borrows..." />;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading
        title="My Borrows"
        subtitle="Books you have borrowed. Return them when you are done."
      />

      {error ? (
        <p className="rounded-xl bg-red-50 p-6 text-center text-red-600 dark:bg-red-950 dark:text-red-400">
          {error}
        </p>
      ) : borrows.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center dark:border-gray-700">
          <p className="mb-4 text-gray-500">You have not borrowed any books yet.</p>
          <Link
            href="/books"
            className="inline-block rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500 dark:border-gray-800 dark:bg-gray-800/50">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Borrow Date</th>
                <th className="px-4 py-3">Return Date</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {borrows.map((b) => {
                const overdue = new Date(b.returnDate).getTime() < Date.now();
                return (
                  <tr key={b._id}>
                    <td className="px-4 py-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={b.bookImage}
                        alt={b.bookTitle}
                        className="h-20 w-14 rounded-md object-cover"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                      <Link href={`/books/${b.bookId}`} className="hover:text-indigo-600">
                        {b.bookTitle}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {formatDate(b.borrowDate)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          overdue ? "font-medium text-red-600" : "text-gray-600 dark:text-gray-400"
                        }
                      >
                        {formatDate(b.returnDate)}
                      </span>
                      {overdue && (
                        <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
                          Overdue
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleReturn(b)}
                        disabled={returningId === b._id}
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
                      >
                        {returningId === b._id ? "Returning..." : "Return Book"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}