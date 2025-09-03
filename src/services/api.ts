// ArbitrageX Supreme - API Service Layer
// Connects to the backend APIs with full type safety

import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  ArbitrageOpportunity,
  ArbitrageExecution,
  Portfolio,
  DashboardSummary,
  MarketData,
  Alert,
  UserSettings,
  ApiResponse,
  OpportunityFilters,
  ExecutionFilters,
  BlockchainNetwork,
  DexInfo
} from '@/types/arbitrage';

// Funciones auxiliares para mapear datos de blockchain
const getChainId = (chainName: string): number => {
  const chainIds: Record<string, number> = {
    'ethereum': 1,
    'bsc': 56,
    'polygon': 137,
    'arbitrum': 42161,
    'optimism': 10,
    'avalanche': 43114,
    'base': 8453,
    'fantom': 250,
    'gnosis': 100,
    'celo': 42220
  };
  return chainIds[chainName] || 1;
};

const getRpcUrl = (chainName: string): string => {
  const rpcUrls: Record<string, string> = {
    'ethereum': 'https://eth.llamarpc.com',
    'bsc': 'https://bsc.llamarpc.com',
    'polygon': 'https://polygon.llamarpc.com',
    'arbitrum': 'https://arbitrum.llamarpc.com',
    'optimism': 'https://optimism.llamarpc.com',
    'avalanche': 'https://avalanche.llamarpc.com'
  };
  return rpcUrls[chainName] || 'https://eth.llamarpc.com';
};

const getBlockExplorer = (chainName: string): string => {
  const explorers: Record<string, string> = {
    'ethereum': 'https://etherscan.io',
    'bsc': 'https://bscscan.com',
    'polygon': 'https://polygonscan.com',
    'arbitrum': 'https://arbiscan.io',
    'optimism': 'https://optimistic.etherscan.io',
    'avalanche': 'https://snowtrace.io'
  };
  return explorers[chainName] || 'https://etherscan.io';
};

const getNativeToken = (chainName: string): string => {
  const tokens: Record<string, string> = {
    'ethereum': 'ETH',
    'bsc': 'BNB',
    'polygon': 'MATIC',
    'arbitrum': 'ETH',
    'optimism': 'ETH',
    'avalanche': 'AVAX'
  };
  return tokens[chainName] || 'ETH';
};

class ArbitrageApiService {
  private api: AxiosInstance;
  private wsConnection: WebSocket | null = null;

  constructor() {
    // Mock API service - backend no disponible, usando datos simulados
    const baseURL = 'http://localhost:9999'; // URL que nunca responderá

    this.api = axios.create({
      baseURL,
      timeout: 1000, // Timeout rápido para fallar inmediatamente
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.warn('API no disponible, usando datos mock');
        return Promise.reject(error);
      }
    );
  }

  // Authentication
  async login(email: string, password: string): Promise<{ token: string; user: any }> {
    return { token: 'mock-token', user: { email, name: 'Usuario Demo' } };
  }

  async logout(): Promise<void> {
    this.disconnectWebSocket();
  }

  // Dashboard APIs - con datos mock
  async getDashboardSummary(): Promise<DashboardSummary> {
    // Simular datos para mostrar la interfaz funcionando
    return {
      active_opportunities: 127,
      total_profit_24h: 2567.89,
      total_executions_24h: 45,
      success_rate_24h: 94.2,
      portfolio_value: 15847.32,
      portfolio_change_24h: 3.4,
      top_performing_chains: [
        { chain: 'ethereum', profit_24h: 856.23, executions_24h: 12, success_rate: 96.8, avg_gas_cost: 0.012 },
        { chain: 'arbitrum', profit_24h: 623.45, executions_24h: 8, success_rate: 94.5, avg_gas_cost: 0.002 },
        { chain: 'polygon', profit_24h: 445.67, executions_24h: 15, success_rate: 92.1, avg_gas_cost: 0.001 },
        { chain: 'bsc', profit_24h: 367.89, executions_24h: 6, success_rate: 89.3, avg_gas_cost: 0.0005 },
        { chain: 'optimism', profit_24h: 274.65, executions_24h: 4, success_rate: 97.2, avg_gas_cost: 0.003 }
      ],
      recent_executions: [],
      alerts_count: 2
    };
  }

  // Arbitrage Opportunities APIs - con datos mock
  async getOpportunities(filters?: OpportunityFilters): Promise<ArbitrageOpportunity[]> {
    return this.generateMockOpportunities();
  }

