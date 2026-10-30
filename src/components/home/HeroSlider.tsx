"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    title: "Your Next Great Read Is Waiting",
    text: "Explore hundreds of books shared by readers like you and borrow your favourite for a week.",
    gradient: "from-indigo-700 via-indigo-600 to-purple-600",
    emoji: "📖",
  },
  {
    title: "Share a Book, Spark a Story",
    text: "Add your own books to the shelf and let other readers discover them.",
    gradient: "from-emerald-700 via-teal-600 to-cyan-600",
    emoji: "📚",
  },
  {
    title: "Borrow Today, Return Anytime",
    text: "Pick a book, confirm in one click, and return it when you are done.",
    gradient: "from-rose-700 via-pink-600 to-orange-500",
    emoji: "🔖",
  },
];

export default function HeroSlider() {
  return (
    <section className="w-full">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade"
        loop
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        className="h-[480px] w-full sm:h-[540px]"
      >
        {slides.map((s) => (
          <SwiperSlide key={s.title}>
            <div
              className={`flex h-full w-full items-center bg-gradient-to-br ${s.gradient}`}
            >
              <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-6 py-12 md:flex-row md:justify-between lg:px-8">
                <div className="max-w-xl text-center text-white md:text-left">
                  <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                    {s.title}
                  </h2>
                  <p className="mt-4 text-base text-white/90 sm:text-lg">
                    {s.text}
                  </p>
                  <Link
                    href="/books"
                    className="mt-8 inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-indigo-700 shadow transition hover:bg-gray-100"
                  >
                    Browse Books
                  </Link>
                </div>
                <div className="text-[120px] drop-shadow-lg sm:text-[160px]" aria-hidden>
                  {s.emoji}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}