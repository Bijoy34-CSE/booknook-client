import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const stats = [
  { value: "7 Days", label: "Borrowing period", note: "Plenty of time to finish a good read." },
  { value: "5", label: "Book categories", note: "Fiction, Science, History, Kids and more." },
  { value: "1 Click", label: "To borrow a book", note: "Confirm once and it is on your shelf." },
  { value: "Free", label: "For every reader", note: "No fees, no library card needed." },
];

export default function LibraryStats() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="BookNook at a Glance"
          subtitle="A small library built around simple rules for readers."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="h-full">
              <div className="h-full rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 p-6 text-center text-white shadow-sm">
                <p className="text-4xl font-bold">{s.value}</p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-indigo-100">
                  {s.label}
                </p>
                <p className="mt-3 text-sm text-indigo-100/90">{s.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}