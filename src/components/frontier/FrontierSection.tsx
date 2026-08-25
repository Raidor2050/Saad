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
            Branches where ancestry may still be discoverable. OSINT agents have uncovered related Talukder families and historical records.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="glass-panel p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-orange-400 animate-pulse" />
              <h3 className="text-lg font-medium text-pearl">
                MD Eida Talukder — Discovery Frontier
              </h3>
            </div>

            <div className="glass-panel-subtle p-4 mb-4">
              <div className="text-xs text-mist uppercase tracking-wider mb-2 font-mono">
                What We Know
              </div>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2 text-sm text-fog">
                  <span className="text-emerald-400 mt-1">\u2713</span>
                  MD Eida Talukder — oldest verified direct ancestor
                </li>
                <li className="flex items-start gap-2 text-sm text-fog">
                  <span className="text-emerald-400 mt-1">\u2713</span>
                  Born approximately 1850-1880
                </li>
                <li className="flex items-start gap-2 text-sm text-fog">
                  <span className="text-emerald-400 mt-1">\u2713</span>
                  Talukdar title confirms landholder status
                </li>
                <li className="flex items-start gap-2 text-sm text-fog">
                  <span className="text-emerald-400 mt-1">\u2713</span>
                  Active in Bengal Presidency, British India
                </li>
              </ul>
            </div>

            <div className="glass-panel-subtle p-4">
              <div className="text-xs text-mist uppercase tracking-wider mb-2 font-mono">
                What We Need
              </div>
              <ul className="space-y-1.5">
                {frontierCandidates[0]?.sourcesNeeded.map((need, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-fog">
                    <span className="text-orange-400 mt-1">?</span>
                    {need}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="glass-panel p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-blue-400" />
              <h3 className="text-lg font-medium text-pearl">
                Related Talukder Families
              </h3>
            </div>

            <div className="glass-panel-subtle p-4 mb-4">
              <div className="text-xs text-mist uppercase tracking-wider mb-2 font-mono">
                OSINT Discoveries
              </div>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2 text-sm text-fog">
                  <span className="text-blue-400 mt-1">\u2022</span>
                  Haji Shariatullah Taluqdar (c.1781-1840) — Faraizi Movement founder, Faridpur
                </li>
                <li className="flex items-start gap-2 text-sm text-fog">
                  <span className="text-blue-400 mt-1">\u2022</span>
                  Dudu Miyan (1819-1862) — Son, continued Faraizi Movement
                </li>
                <li className="flex items-start gap-2 text-sm text-fog">
                  <span className="text-blue-400 mt-1">\u2022</span>
                  Abdullah al Mahmood (1900-1975) — Minister, Mymensingh
                </li>
                <li className="flex items-start gap-2 text-sm text-fog">
                  <span className="text-blue-400 mt-1">\u2022</span>
                  Iqbal Hassan Mahmood (b.1950) — Current Minister, Mymensingh
                </li>
                <li className="flex items-start gap-2 text-sm text-fog">
                  <span className="text-blue-400 mt-1">\u2022</span>
                  Abdur Rouf Talukder — Bangladesh Bank Governor
                </li>
                <li className="flex items-start gap-2 text-sm text-fog">
                  <span className="text-blue-400 mt-1">\u2022</span>
                  Rashid Talukder (1939-2011) — Photojournalist
                </li>
              </ul>
            </div>

            <div className="glass-panel-subtle p-4">
              <div className="text-xs text-mist uppercase tracking-wider mb-2 font-mono">
                Database Findings
              </div>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2 text-sm text-fog">
                  <span className="text-purple-400 mt-1">\u2022</span>
                  FamilySearch: 21,086 Talukder records globally
                </li>
                <li className="flex items-start gap-2 text-sm text-fog">
                  <span className="text-purple-400 mt-1">\u2022</span>
                  Geni.com: 182 Talukder family profiles
                </li>
                <li className="flex items-start gap-2 text-sm text-fog">
                  <span className="text-purple-400 mt-1">\u2022</span>
                  LocateFamily: 2,593 Talukder people found
                </li>
                <li className="flex items-start gap-2 text-sm text-fog">
                  <span className="text-purple-400 mt-1">\u2022</span>
                  Ancestry.com: 735+ Talukder records
                </li>
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
              { step: "OSINT Research", icon: "osint", active: true },
              { step: "Evidence Extraction", icon: "extract", active: true },
              { step: "Relationship Detection", icon: "link", active: false },
              { step: "Confidence Scoring", icon: "score", active: false },
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
                  <span className="text-gold-700/40 text-xs">\u2192</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass-panel-subtle p-5 text-center">
            <div className="text-2xl font-display text-gold-400 mb-1">1800s</div>
            <div className="text-xs text-mist">Land records may reach</div>
          </div>
          <div className="glass-panel-subtle p-5 text-center">
            <div className="text-2xl font-display text-blue-400 mb-1">1781</div>
            <div className="text-xs text-mist">Oldest documented Talukdar (Haji Shariatullah)</div>
          </div>
          <div className="glass-panel-subtle p-5 text-center">
            <div className="text-2xl font-display text-purple-400 mb-1">21,086</div>
            <div className="text-xs text-mist">Talukder records on FamilySearch</div>
          </div>
        </div>
      </div>
    </section>
  );
}
