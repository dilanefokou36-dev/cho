"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { CarouselSlide } from "@/types/content";
import { cn } from "@/lib/utils/cn";

interface ImageCarouselProps {
  slides: CarouselSlide[];
  intervalMs?: number;
}

export function ImageCarousel({ slides, intervalMs = 5500 }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      setCurrent((index + slides.length) % slides.length);
    },
    [slides.length]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const timer = setInterval(next, intervalMs);
    return () => clearInterval(timer);
  }, [paused, next, intervalMs, slides.length]);

  const slide = slides[current];

  return (
    <section
      className="relative h-[70vh] min-h-[420px] max-h-[720px] w-full overflow-hidden bg-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Diaporama librairies"
    >
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
          aria-hidden={i !== current}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/25" />
        </div>
      ))}

      <div className="relative z-20 flex h-full flex-col justify-center">
        <div className="page-container">
          <div className="max-w-2xl animate-fade-in">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Métier de libraire
            </p>
            <h1 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              {slide.title}
            </h1>
            <p className="mt-4 text-lg text-white/90 sm:text-xl">{slide.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="/metier" className="btn-primary">
                Découvrir le métier
              </a>
              <a href="/galerie" className="btn-outline border-white/30 bg-white/10 text-white hover:border-white hover:bg-white hover:text-heading">
                Voir la galerie
              </a>
            </div>
            <p className="mt-6 text-xs text-white/50">Photo : {slide.credit}</p>
          </div>
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30"
            aria-label="Image précédente"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30"
            aria-label="Image suivante"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goTo(i)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === current ? "w-8 bg-accent" : "w-2 bg-white/50 hover:bg-white/80"
                )}
                aria-label={`Slide ${i + 1}`}
                aria-current={i === current}
              />
            ))}
          </div>

          <div className="absolute bottom-8 right-4 z-30 hidden text-sm text-white/60 sm:block">
            {current + 1} / {slides.length}
          </div>
        </>
      )}
    </section>
  );
}
