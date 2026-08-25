"use client";

import { useState, useEffect, useRef } from "react";
import { people } from "@/lib/data/genealogy";

export default function AncestralDepthViz() {
  const [revealedGen, setRevealedGen] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isAnimating) {
          setIsAnimating(true);
            let gen = 0;
            const interval = setInterval(() => {
              gen++;
              setRevealedGen(gen);
              if (gen >= 8) {
                clearInterval(interval);
                setTimeout(() => {
                  setRevealedGen(9);
                }, 800);
              }
            }, 500);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isAnimating]);

  const generations = [
    { gen: 0, name: "SaadMan Saif", year: "~2000", era: "Digital Age", color: "from-gold-500 to-gold-400" },
    { gen: 1, name: "AKM Saiful Islam", year: "~1970", era: "Modern Bangladesh", color: "from-gold-600 to-gold-500" },
    { gen: 2, name: "MD Abdul Mazid Talukder", year: "~1940", era: "Late Colonial / Partition", color: "from-gold-600 to-gold-500" },
    { gen: 3, name: "MD Abul Hossain Talukder", year: "~1910", era: "British Raj", color: "from-gold-700 to-gold-600" },
    { gen: 4, name: "MD Ashraf Talukder", year: "~1880", era: "British Raj", color: "from-gold-700 to-gold-600" },
    { gen: 5, name: "MD Eida Talukder", year: "~1850", era: "East India Company", color: "from-gold-800 to-gold-700" },
    { gen: 6, name: "Discovery Frontier", year: "1700s-1800s", era: "Pre-Colonial / Colonial Bengal", color: "from-gold-900 to-gold-800" },
    { gen: 7, name: "Haji Shariatullah Taluqdar", year: "~1781", era: "Mughal / Company Rule", color: "from-blue-700 to-blue-600" },
  ];

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-abyss via-obsidian to-abyss" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-700/30 bg-gold-500/5 mb-6">
            <span className="text-xs text-gold-400 tracking-[0.2em] uppercase font-mono">
              Ancestral Depth Visualization
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-pearl mb-4">
            How Far Back <span className="gold-text">Can We Go?</span>
          </h2>
          <p className="text-sm text-mist max-w-xl mx-auto">
            Watch the family tree extend backward through time
          </p>
        </div>

        <div className="space-y-3">
          {generations.map((gen, i) => {
            const isVisible = i < revealedGen;
            const person = people.find((p) => p.generation === gen.gen);

            return (
              <div
                key={gen.gen}
                className={`transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div
                  className={`glass-panel-subtle p-5 flex items-center gap-6 ${
                    gen.gen === 0 ? "gold-glow border-gold-500/30" : ""
                  } ${gen.gen === 6 ? "border-dashed border-gold-700/30" : ""}`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-mono font-bold bg-gradient-to-br ${gen.color} ${
                      gen.gen === 0 ? "text-black" : gen.gen === 6 ? "text-gold-300" : "text-black"
                    }`}
                  >
                    G{gen.gen}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm font-medium text-pearl">
                        {gen.name}
                      </span>
                      {person?.evidenceLevel && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 font-mono uppercase">
                          {person.evidenceLevel}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-mist">
                      <span className="font-mono">{gen.year}</span>
                      <span>·</span>
                      <span>{gen.era}</span>
                    </div>
                  </div>

                  <div className="hidden sm:block text-right">
                    {person?.confidence !== undefined && (
                      <div className="text-xs font-mono text-gold-400">
                        {Math.round(person.confidence * 100)}% confidence
                      </div>
                    )}
                    {gen.gen === 6 && (
                      <div className="text-xs font-mono text-orange-400 animate-pulse">
                        Research Active
                      </div>
                    )}
                  </div>
                </div>

                {i < generations.length - 1 && (
                  <div className="flex justify-center">
                    <div
                      className={`w-px h-4 transition-all duration-500 ${
                        isVisible ? "bg-gold-500/40" : "bg-transparent"
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {revealedGen > 8 && (
          <div className="mt-12 text-center animate-fade-in-up">
            <div className="glass-panel p-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <div className="text-3xl font-display text-gold-400">6+</div>
                  <div className="text-xs text-mist mt-1">Direct Generations</div>
                </div>
                <div>
                  <div className="text-3xl font-display text-blue-400">245+</div>
                  <div className="text-xs text-mist mt-1">Years of History</div>
                </div>
                <div>
                  <div className="text-3xl font-display text-gold-400">30</div>
                  <div className="text-xs text-mist mt-1">Sources Analyzed</div>
                </div>
                <div>
                  <div className="text-3xl font-display text-purple-400">8</div>
                  <div className="text-xs text-mist mt-1">Related Talukders Found</div>
                </div>
              </div>

              <div className="mt-8 neon-line" />

              <div className="mt-8">
                <p className="text-sm text-fog max-w-2xl mx-auto">
                  The investigation has traced the Talukder lineage back to the mid-19th century
                  through oral tradition, and discovered related Talukder families reaching to the
                  late 1700s through OSINT research. Haji Shariatullah Taluqdar (c.1781), founder
                  of the Faraizi Movement, represents the oldest documented Talukdar from Bengal.
                  The research frontier remains active.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