  private generateMockOpportunities(): ArbitrageOpportunity[] {
    const pairs = ['ETH/USDT', 'BNB/USDC', 'MATIC/ETH', 'ARB/USDT', 'OP/USDC', 'AVAX/ETH'];
    const chains = ['ethereum', 'bsc', 'polygon', 'arbitrum', 'optimism', 'avalanche'];
    const exchanges = ['Uniswap', 'SushiSwap', 'PancakeSwap', 'QuickSwap', 'TraderJoe', '1inch'];
    
    return Array.from({ length: 8 }, (_, i) => ({
      id: `mock-opp-${Date.now()}-${i}`,
      type: 'direct' as const,
      profit_percentage: 2.5 + Math.random() * 4,
      profit_usd: 45 + Math.random() * 200,
      gas_cost_usd: 3 + Math.random() * 7,
      net_profit_usd: 40 + Math.random() * 190,
      asset_pair: pairs[Math.floor(Math.random() * pairs.length)],
      source_chain: {
        id: chains[Math.floor(Math.random() * chains.length)],
        name: 'Ethereum',
        chain_id: 1,
        rpc_url: 'https://eth.llamarpc.com',
        block_explorer: 'https://etherscan.io',
        native_token: 'ETH',
        avg_gas_price: 20,
        avg_block_time: 12,
        is_active: true,
        supported_dexes: ['uniswap', 'sushiswap']
      },
      target_chain: {
        id: 'arbitrum',
        name: 'Arbitrum',
        chain_id: 42161,
        rpc_url: 'https://arbitrum.llamarpc.com',
        block_explorer: 'https://arbiscan.io',
        native_token: 'ETH',
        avg_gas_price: 0.1,
        avg_block_time: 1,
        is_active: true,
        supported_dexes: ['uniswap', 'sushiswap']
      },
      source_exchange: exchanges[Math.floor(Math.random() * exchanges.length)],
      target_exchange: exchanges[Math.floor(Math.random() * exchanges.length)],
      source_price: 2000 + Math.random() * 500,
      target_price: 2050 + Math.random() * 500,
      price_difference: 2.5 + Math.random() * 4,
      slippage_tolerance: 0.5,
      max_amount_usd: 5000 + Math.random() * 15000,
      min_profit_threshold: 10,
      execution_time_estimate: 20000 + Math.random() * 40000,
      risk_score: 15 + Math.random() * 70,
      confidence_level: 80 + Math.random() * 20,
      created_at: new Date(Date.now() - Math.random() * 3600000).toISOString(),
      updated_at: new Date().toISOString(),
      status: 'active' as const,
      metadata: {
        route_path: ['ETH', 'USDT'],
        risk_factors: ['normal_volatility']
      }
    }));
  }

  async getOpportunityById(id: string): Promise<ArbitrageOpportunity> {
    const opportunities = await this.getOpportunities();
    return opportunities[0]; // Retornar primera oportunidad como mock
  }

  async executeOpportunity(opportunityId: string, amount: number): Promise<ArbitrageExecution> {
    // Mock execution
    return {
      id: `mock-exec-${Date.now()}`,
      opportunity_id: opportunityId,
      user_id: 'mock-user',
      execution_type: 'manual',
      status: 'completed',
      amount_usd: amount,
      gas_fee_usd: 5.5,
      actual_profit_usd: amount * 0.025,
      slippage_actual: 0.2,
      execution_time_ms: 28500,
      transaction_hashes: ['0xmock123'],
      started_at: new Date().toISOString(),
      completed_at: new Date().toISOString(),
      metadata: {
        wallet_address: '0xmock',
        smart_contract_used: '0xmock',
        gas_limit: 200000,
        gas_price: 20,
        nonce: 123,
        blocks_mined: 1
      }
    };
  }

  // Execution History APIs
  async getExecutions(filters?: ExecutionFilters): Promise<ArbitrageExecution[]> {
    return []; // Mock empty array
  }

  async getExecutionById(id: string): Promise<ArbitrageExecution> {
    return await this.executeOpportunity('mock', 1000);
  }

  // Portfolio APIs
  async getPortfolio(): Promise<Portfolio> {
    return {
      user_id: 'mock-user',
      total_balance_usd: 15847.32,
      total_profit_usd: 2567.89,
      total_loss_usd: 234.56,
      roi_percentage: 16.2,
      total_executions: 127,
      successful_executions: 119,
      failed_executions: 8,
      avg_execution_time: 28500,
      favorite_chains: ['ethereum', 'arbitrum'],
      risk_tolerance: 'medium',
      auto_execute_threshold: 50,
      assets: [],
      performance_metrics: {
        daily_pnl: 234.56,
        weekly_pnl: 1456.78,
        monthly_pnl: 4567.89,
        win_rate: 93.7,
        avg_profit_per_trade: 21.58,
        max_drawdown: -123.45,
        sharpe_ratio: 2.34,
        sortino_ratio: 3.12,
        profit_factor: 4.2,
        historical_data: []
      }
    };
  }

  async updatePortfolio(portfolio: Partial<Portfolio>): Promise<Portfolio> {
    return await this.getPortfolio();
  }

