"use client";

import { useState, useEffect, useCallback } from "react";
import { people } from "@/lib/data/genealogy";

const allPeople = [...people].sort((a, b) => {
  const aYear = a.birthYear || 1900;
  const bYear = b.birthYear || 1900;
  return aYear - bYear;
});

export default function Carousel3D() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const total = allPeople.length;

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  useEffect(() => {
    const interval = setInterval(goNext, 4000);
    return () => clearInterval(interval);
  }, [goNext]);

  const selectedPerson = selectedId
    ? allPeople.find((p) => p.id === selectedId)
    : null;

  return (
    <section id="carousel" className="py-20 relative overflow-hidden">
      <div
        className={`absolute inset-0 transition-all duration-700 ${
          selectedId ? "backdrop-blur-xl bg-black/60" : ""
        }`}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl text-pearl mb-3">
            The <span className="gold-text">Talukder Lineage</span>
          </h2>
          <p className="text-sm text-mist max-w-xl mx-auto">
            19 individuals spanning 245+ years. Click any card to explore their story.
          </p>
        </div>

        <div
          className="relative h-[420px] flex items-center justify-center"
          style={{ perspective: "1200px" }}
        >
          {allPeople.map((person, i) => {
            const offset = ((i - activeIndex + total) % total);
            const half = Math.floor(total / 2);
            let normalizedOffset = offset > half ? offset - total : offset;

            const absOff = Math.abs(normalizedOffset);
            if (absOff > 5) return null;

            const rotateY = normalizedOffset * 28;
            const translateZ = -Math.abs(normalizedOffset) * 80;
            const translateX = normalizedOffset * 120;
            const scale = absOff === 0 ? 1.05 : absOff === 1 ? 0.92 : 0.78;
            const opacity = absOff === 0 ? 1 : absOff <= 2 ? 0.6 : 0.25;
            const zIndex = 20 - absOff;

            const isActive = absOff === 0;
            const isSelected = selectedId === person.id;

            const evidenceColor =
              person.evidenceLevel === "verified"
                ? "from-emerald-500 to-emerald-600"
                : person.evidenceLevel === "supported"
                ? "from-blue-500 to-blue-600"
                : person.evidenceLevel === "probable"
                ? "from-purple-500 to-purple-600"
                : "from-orange-500 to-orange-600";

            return (
              <div
                key={person.id}
                className="absolute cursor-pointer"
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  transition: "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
                }}
                onClick={() => {
                  if (isActive) {
                    setSelectedId(isSelected ? null : person.id);
                  } else {
                    setActiveIndex(i);
                  }
                }}
              >
                <div
                  className={`w-[240px] rounded-2xl overflow-hidden border-2 transition-all duration-500 ${
                    isSelected
                      ? "border-gold-400 shadow-2xl shadow-gold-500/30 scale-105"
                      : isActive
                      ? "border-gold-500/40 shadow-lg shadow-gold-500/15"
                      : "border-white/10"
                  }`}
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(20,20,20,0.95) 0%, rgba(10,10,10,0.98) 100%)",
                  }}
                >
                  {person.imageUrl ? (
                    <div className="relative h-[200px] overflow-hidden">
                      <img
                        src={person.imageUrl}
                        alt={person.name}
                        className="w-full h-full object-cover"
                        style={{
                          filter: isActive
                            ? "brightness(1.05) contrast(1.05)"
                            : "brightness(0.8) contrast(0.9)",
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                      <div className="absolute top-3 right-3">
                        <span
                          className={`text-[9px] px-2 py-0.5 rounded-full bg-gradient-to-r ${evidenceColor} text-white font-mono uppercase`}
                        >
                          {person.evidenceLevel}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative h-[200px] flex items-center justify-center bg-gradient-to-br from-charcoal to-graphite">
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-mono font-bold border-2"
                        style={{
                          borderColor:
                            person.generation === 0
                              ? "#d4940a"
                              : person.generation > 0
                              ? "#996600"
                              : "#4a90d9",
                          color:
                            person.generation === 0
                              ? "#d4940a"
                              : person.generation > 0
                              ? "#c9a227"
                              : "#4a90d9",
                          background:
                            person.generation === 0
                              ? "rgba(212,148,10,0.1)"
                              : person.generation > 0
                              ? "rgba(153,102,0,0.1)"
                              : "rgba(74,144,217,0.1)",
                        }}
                      >
                        {person.generation === 0
                          ? "YOU"
                          : person.generation > 0
                          ? `G${person.generation}`
                          : `D${Math.abs(person.generation)}`}
                      </div>
                    </div>
                  )}

                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      {person.birthYear && (
                        <span className="text-[11px] font-mono text-gold-400">
                          b. ~{person.birthYear}
                        </span>
                      )}
                      {person.deathYear && (
                        <span className="text-[11px] font-mono text-mist">
                          d. {person.deathYear}
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-medium text-pearl leading-tight mb-1.5 line-clamp-2">
                      {person.name}
                    </h3>

                    {person.occupation && (
                      <p className="text-[11px] text-gold-400/80 mb-2 line-clamp-1">
                        {person.occupation}
                      </p>
                    )}

                    {person.location && (
                      <p className="text-[10px] text-mist line-clamp-1">
                        {person.location}
                      </p>
                    )}

                    {isActive && (
                      <div className="mt-3 pt-3 border-t border-white/5">
                        <div className="flex items-center gap-1.5">
                          <div className="h-1 flex-1 rounded-full bg-graphite overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400"
                              style={{ width: `${person.confidence * 100}%` }}
                            />
                          </div>
                          <span className="text-[9px] font-mono text-mist">
                            {Math.round(person.confidence * 100)}%
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={goPrev}
            className="w-10 h-10 rounded-full border border-gold-700/30 bg-charcoal/80 flex items-center justify-center text-gold-400 hover:bg-gold-500/10 hover:border-gold-500/40 transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center gap-1.5">
            {allPeople.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "bg-gold-400 w-6"
                    : "bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            className="w-10 h-10 rounded-full border border-gold-700/30 bg-charcoal/80 flex items-center justify-center text-gold-400 hover:bg-gold-500/10 hover:border-gold-500/40 transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {selectedPerson && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 cursor-pointer"
            onClick={() => setSelectedId(null)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
            <div
              className="relative z-10 w-full max-w-lg glass-panel-strong p-6 animate-fade-in-up cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-4 mb-4">
                {selectedPerson.imageUrl ? (
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 border-gold-500/30">
                    <img
                      src={selectedPerson.imageUrl}
                      alt={selectedPerson.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-gold-700/40 to-gold-800/40 flex items-center justify-center border border-gold-700/30">
                    <span className="text-xl font-mono font-bold text-gold-400">
                      {selectedPerson.generation === 0
                        ? "YOU"
                        : selectedPerson.generation > 0
                        ? `G${selectedPerson.generation}`
                        : `D${Math.abs(selectedPerson.generation)}`}
                    </span>
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border font-mono uppercase ${
                        selectedPerson.generation < 0
                          ? "bg-blue-500/15 text-blue-400 border-blue-500/25"
                          : "bg-gold-500/15 text-gold-400 border-gold-500/25"
                      }`}
                    >
                      {selectedPerson.generation < 0
                        ? "DISCOVERED"
                        : selectedPerson.generation === 0
                        ? "SUBJECT"
                        : `GEN ${selectedPerson.generation}`}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border font-mono uppercase ${
                        selectedPerson.evidenceLevel === "verified"
                          ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
                          : selectedPerson.evidenceLevel === "supported"
                          ? "bg-blue-500/15 text-blue-400 border-blue-500/25"
                          : "bg-purple-500/15 text-purple-400 border-purple-500/25"
                      }`}
                    >
                      {selectedPerson.evidenceLevel}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl text-pearl">
                    {selectedPerson.name}
                  </h3>
                  {selectedPerson.nameBengali && (
                    <p className="text-sm text-mist">{selectedPerson.nameBengali}</p>
                  )}
                </div>
                <button
                  onClick={() => setSelectedId(null)}
                  className="text-mist hover:text-pearl transition-colors p-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                {selectedPerson.birthYear && (
                  <div className="text-center p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-[10px] text-mist mb-1">Born</div>
                    <div className="text-sm text-pearl font-medium">~{selectedPerson.birthYear}</div>
                  </div>
                )}
                {selectedPerson.deathYear && (
                  <div className="text-center p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-[10px] text-mist mb-1">Died</div>
                    <div className="text-sm text-pearl font-medium">{selectedPerson.deathYear}</div>
                  </div>
                )}
                {selectedPerson.occupation && (
                  <div className="text-center p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-[10px] text-mist mb-1">Occupation</div>
                    <div className="text-sm text-pearl font-medium">{selectedPerson.occupation}</div>
                  </div>
                )}
                {selectedPerson.location && (
                  <div className="text-center p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-[10px] text-mist mb-1">Location</div>
                    <div className="text-sm text-pearl font-medium">{selectedPerson.location}</div>
                  </div>
                )}
                <div className="text-center p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <div className="text-[10px] text-mist mb-1">Confidence</div>
                  <div className="text-sm text-emerald-400 font-medium font-mono">
                    {Math.round(selectedPerson.confidence * 100)}%
                  </div>
                </div>
              </div>

              {selectedPerson.notes && (
                <div className="p-4 rounded-lg bg-gold-500/5 border border-gold-700/20">
                  <div className="text-[10px] text-gold-400 uppercase tracking-wider mb-2 font-mono">
                    Research Notes
                  </div>
                  <p className="text-sm text-fog leading-relaxed">
                    {selectedPerson.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
