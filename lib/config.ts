export const MUSHEE_TREASURY = process.env.NEXT_PUBLIC_MUSHEE_TREASURY_ADDRESS || "0xD39De9c7A852252863F5f9C1FA32E97472230fd4";
export const POLYGON_USDC = "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359" as const;

export const TOOL_PRICING = {
  summarize: { label: "Summarize", price: "0.005" },
  rewrite: { label: "Rewrite", price: "0.01" },
  generate: { label: "Generate", price: "0.015" },
  translate: { label: "Translate", price: "0.01" },
} as const;

export type ToolKey = keyof typeof TOOL_PRICING;
