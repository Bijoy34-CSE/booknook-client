"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import Modal from "@/components/Modal";
import SectionHeading from "@/components/SectionHeading";
import Spinner from "@/components/Spinner";
import { api } from "@/lib/api";
import { uploadToImgbb } from "@/lib/imgbb";
import { CATEGORIES, type Book } from "@/lib/types";

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white";
const labelClass = "mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300";

export default function MyBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editing, setEditing] = useState<Book | null>(null);
  const [newFile, setNewFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const [deleting, setDeleting] = useState<Book | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  useEffect(() => {
    api<Book[]>("/books?mine=true")
      .then(setBooks)
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Could not load your books.")
      )
      .finally(() => setLoading(false));
  }, []);

  const openEdit = (book: Book) => {
    setNewFile(null);
    setEditing(book);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    if (!picked) return;
    if (!picked.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      return;
    }
    if (picked.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5 MB.");
      return;
    }
    setNewFile(picked);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editing) return;
    const form = new FormData(e.currentTarget);

    setSaving(true);
    try {
      const image = newFile ? await uploadToImgbb(newFile) : editing.image;
      const updated = await api<Book>(`/books/${editing._id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: form.get("title"),
          author: form.get("author"),
          category: form.get("category"),
          description: form.get("description"),
          totalCopies: Number(form.get("totalCopies")),
          image,
        }),
      });
      setBooks((list) => list.map((b) => (b._id === updated._id ? updated : b)));
      toast.success("Book updated successfully.");
      setEditing(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update the book.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setDeleteBusy(true);
    try {
      await api(`/books/${deleting._id}`, { method: "DELETE" });
      setBooks((list) => list.filter((b) => b._id !== deleting._id));
      toast.success(`"${deleting.title}" deleted.`);
      setDeleting(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete the book.");
    } finally {
      setDeleteBusy(false);
    }
  };

  if (loading) return <Spinner label="Loading your books..." />;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading
        title="My Books"
        subtitle="Books you added. Edit the details or remove a book from the shelf."
      />

      {error ? (
        <p className="rounded-xl bg-red-50 p-6 text-center text-red-600 dark:bg-red-950 dark:text-red-400">
          {error}
        </p>
      ) : books.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center dark:border-gray-700">
          <p className="mb-4 text-gray-500">You have not added any books yet.</p>
          <Link
            href="/add-book"
            className="inline-block rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Add Your First Book
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500 dark:border-gray-800 dark:bg-gray-800/50">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Copies</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {books.map((b) => (
                <tr key={b._id}>
                  <td className="px-4 py-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={b.image} alt={b.title} className="h-20 w-14 rounded-md object-cover" />
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/books/${b._id}`}
                      className="font-medium text-gray-900 hover:text-indigo-600 dark:text-white"
                    >
                      {b.title}
                    </Link>
                    <p className="text-xs text-gray-500">by {b.author}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{b.category}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {b.copies} / {b.totalCopies}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(b)}
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleting(b)}
                        className="rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit modal */}
      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title="Edit Book"
        maxWidth="max-w-xl"
      >
        {editing && (
          <form key={editing._id} onSubmit={handleSave} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Book Title</label>
                <input name="title" required defaultValue={editing.title} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Author Name</label>
                <input name="author" required defaultValue={editing.author} className={inputClass} />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Category</label>
                <select name="category" required defaultValue={editing.category} className={inputClass}>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Total Copies</label>
                <input
                  name="totalCopies"
                  type="number"
                  min={1}
                  max={1000}
                  required
                  defaultValue={editing.totalCopies}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Book Image</label>
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={newFile ? URL.createObjectURL(newFile) : editing.image}
                  alt="Book"
                  className="h-24 w-16 shrink-0 rounded-md object-cover"
                />
                <div className="text-sm">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFile}
                    className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-indigo-700 dark:text-gray-300"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Leave empty to keep the current image.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <label className={labelClass}>Short Description</label>
              <textarea
                name="description"
                required
                rows={4}
                defaultValue={editing.description}
                className={inputClass}
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="flex-1 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Delete confirm modal */}
      <Modal open={!!deleting} onClose={() => setDeleting(null)} title="Delete this book?">
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          <strong>{deleting?.title}</strong> will be removed from the shelf, along with any
          borrow records for it. This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setDeleting(null)}
            className="flex-1 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Keep Book
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteBusy}
            className="flex-1 rounded-lg bg-red-600 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
          >
            {deleteBusy ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      </Modal>
    </div>
  );
}