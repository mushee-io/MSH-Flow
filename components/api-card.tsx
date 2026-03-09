export function ApiCard() {
  return (
    <div className="rounded-3xl border border-edge bg-panel p-5 shadow-soft">
      <div className="text-lg font-semibold">API quickstart</div>
      <div className="mt-2 text-sm text-zinc-500">Built for developers too.</div>
      <div className="mt-4 rounded-2xl border border-edge bg-[#11151d] p-4 text-sm text-zinc-300">
        <div className="mb-3 text-zinc-500">POST /api/run</div>
        <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-6 text-zinc-200">{`{
  "tool": "summarize",
  "input": "Explain blockchain in simple terms"
}`}</pre>
      </div>
    </div>
  );
}
