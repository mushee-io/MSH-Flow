"use client";

import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";
import { polygon } from "wagmi/chains";
import { MUSHEE_TREASURY, POLYGON_USDC } from "@/lib/config";

function short(addr?: string) {
  if (!addr) return "Not connected";
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export function WalletPanel() {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const onPolygon = chain?.id === polygon.id;

  const nativeBalance = useBalance({
    address,
    chainId: polygon.id,
    query: {
      enabled: !!address && onPolygon,
      refetchInterval: 5000,
    },
  });

  const usdcBalance = useBalance({
    address,
    token: POLYGON_USDC,
    chainId: polygon.id,
    query: {
      enabled: !!address && onPolygon,
      refetchInterval: 5000,
    },
  });

  return (
    <div className="rounded-3xl border border-edge bg-panel p-5 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold">Wallet</div>
          <div className="text-sm text-zinc-500">
            {onPolygon ? "Polygon mainnet" : "Wrong network"}
          </div>
        </div>
        {isConnected ? (
          <button
            onClick={() => disconnect()}
            className="rounded-xl border border-edge px-3 py-2 text-sm text-zinc-300"
          >
            Disconnect
          </button>
        ) : null}
      </div>

      <div className="mt-4 space-y-3 text-sm">
        <div className="rounded-2xl border border-edge bg-[#11151d] p-4">
          <div className="text-zinc-500">Address</div>
          <div className="mt-1 font-medium text-white">{short(address)}</div>
        </div>

        <div className="rounded-2xl border border-edge bg-[#11151d] p-4">
          <div className="text-zinc-500">USDC</div>
          <div className="mt-1 font-medium text-white">
            {usdcBalance.isLoading
              ? "Loading..."
              : usdcBalance.data
              ? Number(usdcBalance.data.formatted).toFixed(3)
              : "0.000"}
          </div>
        </div>

        <div className="rounded-2xl border border-edge bg-[#11151d] p-4">
          <div className="text-zinc-500">POL</div>
          <div className="mt-1 font-medium text-white">
            {nativeBalance.isLoading
              ? "Loading..."
              : nativeBalance.data
              ? Number(nativeBalance.data.formatted).toFixed(4)
              : "0.0000"}
          </div>
        </div>

        <div className="rounded-2xl border border-edge bg-[#11151d] p-4 text-zinc-300">
          <div className="text-zinc-500">Treasury</div>
          <div className="mt-1 break-all text-xs">{MUSHEE_TREASURY}</div>
        </div>

        {!isConnected ? (
          <div className="space-y-2">
            {connectors.map((connector) => (
              <button
                key={connector.uid}
                onClick={() => connect({ connector })}
                className="w-full rounded-2xl bg-accent px-4 py-3 text-sm font-medium text-black disabled:opacity-50"
                disabled={isPending}
              >
                Connect {connector.name}
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-edge bg-[#11151d] p-4 text-sm text-zinc-400">
            {onPolygon
              ? "Connected on Polygon. Keep some POL for gas."
              : "Please switch your wallet to Polygon mainnet."}
          </div>
        )}
      </div>
    </div>
  );
}
