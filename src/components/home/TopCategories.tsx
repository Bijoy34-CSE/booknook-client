import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const categories = [
  { name: "Fiction", icon: "🧙", text: "Stories, novels and imagination." },
  { name: "Science", icon: "🔬", text: "Discover how the world works." },
  { name: "History", icon: "🏛️", text: "Learn from the people and events of the past." },
  { name: "Kids", icon: "🧸", text: "Fun reads for young readers." },
  { name: "Others", icon: "✨", text: "Everything else worth reading." },
];

export default function TopCategories() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Top Categories"
          subtitle="Pick a category and jump straight to the books you love."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.08} className="h-full">
              <Link
                href={`/books?category=${c.name}`}
                className="block h-full rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-indigo-600 hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="mb-3 text-4xl">{c.icon}</div>
                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                  {c.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{c.text}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}