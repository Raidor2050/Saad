"use client";

import { frontierCandidates } from "@/lib/data/genealogy";

export default function FrontierSection() {
  return (
    <section id="frontier" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-abyss via-obsidian to-abyss" />
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl text-pearl mb-3">
            Research <span className="gold-text">Frontier</span>
          </h2>
          <p className="text-sm text-mist max-w-xl mx-auto">
            Branches where ancestry may still be discoverable. Where the known trail ends, the investigation continues.
          </p>
        </div>

        <div className="glass-panel p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-orange-400 animate-pulse" />
            <h3 className="text-lg font-medium text-pearl">
              MD Eida Talukder — The Discovery Frontier
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel-subtle p-5">
              <div className="text-xs text-mist uppercase tracking-wider mb-3 font-mono">
                What We Know
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-fog">
                  <span className="text-emerald-400 mt-1">✓</span>
                  MD Eida Talukder — oldest verified direct ancestor
                </li>
                <li className="flex items-start gap-2 text-sm text-fog">
                  <span className="text-emerald-400 mt-1">✓</span>
                  Born approximately 1850-1880
                </li>
                <li className="flex items-start gap-2 text-sm text-fog">
                  <span className="text-emerald-400 mt-1">✓</span>
                  Talukdar title confirms landholder status
                </li>
                <li className="flex items-start gap-2 text-sm text-fog">
                  <span className="text-emerald-400 mt-1">✓</span>
                  Son: MD Ashraf Talukder (Generation 4)
                </li>
                <li className="flex items-start gap-2 text-sm text-fog">
                  <span className="text-emerald-400 mt-1">✓</span>
                  Active in Bengal Presidency, British India
                </li>
              </ul>
            </div>

            <div className="glass-panel-subtle p-5">
              <div className="text-xs text-mist uppercase tracking-wider mb-3 font-mono">
                What We Need
              </div>
              <ul className="space-y-2">
                {frontierCandidates[0]?.sourcesNeeded.map((need, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-fog">
                    <span className="text-orange-400 mt-1">?</span>
                    {need}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 sm:p-8">
          <div className="text-xs text-mist uppercase tracking-wider mb-4 font-mono">
            Research Pipeline
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { step: "Seed Person", icon: "person", active: true },
              { step: "Name Variants", icon: "search", active: true },
              { step: "Search Sources", icon: "database", active: true },
              { step: "Candidate Records", icon: "file", active: true },
              { step: "Entity Resolution", icon: "check", active: true },
              { step: "Evidence Extraction", icon: "extract", active: false },
              { step: "Relationship Detection", icon: "link", active: false },
              { step: "Confidence Scoring", icon: "score", active: false },
              { step: "Research Graph", icon: "graph", active: false },
              { step: "Expand Ancestors", icon: "expand", active: false },
            ].map((item, i) => (
              <div key={item.step} className="flex items-center gap-2">
                <div
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono ${
                    item.active
                      ? "bg-gold-500/15 text-gold-400 border border-gold-500/25"
                      : "bg-white/[0.03] text-mist border border-white/[0.06]"
                  }`}
                >
                  {item.step}
                </div>
                {i < 9 && (
                  <span className="text-gold-700/40 text-xs">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 glass-panel-subtle p-6">
          <div className="text-xs text-mist uppercase tracking-wider mb-4 font-mono">
            Estimated Research Potential
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-white/[0.02] border border-white/[0.06]">
              <div className="text-2xl font-display text-gold-400 mb-1">1800s</div>
              <div className="text-xs text-mist">Land records may reach</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-white/[0.02] border border-white/[0.06]">
              <div className="text-2xl font-display text-gold-400 mb-1">1750s</div>
              <div className="text-xs text-mist">Gazetteers may reach</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-white/[0.02] border border-white/[0.06]">
              <div className="text-2xl font-display text-gold-400 mb-1">1700s</div>
              <div className="text-xs text-mist">Church records may reach</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
