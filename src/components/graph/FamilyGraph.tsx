"use client";

import { useMemo, useCallback, useState, useEffect } from "react";
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { people, relationships } from "@/lib/data/genealogy";
import { useAncestryStore } from "@/stores/useAncestryStore";
import PersonNode from "./PersonNode";

const nodeTypes = { personNode: PersonNode };

export default function FamilyGraph() {
  const { selectedPersonId, setSelectedPerson, highlightedPersonId, setHighlightedPerson } =
    useAncestryStore();
  const [showDetail, setShowDetail] = useState(false);

  const { initialNodes, initialEdges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const genY: Record<number, number> = {};
    const genCounts: Record<number, number> = {};

    people.forEach((person) => {
      const gen = person.generation;
      if (!(gen in genCounts)) {
        genCounts[gen] = 0;
        genY[gen] = gen * 160;
      }
      const count = genCounts[gen];
      const total = people.filter((p) => p.generation === gen).length;
      const xSpacing = 300;
      const x = count * xSpacing - ((total - 1) * xSpacing) / 2;

      const isCandidate = person.dataSource === "discovered" || person.dataSource === "candidate";

      nodes.push({
        id: person.id,
        type: "personNode",
        position: { x, y: genY[gen] },
        data: {
          person,
          isSelected: person.id === selectedPersonId,
          isHighlighted: person.id === highlightedPersonId,
          isCandidate,
          onSelect: () => {
            setSelectedPerson(person.id === selectedPersonId ? null : person.id);
          },
          onHover: (hovering: boolean) => {
            setHighlightedPerson(hovering ? person.id : null);
          },
        },
      });
      genCounts[gen]++;
    });

    relationships.forEach((rel) => {
      const isHighlighted =
        rel.fromPersonId === highlightedPersonId ||
        rel.toPersonId === highlightedPersonId;

      edges.push({
        id: rel.id,
        source: rel.toPersonId,
        target: rel.fromPersonId,
        type: "smoothstep",
        animated: isHighlighted,
        style: {
          stroke: isHighlighted ? "#e6a817" : "#996600",
          strokeWidth: isHighlighted ? 3 : 2,
          opacity: isHighlighted ? 1 : 0.5,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: isHighlighted ? "#e6a817" : "#996600",
          width: 16,
          height: 16,
        },
      });
    });

    return { initialNodes: nodes, initialEdges: edges };
  }, [selectedPersonId, highlightedPersonId]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges]);

  const selectedPerson = people.find((p) => p.id === selectedPersonId);

  return (
    <section id="graph" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl text-pearl mb-3">
            Interactive <span className="gold-text">Family Graph</span>
          </h2>
          <p className="text-sm text-mist max-w-xl mx-auto">
            Explore the direct ancestral line and related Talukder families discovered through OSINT research. Click any person to see details and evidence.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-4 text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/20">
            <div className="w-2 h-2 rounded-full bg-gold-400" />
            <span className="text-gold-400">Direct Ancestry (Verified)</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <span className="text-blue-400">Related Talukders (Discovered)</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <span className="text-purple-400">Historical Context</span>
          </div>
        </div>

        <div className="glass-panel overflow-hidden" style={{ height: "700px" }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.3 }}
            proOptions={{ hideAttribution: true }}
            minZoom={0.3}
            maxZoom={2}
            className="bg-void"
          >
            <Background color="rgba(212, 148, 10, 0.05)" gap={40} />
            <Controls
              className="!bg-charcoal !border-gold-700/30 !rounded-lg"
              showInteractive={false}
            />
            <MiniMap
              nodeColor={() => "#996600"}
              maskColor="rgba(0,0,0,0.7)"
              className="!bg-charcoal !border-gold-700/30"
            />
          </ReactFlow>
        </div>

        {selectedPerson && (
          <div className="mt-6 glass-panel-strong p-6 animate-fade-in-up">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                {selectedPerson.imageUrl ? (
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 border-gold-500/30">
                    <img
                      src={selectedPerson.imageUrl}
                      alt={selectedPerson.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-gold-700/40 to-gold-800/40 flex items-center justify-center border border-gold-700/30 flex-shrink-0">
                    <span className="text-lg font-mono font-bold text-gold-400">
                      {selectedPerson.generation < 0 ? `D${Math.abs(selectedPerson.generation)}` : `G${selectedPerson.generation}`}
                    </span>
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-3 mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-mono ${
                    selectedPerson.generation < 0
                      ? "bg-blue-500/15 text-blue-400 border-blue-500/25"
                      : "bg-gold-500/15 text-gold-400 border-gold-500/25"
                  }`}>
                    {selectedPerson.generation < 0 ? `DISCOVERED D${Math.abs(selectedPerson.generation)}` : `GEN ${selectedPerson.generation}`}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-mono uppercase ${
                    selectedPerson.evidenceLevel === "verified"
                      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
                      : selectedPerson.evidenceLevel === "supported"
                      ? "bg-blue-500/15 text-blue-400 border-blue-500/25"
                      : selectedPerson.evidenceLevel === "probable"
                      ? "bg-purple-500/15 text-purple-400 border-purple-500/25"
                      : "bg-orange-500/15 text-orange-400 border-orange-500/25"
                  }`}>
                    {selectedPerson.evidenceLevel}
                  </span>
                  {selectedPerson.dataSource !== "user-provided" && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/25 font-mono uppercase">
                      {selectedPerson.dataSource}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-2xl text-pearl">{selectedPerson.name}</h3>
                {selectedPerson.nameBengali && (
                  <p className="text-sm text-mist">{selectedPerson.nameBengali}</p>
                )}
                </div>
              </div>
              <button
                onClick={() => setSelectedPerson(null)}
                className="text-mist hover:text-pearl transition-colors p-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              {selectedPerson.birthYear && (
                <div className="text-center p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <div className="text-xs text-mist mb-1">Born (est.)</div>
                  <div className="text-sm text-pearl font-medium">~{selectedPerson.birthYear}</div>
                </div>
              )}
              {selectedPerson.deathYear && (
                <div className="text-center p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <div className="text-xs text-mist mb-1">Died (est.)</div>
                  <div className="text-sm text-pearl font-medium">~{selectedPerson.deathYear}</div>
                </div>
              )}
              {selectedPerson.occupation && (
                <div className="text-center p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <div className="text-xs text-mist mb-1">Occupation</div>
                  <div className="text-sm text-pearl font-medium">{selectedPerson.occupation}</div>
                </div>
              )}
              {selectedPerson.location && (
                <div className="text-center p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <div className="text-xs text-mist mb-1">Location</div>
                  <div className="text-sm text-pearl font-medium">{selectedPerson.location}</div>
                </div>
              )}
              <div className="text-center p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                <div className="text-xs text-mist mb-1">Confidence</div>
                <div className="text-sm text-emerald-400 font-medium font-mono">
                  {Math.round(selectedPerson.confidence * 100)}%
                </div>
              </div>
            </div>

            {selectedPerson.notes && (
              <div className="p-4 rounded-lg bg-gold-500/5 border border-gold-700/20">
                <div className="text-xs text-gold-400 uppercase tracking-wider mb-2 font-mono">
                  Research Notes
                </div>
                <p className="text-sm text-fog leading-relaxed">{selectedPerson.notes}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
