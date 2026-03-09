export type ActivityItem = {
  id: string;
  tool: string;
  amount: string;
  txHash?: string;
  status: string;
  time: string;
};

export function ActivityPanel({ items }: { items: ActivityItem[] }) {
  return (
    <div className="rounded-3xl border border-edge bg-panel p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">Recent activity</div>
          <div className="text-sm text-zinc-500">Latest wallet actions</div>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-edge p-4 text-sm text-zinc-500">No actions yet.</div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-edge bg-[#11151d] p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-white">{item.tool}</span>
                <span className="text-zinc-400">{item.amount} USDC</span>
              </div>
              <div className="mt-2 text-xs text-zinc-500">{item.status} · {item.time}</div>
              {item.txHash ? (
                <div className="mt-2 truncate text-xs text-zinc-400">Tx: {item.txHash}</div>
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
