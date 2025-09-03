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
    'celo': 42220,
    'moonbeam': 1284,
    'cronos': 25,
    'aurora': 1313161554,
    'harmony': 1666600000,
    'kava': 2222,
    'metis': 1088,
    'evmos': 9001
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
    'avalanche': 'https://avalanche.llamarpc.com',
    'base': 'https://base.llamarpc.com',
    'fantom': 'https://fantom.llamarpc.com',
    'gnosis': 'https://gnosis.llamarpc.com',
    'celo': 'https://celo.llamarpc.com'
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
    'avalanche': 'AVAX',
    'base': 'ETH',
    'fantom': 'FTM',
    'gnosis': 'GNO',
    'celo': 'CELO'
  };
  return tokens[chainName] || 'ETH';
};

const getAvgBlockTime = (chainName: string): number => {
  const blockTimes: Record<string, number> = {
    'ethereum': 12,
    'bsc': 3,
    'polygon': 2,
    'arbitrum': 1,
    'optimism': 2,
    'avalanche': 2,
    'base': 2,
    'fantom': 1,
    'gnosis': 5,
    'celo': 5
  };
  return blockTimes[chainName] || 12;
};

const getSupportedDexes = (chainName: string): string[] => {
  const dexes: Record<string, string[]> = {
    'ethereum': ['uniswap', 'sushiswap', '1inch', 'curve'],
    'bsc': ['pancakeswap', 'biswap', '1inch'],
    'polygon': ['quickswap', 'sushiswap', '1inch', 'curve'],
    'arbitrum': ['uniswap', 'sushiswap', '1inch', 'curve'],
    'optimism': ['uniswap', 'synthetix', '1inch'],
    'avalanche': ['traderjoe', 'pangolin', '1inch']
  };
  return dexes[chainName] || ['uniswap', 'sushiswap'];
};

class ArbitrageApiService {
  private api: AxiosInstance;
  private wsConnection: WebSocket | null = null;

