import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const faqs = [
  {
    q: "How long can I keep a borrowed book?",
    a: "Every borrow lasts 7 days. The return date is shown in My Borrows.",
  },
  {
    q: "Can I borrow the same book twice at the same time?",
    a: "No. You can hold one copy of a book at a time. Return it first, then you can borrow it again.",
  },
  {
    q: "What does \"Not Available\" mean?",
    a: "All copies of that book are currently borrowed. Check back after another reader returns it.",
  },
  {
    q: "How do I share my own book?",
    a: "Log in, open Add Book, fill in the details with a cover image and the number of copies, and it appears on the shelf right away.",
  },
  {
    q: "Can I edit or remove a book I added?",
    a: "Yes. Open My Books to edit the details or delete a book you added.",
  },
];

export default function Faq() {
  return (
    <section className="bg-gray-50 py-16 dark:bg-gray-900/50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Quick answers before you borrow your first book."
        />
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <details className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-gray-900 dark:text-white [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="text-xl text-indigo-600 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {f.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}