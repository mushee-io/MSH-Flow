"use client";

import { useMemo, useState } from "react";
import { erc20Abi, formatUnits, parseUnits } from "viem";
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { Sidebar } from "@/components/sidebar";
import { TopStats } from "@/components/top-stats";
import { ToolSelector } from "@/components/tool-selector";
import { ActivityItem, ActivityPanel } from "@/components/activity-panel";
import { ApiCard } from "@/components/api-card";
import { WalletPanel } from "@/components/wallet-panel";
import { MUSHEE_TREASURY, POLYGON_USDC, TOOL_PRICING, ToolKey } from "@/lib/config";

const PROMPTS: Record<ToolKey, string> = {
  summarize: "Summarize the user's input clearly and briefly.",
  rewrite: "Rewrite the user's input to sound more polished and natural.",
  generate: "Generate a useful response based on the user's input.",
  translate: "Translate the user's input into simple, natural English unless they specify a target language.",
};

export default function DashboardPage() {
  const [tool, setTool] = useState<ToolKey>("summarize");
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loadingStep, setLoadingStep] = useState<"idle" | "payment" | "running">("idle");
  const [error, setError] = useState("");
  const [items, setItems] = useState<ActivityItem[]>([]);
  const { address, isConnected } = useAccount();
  const { writeContractAsync, data: hash } = useWriteContract();
  const receipt = useWaitForTransactionReceipt({ hash });

  const usdcBalance = useReadContract({
    address: POLYGON_USDC,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const balanceNum = typeof usdcBalance.data === "bigint" ? Number(formatUnits(usdcBalance.data, 6)) : 0;
  const spentToday = items.reduce((sum, item) => sum + Number(item.amount), 0).toFixed(3);

  const currentPrice = TOOL_PRICING[tool].price;
  const canPay = balanceNum >= Number(currentPrice);

  async function handleRun() {
    setError("");
    setResponse("");

    if (!isConnected || !address) {
      setError("Connect your wallet first.");
      return;
    }
    if (!input.trim()) {
      setError("Enter text before running the action.");
      return;
    }
    if (!canPay) {
      setError(`You need at least ${currentPrice} USDC in your wallet.`);
      return;
    }

    try {
      setLoadingStep("payment");
      const txHash = await writeContractAsync({
        address: POLYGON_USDC,
        abi: erc20Abi,
        functionName: "transfer",
        args: [MUSHEE_TREASURY as `0x${string}`, parseUnits(currentPrice, 6)],
      });

      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool,
          input,
          instruction: PROMPTS[tool],
          txHash,
          amount: currentPrice,
          wallet: address,
        }),
      });

      setLoadingStep("running");
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to run action.");
      }

      setResponse(data.output || "No result returned.");
      const newItem: ActivityItem = {
        id: `${Date.now()}`,
        tool: TOOL_PRICING[tool].label,
        amount: currentPrice,
        txHash,
        status: "Paid then executed",
        time: new Date().toLocaleTimeString(),
      };
      setItems((prev) => [newItem, ...prev].slice(0, 8));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoadingStep("idle");
    }
  }

  const statusText = useMemo(() => {
    if (loadingStep === "payment") return "Waiting for wallet payment...";
    if (loadingStep === "running") return "Running tool after payment...";
    if (receipt.isLoading) return "Waiting for chain confirmation...";
    return "Ready";
  }, [loadingStep, receipt.isLoading]);

  return (
    <div className="min-h-screen bg-[#0b0d12] text-white lg:flex">
      <Sidebar />
      <div className="mx-auto flex w-full max-w-[1600px] flex-1 gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <main className="min-w-0 flex-1 space-y-6 py-4">
          <div>
            <div className="text-sm text-zinc-500">Dashboard</div>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">Run tools. Pay before execution.</h1>
            <p className="mt-2 max-w-3xl text-zinc-400">Direct Polygon USDC transfer to Mushee treasury now. Yellow settlement handoff comes next.</p>
          </div>

          <TopStats balance={balanceNum.toFixed(3)} spent={spentToday} requests={items.length} />

          <section className="rounded-3xl border border-edge bg-panel p-5 shadow-soft">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold">Workspace</div>
                  <div className="text-sm text-zinc-500">Choose a tool, pay, then run it.</div>
                </div>
                <div className="rounded-full border border-edge px-3 py-1 text-xs text-zinc-400">{statusText}</div>
              </div>

              <ToolSelector tool={tool} onChange={setTool} />

              <div className="rounded-3xl border border-edge bg-[#11151d] p-4">
                <div className="mb-3 text-sm text-zinc-500">Input</div>
                <textarea
                  className="min-h-[180px] w-full resize-none rounded-2xl border border-edge bg-[#0f131a] p-4 text-base text-white outline-none placeholder:text-zinc-600"
                  placeholder="Enter your request or text here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-zinc-400">
                    Estimated cost: <span className="text-white">{currentPrice} USDC</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRun}
                    disabled={loadingStep !== "idle"}
                    className="rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-black disabled:opacity-60"
                  >
                    {loadingStep === "idle" ? "Pay and run action →" : "Processing..."}
                  </button>
                </div>
                {error ? <div className="mt-3 text-sm text-rose-300">{error}</div> : null}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-edge bg-panel p-5 shadow-soft">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold">Response</div>
                <div className="text-sm text-zinc-500">Only returned after successful payment + execution.</div>
              </div>
              <button type="button" onClick={() => navigator.clipboard.writeText(response)} className="rounded-xl border border-edge px-3 py-2 text-sm text-zinc-300">Copy</button>
            </div>
            <div className="min-h-[180px] rounded-2xl border border-edge bg-[#11151d] p-4 whitespace-pre-wrap text-zinc-200">
              {response || "No result returned yet."}
            </div>
          </section>
        </main>

        <aside className="hidden w-[360px] shrink-0 space-y-6 py-4 xl:block">
          <WalletPanel />
          <ActivityPanel items={items} />
          <ApiCard />
        </aside>
      </div>
    </div>
  );
}
