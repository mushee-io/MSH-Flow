import { createConfig, fallback, http } from "wagmi";
import { injected, metaMask, coinbaseWallet } from "wagmi/connectors";
import { polygon } from "wagmi/chains";

export const wagmiConfig = createConfig({
  chains: [polygon],
  connectors: [
    injected(),
    metaMask(),
    coinbaseWallet({ appName: "Mushee Flow" }),
  ],
  transports: {
    [polygon.id]: fallback([
      http("https://polygon-rpc.com"),
      http("https://polygon-bor-rpc.publicnode.com"),
      http("https://1rpc.io/matic"),
    ]),
  },
  ssr: false,
});
