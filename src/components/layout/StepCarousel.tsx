"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface Step {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  points: string[];
}

interface StepCarouselProps {
  steps: Step[];
}

export function StepCarousel({ steps }: StepCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goTo = useCallback(
    (index: number) => {
      setCurrent(index < 0 ? steps.length - 1 : index >= steps.length ? 0 : index);
    },
    [steps.length]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (isPaused || steps.length <= 1) return;
    timerRef.current = setInterval(next, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, next, steps.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 60) {
      if (diff > 0) next();
      else prev();
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const step = steps[current];

  return (
    <section
      className="relative min-h-[80vh] overflow-hidden sm:min-h-screen"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {steps.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-all duration-700 ease-in-out"
          style={{
            opacity: i === current ? 1 : 0,
            zIndex: i === current ? 10 : 0,
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${s.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>
      ))}

      {/* Progress bar */}
      <div className="absolute left-0 right-0 top-0 z-30 flex gap-1 px-4 pt-4">
        {steps.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{
              background: i <= current ? "#ff6944" : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 z-30 hidden -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:block"
        aria-label="Étape précédente"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-30 hidden -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:block"
        aria-label="Étape suivante"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Step indicator */}
      <div className="absolute right-6 top-6 z-30 hidden rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm sm:block">
        Étape {current + 1} <span className="text-white/50">/ {steps.length}</span>
      </div>

      {/* Pause indicator */}
      {isPaused && (
        <div className="absolute left-6 top-6 z-30 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/70 backdrop-blur-sm">
          En pause
        </div>
      )}

      {/* Content overlay */}
      <div className="absolute inset-0 z-20 flex items-end sm:items-center">
        <div className="w-full px-4 pb-16 sm:px-8 sm:pb-20 lg:px-16">
          <div className="mx-auto max-w-4xl">
            <span className="mb-3 inline-block rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg">
              Étape {step.id} — {step.subtitle}
            </span>

            <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {step.title}
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              {step.description}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {step.points.map((point) => (
                <div key={point} className="flex items-start gap-3 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                  <span className="mt-1 block h-2 w-2 shrink-0 rounded-full bg-accent" />
                  <span className="text-sm leading-relaxed text-white/90">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom dots */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-2 sm:hidden">
        {steps.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-accent" : "w-2.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