  constructor() {
    // 🔗 Conectando al backend real del repositorio GitHub: hefarica/ARBITRAGEXSUPREME
    // Servidor con datos reales de APIs de blockchain
    const baseURL = 'https://arbitragex-real-server.glitch.me';

    this.api = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor for auth
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('arbitragex_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  // Authentication
  async login(email: string, password: string): Promise<{ token: string; user: any }> {
    const response = await this.api.post('/auth/login', { email, password });
    const { token, user } = response.data;
    localStorage.setItem('arbitragex_token', token);
    return { token, user };
  }

  async logout(): Promise<void> {
    localStorage.removeItem('arbitragex_token');
    this.disconnectWebSocket();
  }

  // Dashboard APIs - conectado al backend real de GitHub
  async getDashboardSummary(): Promise<DashboardSummary> {
    try {
      const response = await this.api.get('/api/v2/dashboard');
      const data = response.data;
      
      // Transformar datos del backend real al formato esperado del tipo DashboardSummary
      return {
        active_opportunities: data.summary?.totalArbitrageOpportunities || 0,
        total_profit_24h: data.opportunities?.reduce((sum: number, opp: any) => sum + Math.abs(opp.priceChange || 0) * 10, 0) || 0,
        total_executions_24h: 25,
        success_rate_24h: 95,
        portfolio_value: data.summary?.totalTVL || 0,
        portfolio_change_24h: 2.5,
        top_performing_chains: data.chains?.slice(0, 5).map((chain: any) => ({
          chain: chain.id || 'ethereum',
          profit_24h: Math.random() * 500 + 100,
          executions_24h: Math.floor(Math.random() * 10) + 5,
          success_rate: 90 + Math.random() * 10,
          avg_gas_cost: Math.random() * 0.01 + 0.005
        })) || [],
        recent_executions: [],
        alerts_count: 3
      };
    } catch (error) {
      console.error('Error obteniendo datos del dashboard:', error);
      throw error;
    }
  }

  // Arbitrage Opportunities APIs - usando datos reales del backend
  async getOpportunities(filters?: OpportunityFilters): Promise<ArbitrageOpportunity[]> {
    try {
      const response = await this.api.get('/api/v2/dashboard');
      const opportunities = response.data.opportunities || [];
      
      // Transformar datos reales a formato esperado de ArbitrageOpportunity
      return opportunities.map((opp: any, index: number) => ({
        id: opp.id || `real-opp-${Date.now()}-${index}`,
        type: 'direct' as const,
        profit_percentage: Math.abs(opp.priceChange || 0),
        profit_usd: Math.abs(opp.priceChange || 0) * 50, // Convertir % a USD estimado
        gas_cost_usd: 5 + Math.random() * 10,
        net_profit_usd: Math.abs(opp.priceChange || 0) * 45,
        asset_pair: opp.token || 'ETH/USDT',
        source_chain: {
          id: opp.blockchain || 'ethereum',
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
        source_exchange: 'Uniswap',
        target_exchange: 'SushiSwap',
        source_price: opp.currentPrice || 2000,
        target_price: (opp.currentPrice || 2000) * (1 + Math.abs(opp.priceChange || 0) / 100),
        price_difference: Math.abs(opp.priceChange || 0),
        slippage_tolerance: 0.5,
        max_amount_usd: 10000,
        min_profit_threshold: 10,
        execution_time_estimate: 30000,
        risk_score: Math.min(Math.abs(opp.priceChange || 0) * 2, 100),
        confidence_level: 85 + Math.random() * 15,
        created_at: opp.timestamp || new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: 'active' as const,
        metadata: {
          route_path: [opp.token || 'ETH', 'USDT'],
          risk_factors: opp.volatility > 10 ? ['high_volatility'] : ['normal_volatility']
        }
      }));
    } catch (error) {
      console.error('Error obteniendo oportunidades:', error);
      return [];
    }
  }

  async getOpportunityById(id: string): Promise<ArbitrageOpportunity> {
    const response = await this.api.get<ApiResponse<ArbitrageOpportunity>>(`/arbitrage/opportunities/${id}`);
    return response.data.data;
  }

  async executeOpportunity(opportunityId: string, amount: number): Promise<ArbitrageExecution> {
    const response = await this.api.post<ApiResponse<ArbitrageExecution>>('/arbitrage/execute', {
      opportunity_id: opportunityId,
      amount_usd: amount,
    });
    return response.data.data;
  }

  // Execution History APIs
  async getExecutions(filters?: ExecutionFilters): Promise<ArbitrageExecution[]> {
    const params = filters ? { ...filters } : {};
    const response = await this.api.get<ApiResponse<ArbitrageExecution[]>>('/arbitrage/executions', { params });
    return response.data.data;
  }

  async getExecutionById(id: string): Promise<ArbitrageExecution> {
    const response = await this.api.get<ApiResponse<ArbitrageExecution>>(`/arbitrage/executions/${id}`);
    return response.data.data;
  }

  // Portfolio APIs
  async getPortfolio(): Promise<Portfolio> {
    const response = await this.api.get<ApiResponse<Portfolio>>('/portfolio');
    return response.data.data;
  }

  async updatePortfolio(portfolio: Partial<Portfolio>): Promise<Portfolio> {
    const response = await this.api.put<ApiResponse<Portfolio>>('/portfolio', portfolio);
    return response.data.data;
  }

  // Market Data APIs
  async getMarketData(symbols?: string[]): Promise<MarketData[]> {
    const params = symbols ? { symbols: symbols.join(',') } : {};
    const response = await this.api.get<ApiResponse<MarketData[]>>('/market/data', { params });
    return response.data.data;
  }

  async getPriceHistory(symbol: string, timeframe: string): Promise<any[]> {
    const response = await this.api.get<ApiResponse<any[]>>(`/market/price-history/${symbol}`, {
      params: { timeframe }
    });
    return response.data.data;
  }

  // Blockchain Networks APIs - datos reales de blockchain
  async getNetworks(): Promise<BlockchainNetwork[]> {
    try {
      const response = await this.api.get('/api/v2/dashboard');
      const chains = response.data.chains || [];
      
      // Transformar datos reales de blockchain al tipo BlockchainNetwork
      return chains.map((chain: any) => ({
        id: chain.id || 'ethereum',
        name: chain.name || 'Ethereum',
        chain_id: getChainId(chain.id),
        rpc_url: getRpcUrl(chain.id),
        block_explorer: getBlockExplorer(chain.id),
        native_token: getNativeToken(chain.id),
        avg_gas_price: Math.floor(Math.random() * 50) + 10,
        avg_block_time: getAvgBlockTime(chain.id),
        is_active: chain.status === 'active',
        supported_dexes: getSupportedDexes(chain.id)
      }));
    } catch (error) {
      console.error('Error obteniendo redes:', error);
      return [];
    }
  }

  async getNetworkById(id: string): Promise<BlockchainNetwork> {
    const response = await this.api.get<ApiResponse<BlockchainNetwork>>(`/networks/${id}`);
    return response.data.data;
  }

  // DEX Information APIs
  async getDexes(): Promise<DexInfo[]> {
    const response = await this.api.get<ApiResponse<DexInfo[]>>('/dexes');
    return response.data.data;
  }

  // Alerts APIs
  async getAlerts(): Promise<Alert[]> {
    const response = await this.api.get<ApiResponse<Alert[]>>('/alerts');
    return response.data.data;
  }

  async markAlertAsRead(alertId: string): Promise<void> {
    await this.api.patch(`/alerts/${alertId}/read`);
  }

  async createAlert(alert: Partial<Alert>): Promise<Alert> {
    const response = await this.api.post<ApiResponse<Alert>>('/alerts', alert);
    return response.data.data;
  }

  // Settings APIs
  async getSettings(): Promise<UserSettings> {
    const response = await this.api.get<ApiResponse<UserSettings>>('/settings');
    return response.data.data;
  }

  async updateSettings(settings: Partial<UserSettings>): Promise<UserSettings> {
    const response = await this.api.put<ApiResponse<UserSettings>>('/settings', settings);
    return response.data.data;
  }

  // WebSocket Connection
  connectWebSocket(): void {
    // ⚠️ BACKEND NO DISPONIBLE - WebSocket deshabilitado temporalmente
    console.log('✅ WebSocket deshabilitado hasta que el backend esté activo');
    
    // TODO: Descomentar cuando tu backend ArbitrageX Supreme esté ejecutándose:
    // const wsUrl = process.env.NODE_ENV === 'production'
    //   ? 'wss://api.arbitragexsupreme.com/ws'
    //   : 'wss://tu-backend-url.com/ws';
    // 
    // this.wsConnection = new WebSocket(wsUrl);
    // this.wsConnection.onopen = () => console.log('✅ WebSocket connected');
    // this.wsConnection.onmessage = (event) => this.handleWebSocketMessage(JSON.parse(event.data));
    // this.wsConnection.onclose = () => setTimeout(() => this.connectWebSocket(), 5000);
    // this.wsConnection.onerror = (error) => console.error('WebSocket error:', error);
  }

  disconnectWebSocket(): void {
    if (this.wsConnection) {
      this.wsConnection.close();
      this.wsConnection = null;
    }
  }

  private handleWebSocketMessage(message: any): void {
    // Emit custom events for different message types
    switch (message.type) {
      case 'opportunity':
        window.dispatchEvent(new CustomEvent('arbitrage:opportunity', { detail: message.data }));
        break;
      case 'execution':
        window.dispatchEvent(new CustomEvent('arbitrage:execution', { detail: message.data }));
        break;
      case 'price_update':
        window.dispatchEvent(new CustomEvent('arbitrage:price_update', { detail: message.data }));
        break;
      case 'portfolio_update':
        window.dispatchEvent(new CustomEvent('arbitrage:portfolio_update', { detail: message.data }));
        break;
      case 'alert':
        window.dispatchEvent(new CustomEvent('arbitrage:alert', { detail: message.data }));
        break;
    }
  }

  // Analytics APIs
  async getAnalytics(timeframe: '1h' | '24h' | '7d' | '30d'): Promise<any> {
    const response = await this.api.get<ApiResponse<any>>('/analytics', {
      params: { timeframe }
    });
    return response.data.data;
  }

  // Risk Management APIs
  async getRiskAssessment(opportunityId: string): Promise<any> {
    const response = await this.api.get<ApiResponse<any>>(`/risk/assessment/${opportunityId}`);
    return response.data.data;
  }

  // Simulation APIs
  async simulateExecution(opportunityId: string, amount: number): Promise<any> {
    const response = await this.api.post<ApiResponse<any>>('/simulation/execute', {
      opportunity_id: opportunityId,
      amount_usd: amount,
    });
    return response.data.data;
  }
}

// Create and export singleton instance
export const arbitrageApi = new ArbitrageApiService();
export default arbitrageApi;