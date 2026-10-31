"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));

    setLoading(true);
    const { error } = await signIn.email({ email, password });
    setLoading(false);

    if (error) {
      const msg = error.message || "Invalid email or password.";
      setError(msg);
      toast.error(msg);
      return;
    }
    toast.success("Welcome back to BookNook!");
    router.push(callbackUrl);
    router.refresh();
  };

  const handleGoogle = async () => {
    await signIn.social({ provider: "google", callbackURL: callbackUrl });
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center px-4 py-10">
      <div className="w-full rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">
          Login to BookNook
        </h1>
        <p className="mb-6 text-sm text-gray-500">
          Borrow, add and return books in a few clicks.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input name="email" type="email" required placeholder="you@example.com" className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input name="password" type="password" required placeholder="Your password" className={inputClass} />
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={() => toast("Password reset is coming soon.", { icon: "🔒" })}
              className="text-sm text-indigo-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-gray-400">
          <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
          OR
          <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
        </div>

        <button
          onClick={handleGoogle}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          <span className="font-bold text-blue-600">G</span> Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-gray-500">
          New to BookNook?{" "}
          <Link href="/register" className="font-medium text-indigo-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}