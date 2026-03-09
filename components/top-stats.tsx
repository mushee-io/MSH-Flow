export function TopStats({ balance, spent, requests }: { balance: string; spent: string; requests: number }) {
  const items = [
    { label: "Balance", value: balance, sub: "USDC" },
    { label: "Spent Today", value: spent, sub: "USDC" },
    { label: "Requests", value: String(requests), sub: "today" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className="rounded-3xl border border-edge bg-panel p-5 shadow-soft">
          <div className="text-sm text-zinc-400">{item.label}</div>
          <div className="mt-3 text-3xl font-semibold">{item.value}</div>
          <div className="mt-1 text-sm text-zinc-500">{item.sub}</div>
        </div>
      ))}
    </div>
  );
}
