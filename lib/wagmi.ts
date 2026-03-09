import { createConfig, http } from "wagmi";
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
    [polygon.id]: http("https://polygon.llamarpc.com"),
  },
  ssr: false,
});
