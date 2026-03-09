# Mushee Flow

Mushee Flow is a YC-style, glassless pay-per-use dashboard for users and developers.

## What this build includes
- Live landing page
- Product dashboard layout
- Wallet connect with Wagmi
- Polygon USDC balance display
- Payment-before-execution flow
- AI action endpoint powered by Gemini
- Activity rail + API quickstart panel

## Current payment path
This build uses a **direct USDC transfer on Polygon** from the user's wallet to the Mushee treasury **before** the API action runs.

That gives you a working mainnet payment MVP now.

## What still needs to be added later
- Yellow settlement channels / Clearnode integration
- Persisted database for activity history
- Developer API keys and metering
- Better transaction verification on the backend

## Environment variables
Copy `.env.example` to `.env.local`.

```bash
GEMINI_API_KEY=...
GEMINI_MODEL=gemini-2.5-flash
NEXT_PUBLIC_MUSHEE_TREASURY_ADDRESS=0xD39De9c7A852252863F5f9C1FA32E97472230fd4
NEXT_PUBLIC_POLYGON_RPC_URL=https://polygon-rpc.com
```

## Run locally
```bash
npm install
npm run dev
```

## Deploy to Vercel
Add the same env vars in Vercel project settings and deploy.
