"use client";

import { useRef, useEffect, useState } from "react";
import { timelineEvents, historicalEras } from "@/lib/data/genealogy";

export default function TimelineSection() {
  const [activeEvent, setActiveEvent] = useState<string | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const sortedEvents = [...timelineEvents].sort((a, b) => a.year - b.year);

  return (
    <section id="timeline" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-abyss via-obsidian to-abyss" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl text-pearl mb-3">
            Historical <span className="gold-text">Timeline</span>
          </h2>
          <p className="text-sm text-mist max-w-xl mx-auto">
            Journey through 233+ years of family and world history
          </p>
        </div>

        <div className="mb-12">
          <h3 className="text-xs text-mist uppercase tracking-[0.15em] mb-4 font-mono text-center">
            Historical Eras
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {historicalEras.map((era) => (
              <div
                key={era.id}
                className="px-4 py-2 rounded-lg border border-gold-700/20 bg-gold-500/5"
              >
                <div className="text-xs text-gold-400 font-medium">{era.name}</div>
                <div className="text-[10px] text-mist font-mono">
                  {era.startYear} – {era.endYear}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={timelineRef} className="relative">
          <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold-500/40 via-gold-500/20 to-gold-500/5" />

          <div className="space-y-8">
            {sortedEvents.map((event, i) => {
              const isLeft = i % 2 === 0;
              const isActive = activeEvent === event.id;
              const isPerson = event.type === "person";
              const isHistorical = event.type === "historical";

              return (
                <div
                  key={event.id}
                  className={`relative flex items-start gap-6 ${
                    isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                  } flex-row`}
                >
                  <div className="hidden sm:block sm:w-1/2" />

                  <div className="absolute left-8 sm:left-1/2 -translate-x-1/2 z-10">
                    <div
                      className={`timeline-node ${
                        isPerson ? "animate-pulse-gold" : ""
                      }`}
                      style={{
                        background: isPerson
                          ? "#d4940a"
                          : isHistorical
                          ? "#996600"
                          : "#666666",
                      }}
                    />
                  </div>

                  <div className="ml-16 sm:ml-0 sm:w-1/2">
                    <button
                      onClick={() => setActiveEvent(isActive ? null : event.id)}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "glass-panel-strong gold-glow"
                          : "glass-panel-subtle hover:border-gold-600/30"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono text-gold-400">
                          {event.year} {event.endYear ? `– ${event.endYear}` : ""}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-mono uppercase ${
                            isPerson
                              ? "bg-gold-500/15 text-gold-400 border border-gold-500/25"
                              : isHistorical
                              ? "bg-blue-500/15 text-blue-400 border border-blue-500/25"
                              : "bg-purple-500/15 text-purple-400 border border-purple-500/25"
                          }`}
                        >
                          {event.type}
                        </span>
                        {event.confidence !== undefined && (
                          <span className="text-[10px] font-mono text-mist">
                            {Math.round(event.confidence * 100)}% conf.
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-medium text-pearl mb-1">
                        {event.title}
                      </h4>
                      {(isActive || true) && (
                        <p className="text-xs text-fog leading-relaxed">
                          {event.description}
                        </p>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative flex justify-center mt-12">
            <div className="absolute left-8 sm:left-1/2 -translate-x-1/2">
              <div className="w-4 h-4 rounded-full bg-gold-700/40 border-2 border-gold-600/30" />
            </div>
            <div className="ml-16 sm:ml-0 sm:w-1/2 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-gold-700/30 bg-gold-500/5">
                <div className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
                <span className="text-xs text-gold-400 font-mono">
                  RESEARCH FRONTIER — PRE-1850
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
