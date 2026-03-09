import Link from "next/link";

const nav = ["Dashboard", "Tools", "API", "Activity", "Billing", "Settings"];

export function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-64 border-r border-edge bg-panel/60 p-6 lg:block">
      <div className="text-xl font-semibold">Mushee Flow</div>
      <div className="mt-2 text-sm text-zinc-400">Users + developers</div>
      <nav className="mt-10 space-y-2">
        {nav.map((item, idx) => (
          <Link
            href="/dashboard"
            key={item}
            className={`block rounded-2xl px-4 py-3 text-sm ${idx === 0 ? "bg-[#1a202b] text-white" : "text-zinc-400 hover:bg-[#151922] hover:text-white"}`}
          >
            {item}
          </Link>
        ))}
      </nav>
      <div className="mt-10 rounded-2xl border border-edge bg-[#11151d] p-4 text-sm text-zinc-300">
        <div className="text-xs uppercase tracking-wide text-zinc-500">Mode</div>
        <div className="mt-2">Direct Polygon USDC now</div>
        <div className="mt-2 text-zinc-500">Yellow-ready handoff next</div>
      </div>
    </aside>
  );
}
