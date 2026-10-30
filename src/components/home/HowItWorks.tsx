import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const steps = [
  {
    icon: "🔍",
    title: "Find a Book",
    text: "Browse the shelf and open any book to see its details and available copies.",
  },
  {
    icon: "🤝",
    title: "Borrow It",
    text: "Confirm the borrow in one click. The book is yours for 7 days.",
  },
  {
    icon: "📖",
    title: "Enjoy Reading",
    text: "Find all your borrowed books and their return dates in My Borrows.",
  },
  {
    icon: "↩️",
    title: "Return It",
    text: "Done reading? Return the book so the next reader can enjoy it.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gray-50 py-16 dark:bg-gray-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="How Borrowing Works"
          subtitle="Four simple steps from finding a book to returning it."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1} className="h-full">
              <div className="h-full rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-2xl dark:bg-indigo-950">
                  {s.icon}
                </div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-indigo-600">
                  Step {i + 1}
                </p>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {s.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}