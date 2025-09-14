// src/types/index.ts
// Definiciones de tipos para ArbitrageX Supreme V3.0
// Debe incluir:
// - Tipos para oportunidades
// - Tipos para ejecuciones
// - Tipos para datos de mercado

export interface Opportunity {
  id: string;
  chain: string;
  tokenA: string;
  tokenB: string;
  profit: number;
  gasEstimate: number;
  timestamp: number;
  status: 'pending' | 'executing' | 'completed' | 'failed';
}

export interface Execution {
  id: string;
  opportunityId: string;
  txHash?: string;
  status: 'pending' | 'submitted' | 'confirmed' | 'failed';
  actualProfit?: number;
  gasUsed?: number;
  timestamp: number;
}

export interface MarketData {
  profit: number;
  successRate: number;
  latency: number;
  totalOpportunities: number;
  totalExecutions: number;
  lastUpdate: number;
}

export interface WebSocketMessage {
  type: 'opportunity:new' | 'opportunity:update' | 'execution:update' | 'market:update';
  data: Opportunity | Execution | MarketData;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: number;
}
