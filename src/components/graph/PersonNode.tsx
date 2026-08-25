"use client";

import { Handle, Position, NodeProps } from "@xyflow/react";
import { Person } from "@/lib/types";

interface PersonNodeData {
  person: Person;
  isSelected: boolean;
  isHighlighted: boolean;
  onSelect: () => void;
  onHover: (hovering: boolean) => void;
}

export default function PersonNode({ data }: NodeProps & { data: PersonNodeData }) {
  const { person, isSelected, isHighlighted, onSelect, onHover } = data;

  const confidenceColor =
    person.confidence >= 0.9
      ? "border-emerald-500/50"
      : person.confidence >= 0.7
      ? "border-amber-500/50"
      : person.confidence >= 0.5
      ? "border-orange-500/50"
      : "border-red-500/50";

  const glowClass = isSelected
    ? "shadow-lg shadow-gold-500/25 border-gold-400/60"
    : isHighlighted
    ? "shadow-md shadow-gold-500/15 border-gold-500/40"
    : `border-gold-700/20 hover:border-gold-600/40`;

  return (
    <div
      className={`relative cursor-pointer transition-all duration-300 ${
        isSelected ? "scale-105" : ""
      }`}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onClick={onSelect}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-gold-500 !border-gold-400 !w-2 !h-2"
      />

      <div
        className={`min-w-[200px] rounded-xl bg-charcoal/90 backdrop-blur-sm border p-4 transition-all duration-300 ${glowClass} ${confidenceColor} border-2`}
      >
        <div className="flex items-center gap-3 mb-2">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
              person.generation === 0
                ? "bg-gradient-to-br from-gold-500 to-gold-600 text-black"
                : person.generation <= 2
                ? "bg-gold-700/40 text-gold-300"
                : "bg-graphite text-mist"
            }`}
          >
            G{person.generation}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-pearl truncate">
              {person.name}
            </div>
            <div className="text-xs text-mist truncate">
              {person.birthYear ? `~${person.birthYear}` : "Date unknown"}
              {person.location ? ` · ${person.location}` : ""}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 font-mono uppercase">
            {person.evidenceLevel}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/20 font-mono uppercase">
            {person.dataSource}
          </span>
        </div>

        <div className="mt-2 h-1 rounded-full bg-graphite overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400"
            style={{ width: `${person.confidence * 100}%` }}
          />
        </div>
        <div className="text-[10px] text-mist mt-1 font-mono text-right">
          {Math.round(person.confidence * 100)}% confidence
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-gold-500 !border-gold-400 !w-2 !h-2"
      />
    </div>
  );
}
