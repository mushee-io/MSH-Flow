import Link from "next/link";
import { TOOL_PRICING } from "@/lib/config";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <header className="flex items-center justify-between rounded-3xl border border-edge bg-panel/70 px-5 py-4 shadow-soft">
          <div className="text-lg font-semibold">Mushee Flow</div>
          <div className="flex items-center gap-3 text-sm text-zinc-300">
            <a href="https://x.com/mushee_io" target="_blank">X</a>
            <a href="https://mushee.xyz/" target="_blank">Website</a>
            <Link className="rounded-xl bg-accent px-4 py-2 font-medium text-black" href="/dashboard">Launch App</Link>
          </div>
        </header>

        <section className="grid gap-10 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs text-yellow-200">
              Pay-per-use AI and APIs, powered by Polygon USDC
            </div>
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
              Run tools. Pay per request.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
              Mushee Flow gives users and developers instant access to AI tools and API actions with usage-based pricing. Pay only when you run something.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/dashboard" className="rounded-2xl bg-accent px-5 py-3 font-medium text-black">Open Dashboard</Link>
              <a href="#pricing" className="rounded-2xl border border-edge px-5 py-3 text-zinc-100">View Pricing</a>
            </div>
          </div>

          <div className="rounded-[28px] border border-edge bg-panel p-6 shadow-soft">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="text-sm text-zinc-400">Preview</div>
                <div className="text-2xl font-semibold">Live usage dashboard</div>
              </div>
              <div className="rounded-full border border-edge px-3 py-1 text-xs text-zinc-300">Polygon · USDC</div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-edge bg-[#11151d] p-4">
                <div className="text-xs text-zinc-400">Balance</div>
                <div className="mt-2 text-2xl font-semibold">8.42</div>
                <div className="text-sm text-zinc-400">USDC</div>
              </div>
              <div className="rounded-2xl border border-edge bg-[#11151d] p-4">
                <div className="text-xs text-zinc-400">Spent Today</div>
                <div className="mt-2 text-2xl font-semibold">0.14</div>
                <div className="text-sm text-zinc-400">USDC</div>
              </div>
              <div className="rounded-2xl border border-edge bg-[#11151d] p-4">
                <div className="text-xs text-zinc-400">Requests</div>
                <div className="mt-2 text-2xl font-semibold">12</div>
                <div className="text-sm text-zinc-400">today</div>
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-edge bg-[#11151d] p-4">
              <div className="mb-3 text-sm text-zinc-400">Available tools</div>
              <div className="grid gap-2">
                {Object.entries(TOOL_PRICING).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between rounded-xl border border-edge/70 px-3 py-3 text-sm">
                    <span>{value.label}</span>
                    <span className="text-zinc-300">{value.price} USDC</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="grid gap-4 pb-16 md:grid-cols-4">
          {Object.entries(TOOL_PRICING).map(([key, value]) => (
            <div key={key} className="rounded-3xl border border-edge bg-panel p-5 shadow-soft">
              <div className="text-sm text-zinc-400">{key}</div>
              <div className="mt-2 text-2xl font-semibold">{value.label}</div>
              <div className="mt-4 text-sm text-zinc-300">Charge before execution. Returns result after successful payment confirmation.</div>
              <div className="mt-6 text-xl font-medium text-yellow-200">{value.price} USDC</div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
