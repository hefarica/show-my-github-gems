// ArbitrageX Supreme - TypeScript Type Definitions
// Based on the backend API structure and data dictionary

export interface ArbitrageOpportunity {
  id: string;
  type: 'cross_chain' | 'triangular' | 'direct' | 'flash_loan' | 'statistical';
  profit_percentage: number;
  profit_usd: number;
  gas_cost_usd: number;
  net_profit_usd: number;
  asset_pair: string;
  source_chain: BlockchainNetwork;
  target_chain?: BlockchainNetwork;
  source_exchange: string;
  target_exchange?: string;
  source_price: number;
  target_price: number;
  price_difference: number;
  slippage_tolerance: number;
  max_amount_usd: number;
  min_profit_threshold: number;
  execution_time_estimate: number;
  risk_score: number;
  confidence_level: number;
  created_at: string;
  updated_at: string;
  status: OpportunityStatus;
  metadata: OpportunityMetadata;
}

export interface ArbitrageExecution {
  id: string;
  opportunity_id: string;
  user_id: string;
  execution_type: 'manual' | 'automated';
  status: ExecutionStatus;
  amount_usd: number;
  gas_fee_usd: number;
  actual_profit_usd: number;
  slippage_actual: number;
  execution_time_ms: number;
  transaction_hashes: string[];
  started_at: string;
  completed_at?: string;
  error_message?: string;
  metadata: ExecutionMetadata;
}

export interface BlockchainNetwork {
  id: string;
  name: string;
  chain_id: number;
  rpc_url: string;
  block_explorer: string;
  native_token: string;
  avg_gas_price: number;
  avg_block_time: number;
  is_active: boolean;
  supported_dexes: string[];
}

export interface DexInfo {
  id: string;
  name: string;
  chain_id: number;
  router_address: string;
  factory_address: string;
  fee_percentage: number;
  tvl_usd: number;
  daily_volume_usd: number;
  is_active: boolean;
}

export interface Portfolio {
  user_id: string;
  total_balance_usd: number;
  total_profit_usd: number;
  total_loss_usd: number;
  roi_percentage: number;
  total_executions: number;
  successful_executions: number;
  failed_executions: number;
  avg_execution_time: number;
  favorite_chains: string[];
  risk_tolerance: 'low' | 'medium' | 'high';
  auto_execute_threshold: number;
  assets: PortfolioAsset[];
  performance_metrics: PerformanceMetrics;
}

export interface PortfolioAsset {
  symbol: string;
  balance: number;
  balance_usd: number;
  chain: string;
  contract_address?: string;
  price_usd: number;
  price_change_24h: number;
  allocation_percentage: number;
}

export interface PerformanceMetrics {
  daily_pnl: number;
  weekly_pnl: number;
  monthly_pnl: number;
  win_rate: number;
  avg_profit_per_trade: number;
  max_drawdown: number;
  sharpe_ratio: number;
  sortino_ratio: number;
  profit_factor: number;
  historical_data: HistoricalPerformance[];
}

export interface HistoricalPerformance {
  date: string;
  pnl: number;
  cumulative_pnl: number;
  trades_count: number;
  win_rate: number;
  volume_usd: number;
}

export interface MarketData {
  symbol: string;
  price_usd: number;
  price_change_24h: number;
  volume_24h: number;
  market_cap: number;
  exchanges: ExchangePrice[];
  last_updated: string;
}

export interface ExchangePrice {
  exchange: string;
  price: number;
  volume: number;
  spread: number;
  last_updated: string;
}

export interface Alert {
  id: string;
  user_id: string;
  type: 'profit_threshold' | 'price_difference' | 'execution_status' | 'risk_warning';
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  is_read: boolean;
  created_at: string;
  expires_at?: string;
  metadata: Record<string, any>;
}

export interface UserSettings {
  user_id: string;
  notifications_enabled: boolean;
  email_alerts: boolean;
  push_notifications: boolean;
  telegram_notifications: boolean;
  auto_execute_enabled: boolean;
  min_profit_threshold: number;
  max_risk_score: number;
  preferred_chains: string[];
  gas_limit_multiplier: number;
  slippage_tolerance: number;
  execution_timeout: number;
  api_keys: ApiKey[];
}

export interface ApiKey {
  id: string;
  name: string;
  exchange: string;
  is_active: boolean;
  permissions: string[];
  created_at: string;
  last_used: string;
}

// Status Enums
export type OpportunityStatus = 'active' | 'expired' | 'executing' | 'completed' | 'error';
export type ExecutionStatus = 'pending' | 'executing' | 'completed' | 'failed' | 'cancelled';

// Metadata Types
export interface OpportunityMetadata {
  route_path?: string[];
  smart_contract_address?: string;
  required_tokens?: string[];
  flash_loan_provider?: string;
  risk_factors?: string[];
  estimated_blocks?: number;
}

export interface ExecutionMetadata {
  wallet_address: string;
  smart_contract_used: string;
  gas_limit: number;
  gas_price: number;
  nonce: number;
  route_taken?: string[];
  blocks_mined: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

// WebSocket Message Types
export interface WebSocketMessage {
  type: 'opportunity' | 'execution' | 'price_update' | 'portfolio_update' | 'alert';
  data: any;
  timestamp: string;
}

// Filter and Query Types
export interface OpportunityFilters {
  chains?: string[];
  min_profit?: number;
  max_risk?: number;
  types?: string[];
  exchanges?: string[];
  assets?: string[];
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface ExecutionFilters {
  status?: ExecutionStatus[];
  date_from?: string;
  date_to?: string;
  min_amount?: number;
  max_amount?: number;
}

// Dashboard Summary Types
export interface DashboardSummary {
  active_opportunities: number;
  total_profit_24h: number;
  total_executions_24h: number;
  success_rate_24h: number;
  portfolio_value: number;
  portfolio_change_24h: number;
  top_performing_chains: ChainPerformance[];
  recent_executions: ArbitrageExecution[];
  alerts_count: number;
}

export interface ChainPerformance {
  chain: string;
  profit_24h: number;
  executions_24h: number;
  success_rate: number;
  avg_gas_cost: number;
}