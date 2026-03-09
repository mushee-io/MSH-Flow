import { TOOL_PRICING, ToolKey } from "@/lib/config";

export function ToolSelector({ tool, onChange }: { tool: ToolKey; onChange: (tool: ToolKey) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {(Object.keys(TOOL_PRICING) as ToolKey[]).map((item) => {
        const active = item === tool;
        return (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className={`rounded-2xl px-4 py-2 text-sm transition ${active ? "bg-accent text-black" : "border border-edge bg-panel text-zinc-300 hover:bg-[#1a202b]"}`}
          >
            {TOOL_PRICING[item].label}
          </button>
        );
      })}
    </div>
  );
}
