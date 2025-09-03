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

class ArbitrageApiService {
  private api: AxiosInstance;
  private wsConnection: WebSocket | null = null;

  constructor() {
    // 🔗 Configuración para GitHub Repository: hefarica/show-my-github-gems
    // Frontend: https://github.com/hefarica/show-my-github-gems.git
    // Backend: https://github.com/hefarica/ARBITRAGEXSUPREME.git
    const baseURL = process.env.NODE_ENV === 'production' 
      ? 'https://3000-iy6h7uefq9p08klkqc2yh-6532622b.e2b.dev/api/v2'  // Tu backend ARBITRAGEXSUPREME en E2B
      : 'https://3000-iy6h7uefq9p08klkqc2yh-6532622b.e2b.dev/api/v2';  // Mismo backend para desarrollo

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

  // Dashboard APIs
  async getDashboardSummary(): Promise<DashboardSummary> {
    const response = await this.api.get<ApiResponse<DashboardSummary>>('/dashboard/summary');
    return response.data.data;
  }

  // Arbitrage Opportunities APIs
  async getOpportunities(filters?: OpportunityFilters): Promise<ArbitrageOpportunity[]> {
    const params = filters ? { ...filters } : {};
    const response = await this.api.get<ApiResponse<ArbitrageOpportunity[]>>('/arbitrage/opportunities', { params });
    return response.data.data;
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

  // Blockchain Networks APIs
  async getNetworks(): Promise<BlockchainNetwork[]> {
    const response = await this.api.get<ApiResponse<BlockchainNetwork[]>>('/networks');
    return response.data.data;
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