  // Market Data APIs
  async getMarketData(symbols?: string[]): Promise<MarketData[]> {
    return [];
  }

  async getPriceHistory(symbol: string, timeframe: string): Promise<any[]> {
    return [];
  }

  // Blockchain Networks APIs - con datos mock
  async getNetworks(): Promise<BlockchainNetwork[]> {
    return [
      { id: 'ethereum', name: 'Ethereum', chain_id: 1, rpc_url: 'https://eth.llamarpc.com', block_explorer: 'https://etherscan.io', native_token: 'ETH', avg_gas_price: 45, avg_block_time: 12, is_active: true, supported_dexes: ['uniswap', 'sushiswap'] },
      { id: 'bsc', name: 'BSC', chain_id: 56, rpc_url: 'https://bsc.llamarpc.com', block_explorer: 'https://bscscan.com', native_token: 'BNB', avg_gas_price: 5, avg_block_time: 3, is_active: true, supported_dexes: ['pancakeswap'] },
      { id: 'polygon', name: 'Polygon', chain_id: 137, rpc_url: 'https://polygon.llamarpc.com', block_explorer: 'https://polygonscan.com', native_token: 'MATIC', avg_gas_price: 2, avg_block_time: 2, is_active: true, supported_dexes: ['quickswap'] },
      { id: 'arbitrum', name: 'Arbitrum', chain_id: 42161, rpc_url: 'https://arbitrum.llamarpc.com', block_explorer: 'https://arbiscan.io', native_token: 'ETH', avg_gas_price: 1, avg_block_time: 1, is_active: true, supported_dexes: ['uniswap'] },
      { id: 'optimism', name: 'Optimism', chain_id: 10, rpc_url: 'https://optimism.llamarpc.com', block_explorer: 'https://optimistic.etherscan.io', native_token: 'ETH', avg_gas_price: 2, avg_block_time: 2, is_active: true, supported_dexes: ['uniswap'] },
      { id: 'avalanche', name: 'Avalanche', chain_id: 43114, rpc_url: 'https://avalanche.llamarpc.com', block_explorer: 'https://snowtrace.io', native_token: 'AVAX', avg_gas_price: 25, avg_block_time: 2, is_active: true, supported_dexes: ['traderjoe'] }
    ];
  }

  async getNetworkById(id: string): Promise<BlockchainNetwork> {
    const networks = await this.getNetworks();
    return networks.find(n => n.id === id) || networks[0];
  }

  // DEX Information APIs
  async getDexes(): Promise<DexInfo[]> {
    return [];
  }

  // Alerts APIs
  async getAlerts(): Promise<Alert[]> {
    return [];
  }

  async markAlertAsRead(alertId: string): Promise<void> {
    // Mock implementation
  }

  async createAlert(alert: Partial<Alert>): Promise<Alert> {
    return {
      id: 'mock-alert',
      user_id: 'mock-user',
      type: 'profit_threshold',
      title: 'Mock Alert',
      message: 'This is a mock alert',
      severity: 'medium',
      is_read: false,
      created_at: new Date().toISOString(),
      metadata: {}
    };
  }

  // Settings APIs
  async getSettings(): Promise<UserSettings> {
    return {
      user_id: 'mock-user',
      notifications_enabled: true,
      email_alerts: true,
      push_notifications: false,
      telegram_notifications: false,
      auto_execute_enabled: false,
      min_profit_threshold: 10,
      max_risk_score: 70,
      preferred_chains: ['ethereum', 'arbitrum'],
      gas_limit_multiplier: 1.2,
      slippage_tolerance: 0.5,
      execution_timeout: 300,
      api_keys: []
    };
  }

  async updateSettings(settings: Partial<UserSettings>): Promise<UserSettings> {
    return await this.getSettings();
  }

  // WebSocket Connection
  connectWebSocket(): void {
    console.log('✅ WebSocket modo demo - datos mock actualizándose');
  }

  disconnectWebSocket(): void {
    if (this.wsConnection) {
      this.wsConnection.close();
      this.wsConnection = null;
    }
  }

  // Analytics APIs
  async getAnalytics(timeframe: '1h' | '24h' | '7d' | '30d'): Promise<any> {
    return { message: 'Mock analytics data' };
  }

  // Risk Management APIs
  async getRiskAssessment(opportunityId: string): Promise<any> {
    return { risk_score: 45, risk_factors: ['normal_volatility'] };
  }

  // Simulation APIs
  async simulateExecution(opportunityId: string, amount: number): Promise<any> {
    return {
      estimated_profit: amount * 0.025,
      estimated_gas: 5.5,
      success_probability: 94.2
    };
  }
}

// Create and export singleton instance
export const arbitrageApi = new ArbitrageApiService();
export default arbitrageApi;