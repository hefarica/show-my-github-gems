// ArbitrageX Supreme V3.3 (RLI) - Tipos API
// Definiciones de tipos para la integración con la API de ArbitrageX

// Respuesta API genérica
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  timestamp: number;
}

// Estructuras de blockchain
export interface BlockchainInfo {
  id: number;
  name: string;
  network_id: number;
  native_currency: string;
  currency_symbol: string;
  explorer_url: string;
  logo_url?: string;
  is_testnet: boolean;
  is_active: boolean;
  priority: string; // "high", "medium", "low"
  score: number; // 0-100
  tvl_usd: number;
  endpoints: RpcEndpoint[];
}

export interface RpcEndpoint {
  url: string;
  is_websocket: boolean;
  is_archive: boolean;
  reliability: number; // 0-100
  latency_ms: number;
  last_checked: string;
  is_active: boolean;
}

// Estructuras de DEX
export interface DexInfo {
  name: string;
  chain_id: number;
  type: string; // "v2", "v3", "stable", "other"
  factory_address: string;
  router_address: string;
  total_liquidity_usd: number;
  volume_24h_usd: number;
  fee_percent: number;
  is_active: boolean;
  pair_count: number;
  creation_date?: string;
  logo_url?: string;
}

export interface TradingPair {
  id: string;
  chain_id: number;
  dex_name: string;
  token0_address: string;
  token0_symbol: string;
  token0_decimals: number;
  token1_address: string;
  token1_symbol: string;
  token1_decimals: number;
  pair_address?: string;
  reserve0?: string;
  reserve1?: string;
  liquidity_usd: number;
  volume_24h_usd: number;
  fee_percent: number;
  price_0_in_1?: number;
  price_1_in_0?: number;
  is_stable: boolean;
  created_at?: string;
  last_updated: string;
}

// Estructuras de oportunidades de arbitraje
export interface ArbitrageOpportunity {
  id: string;
  chain_id: number;
  status: OpportunityStatus;
  risk_level: RiskLevel;
  profit_bps: number; // Basis points (1bps = 0.01%)
  profit_token_symbol: string;
  profit_token_amount: string;
  profit_usd: number;
  cost_token_symbol: string;
  cost_token_amount: string;
  cost_usd: number;
  net_profit_usd: number;
  gas_cost_usd: number;
  gas_cost_gwei?: number;
  gas_limit?: number;
  complexity: number; // 1-5
  detected_at: string;
  valid_until?: string;
  route: ArbitrageRoute;
  
  // Nuevos campos V3.3 (RLI)
  security_score?: number;
  liquidity_score?: number;
  price_confidence_score?: number;
  combined_risk_score?: number;
  risk_assessment?: string;
  verified_by_oracle?: boolean;
  verified_by_security?: boolean;
  verified_by_liquidity?: boolean;
  optimal_trade_size_usd?: number;
}

export type OpportunityStatus = 
  | "detected"
  | "analyzing"
  | "executing"
  | "executed"
  | "failed"
  | "expired";

export type RiskLevel = 
  | "low"
  | "medium"
  | "high"
  | "extreme";

export interface ArbitrageRoute {
  path: ArbitrageStep[];
  total_hops: number;
  exchanges_involved: string[];
  assets_involved: string[];
}

export interface ArbitrageStep {
  exchange: string;
  action: string; // "swap", "flash_loan", "repay", etc.
  from_token: string;
  to_token: string;
  amount_in?: string;
  amount_out?: string;
  price_impact?: number;
}

// Estructuras de sistema Anti-Rug (Nuevas en V3.3)
export interface TokenSecurity {
  address: string;
  symbol: string;
  name: string;
  chain_id: number;
  creation_date: string;
  holder_count: number;
  verified_source: boolean;
  is_mintable: boolean;
  has_proxy: boolean;
  owner_address?: string;
  owner_percent: number;
  top_holders: HolderInfo[];
  liquidity_distribution: LiquidityInfo[];
  verified_on_exchanges: string[];
  security_audit?: AuditInfo;
  blacklisted: boolean;
  security_score: number; // 0-100
  warning_flags: string[];
  last_updated: string;
}

