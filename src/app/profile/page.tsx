"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";
import { authClient, useSession } from "@/lib/auth-client";

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white";
const readOnlyClass =
  "w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400";
const labelClass = "mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const [saving, setSaving] = useState(false);
  const [imgError, setImgError] = useState(false);

  if (isPending) return <Spinner label="Loading your profile..." />;
  if (!session) return null;

  const user = session.user;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name")).trim();
    const image = String(form.get("image")).trim();

    setSaving(true);
    const { error } = await authClient.updateUser({ name, image });
    setSaving(false);

    if (error) {
      toast.error(error.message || "Could not update your profile.");
      return;
    }
    setImgError(false);
    toast.success("Profile updated.");
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:px-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-indigo-600 bg-indigo-100 text-3xl font-bold text-indigo-700">
            {user.image && !imgError ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt={user.name}
                className="h-full w-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              (user.name?.[0] ?? "U").toUpperCase()
            )}
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        <form key={`${user.name}-${user.image}`} onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>Name</label>
            <input name="name" required defaultValue={user.name} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Photo URL</label>
            <input
              name="image"
              type="url"
              defaultValue={user.image ?? ""}
              placeholder="https://..."
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input readOnly value={user.email} className={readOnlyClass} />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}