import type { Metadata } from "next";

export const metadata: Metadata = { title: "BookNook | My Borrows" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}