export interface HolderInfo {
  address: string;
  percent: number;
  is_contract: boolean;
  is_locked: boolean;
  lock_end_date?: string;
  is_exchange: boolean;
}

export interface LiquidityInfo {
  dex_name: string;
  chain_id: number;
  pair_address: string;
  pair_with: string; // Symbol del otro token
  liquidity_usd: number;
  is_locked: boolean;
  lock_end_date?: string;
  percent_locked: number;
}

export interface AuditInfo {
  auditor: string;
  date: string;
  report_url: string;
  issues_found: number;
  issues_fixed: number;
  score: number; // 0-100
}

export interface TokenSecurityResponse {
  token_address: string;
  symbol: string;
  security_score: number;
  warning_flags: string[];
  is_blacklisted: boolean;
  is_whitelisted: boolean;
  security_details?: TokenSecurity;
}

export interface PairSecurityResponse {
  pair_id: string;
  security_score: number;
  token0_security: TokenSecurityResponse;
  token1_security: TokenSecurityResponse;
  recommendation: string;
}

// Estructuras de análisis de liquidez (Nuevas en V3.3)
export interface LiquidityDepthAnalysis {
  pair_id: string;
  chain_id: number;
  dex_name: string;
  token0_symbol: string;
  token1_symbol: string;
  impact_metrics: PriceImpact[];
  avg_slippage_per_1k_usd: number;
  max_single_trade_usd: number;
  liquidity_distribution_score: number; // 0-100
  overall_health_score: number; // 0-100
  last_updated: string;
}

export interface PriceImpact {
  amount_usd: number;
  impact_percent: number;
  direction: TradeDirection;
}

export type TradeDirection = "buy" | "sell";

export interface LiquidityConcentration {
  pair_id: string;
  price_ranges: PriceRange[];
  concentration_score: number; // 0-100
  imbalance_ratio: number;
  last_updated: string;
}

export interface PriceRange {
  lower_price: number;
  upper_price: number;
  liquidity_percent: number;
  is_active: boolean;
}

export interface LiquidityPair {
  pair: TradingPair;
  depth_analysis: LiquidityDepthAnalysis;
  optimal_trade_size: number;
}

// Estructuras de oráculos (Nuevas en V3.3)
export interface OraclePrice {
  base_token: string;
  quote_token: string;
  price: number;
  last_updated: string;
  confidence: number; // 0-1
  deviation_24h: number;
  oracle_type: string;
}

export interface VerifiedPrice {
  base_token: string;
  quote_token: string;
  price: number;
  sources: OraclePrice[];
  confidence: number;
  last_verified: string;
  is_fresh: boolean;
}

export interface OraclePriceResponse {
  base_token: string;
  quote_token: string;
  price: number;
  confidence: number;
  sources_count: number;
  is_fresh: boolean;
  last_verified: number;
}

export interface PriceConfidenceResponse {
  token_a: string;
  token_b: string;
  dex_price_ratio: number;
  oracle_price: number;
  confidence_score: number;
  deviation_percent: number;
}

// Estructuras para simulaciones
export interface OpportunitySimulation {
  opportunity_id: string;
  simulated_at: string;
  trade_size_usd: number;
  expected_profit_usd: number;
  actual_profit_usd?: number;
  slippage_percent?: number;
  gas_used?: number;
  simulation_time_ms?: number;
  successful: boolean;
  error_message?: string;
}

// Respuestas de listados
export interface BlockchainListResponse {
  blockchains: BlockchainInfo[];
  total: number;
  filtered: boolean;
}

export interface DexListResponse {
  dexes: DexInfo[];
  total: number;
  chain_id?: number;
}

export interface TradingPairListResponse {
  pairs: TradingPair[];
  total: number;
  dex_name: string;
  chain_id: number;
}

export interface OpportunityListResponse {
  opportunities: ArbitrageOpportunity[];
  total: number;
  chain_id?: number;
}

export interface TopLiquidityPairsResponse {
  pairs: LiquidityPair[];
  total: number;
}
