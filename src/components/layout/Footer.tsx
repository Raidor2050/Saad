"use client";

export default function Footer() {
  return (
    <footer className="py-16 relative border-t border-gold-700/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center font-display text-black font-bold text-lg">
                SA
              </div>
              <div>
                <div className="font-accent text-gold-400 text-sm tracking-[0.2em]">
                  SAADMAN SAIF
                </div>
                <div className="text-[10px] text-mist tracking-[0.15em] uppercase">
                  Deep Ancestry
                </div>
              </div>
            </div>
            <p className="text-xs text-fog leading-relaxed">
              A deep ancestry investigation into the Talukder family lineage.
              Using genealogy databases, archival records, and historical research
              to trace ancestry as far back as evidence allows.
            </p>
          </div>

          <div>
            <h4 className="text-xs text-mist uppercase tracking-[0.15em] mb-4 font-mono">
              Research Sources
            </h4>
            <ul className="space-y-2">
              {[
                "FamilySearch.org",
                "Ancestry.com",
                "Internet Archive",
                "British Library IOR",
                "Bangladesh National Archives",
                "FIBIS Database",
                "Banglapedia",
                "HathiTrust / SAOA",
              ].map((source) => (
                <li key={source} className="text-xs text-fog">
                  {source}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs text-mist uppercase tracking-[0.15em] mb-4 font-mono">
              Methodology
            </h4>
            <ul className="space-y-2">
              {[
                "Evidence-based genealogy",
                "Multi-signal confidence scoring",
                "Bengali name normalization",
                "Strict fact/inference separation",
                "Source provenance tracking",
                "Entity resolution",
                "Patronymic chain verification",
              ].map((item) => (
                <li key={item} className="text-xs text-fog">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="neon-line mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-mist">
            © 2026 SaadMan Saif Ancestry Research. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-mist font-mono">
              BUILT WITH NEXT.JS + REACT FLOW + REMOTION
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
