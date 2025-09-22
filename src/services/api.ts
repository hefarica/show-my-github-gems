const BASE = "/cf";

export async function getConfig() {
  const res = await fetch(`${BASE}/config`);
  return res.json();
}

export async function saveConfig(config: any) {
  const res = await fetch(`${BASE}/config`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(config),
  });
  return res.json();
}

export async function getFundingProviders(chain: string) {
  const res = await fetch(`${BASE}/funding/providers?chain=${chain}`);
  return res.json();
}

export async function getTopLiquidity(params: {
  chain: string;
  bps: number;
  size_usd: number;
  limit?: number;
}) {
  const q = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE}/pairs/top-liquidity?${q}`);
  return res.json();
}

export async function searchPairs(params: {
  chain: string;
  risk_max?: number;
  ev_min?: number;
  roi_min_bps?: number;
  limit?: number;
}) {
  const q = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE}/pairs/search?${q}`);
  return res.json();
}

export async function getPairRisk(pairId: string) {
  const res = await fetch(`${BASE}/pairs/${pairId}/risk`);
  return res.json();
}
