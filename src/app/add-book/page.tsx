"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { api } from "@/lib/api";
import { uploadToImgbb } from "@/lib/imgbb";
import { CATEGORIES, type Book } from "@/lib/types";

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white";
const readOnlyClass =
  "w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400";
const labelClass = "mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300";

export default function AddBookPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

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
    setFile(picked);
    setPreview(URL.createObjectURL(picked));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please upload a book image.");
      return;
    }
    const form = new FormData(e.currentTarget);

    setLoading(true);
    try {
      const image = await uploadToImgbb(file);
      await api<Book>("/books", {
        method: "POST",
        body: JSON.stringify({
          title: form.get("title"),
          author: form.get("author"),
          category: form.get("category"),
          description: form.get("description"),
          totalCopies: Number(form.get("totalCopies")),
          image,
        }),
      });
      toast.success("Book added to the shelf!");
      router.push("/my-books");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not add the book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          Add a New Book
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Share a book with other readers. They can borrow it right away.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Book Title</label>
            <input name="title" required placeholder="e.g. The Silent River" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Author Name</label>
            <input name="author" required placeholder="e.g. Amina Rahman" className={inputClass} />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Category</label>
            <select name="category" required defaultValue="" className={inputClass}>
              <option value="" disabled>
                Select a category
              </option>
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
              defaultValue={1}
              required
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Book Image</label>
          <div className="flex items-center gap-4">
            <div className="flex h-28 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-dashed border-gray-300 bg-gray-50 text-xs text-gray-400 dark:border-gray-700 dark:bg-gray-800">
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                "No image"
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-indigo-700 dark:text-gray-300"
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Short Description</label>
          <textarea
            name="description"
            required
            rows={4}
            placeholder="What is this book about?"
            className={inputClass}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Your Name</label>
            <input readOnly value={session?.user.name ?? ""} className={readOnlyClass} />
          </div>
          <div>
            <label className={labelClass}>Your Email</label>
            <input readOnly value={session?.user.email ?? ""} className={readOnlyClass} />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Adding book..." : "Add Book"}
        </button>
      </form>
    </div>
  );
}