import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "BookNook | Page Not Found" };

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
      <div className="text-7xl" aria-hidden>
        📕
      </div>
      <h1 className="mt-4 text-5xl font-bold text-gray-900 dark:text-white">404</h1>
      <p className="mt-3 text-lg font-semibold text-gray-800 dark:text-gray-200">
        This page is not on our shelf
      </p>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        The page you are looking for may have been moved or never existed.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-indigo-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        Back to Home
      </Link>
    </div>
  );
}