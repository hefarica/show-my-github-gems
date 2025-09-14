// src/services/api.ts
// Cliente API que consuma:
// - https://api.arbitragex.dev/opportunities
// - https://api.arbitragex.dev/executions

const API_BASE_URL = 'https://api.arbitragex.dev';

export interface Opportunity {
  id: number;
  chain: string;
  tokens: string[];
  profit: number;
  gas_cost: number;
  created_at: number;
}

export interface Execution {
  id: string;
  opportunity_id: string;
  status: 'pending' | 'submitted' | 'confirmed' | 'failed';
  transaction_hash?: string;
  actual_profit?: number;
  created_at: string;
}

export const api = {
  // Fetch opportunities
  async getOpportunities(): Promise<Opportunity[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/opportunities`);
      if (!response.ok) throw new Error('Failed to fetch opportunities');
      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error('Error fetching opportunities:', error);
      return [];
    }
  },

  // Fetch executions
  async getExecutions(): Promise<Execution[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/executions`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token') || 'demo_token'}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch executions');
      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error('Error fetching executions:', error);
      return [];
    }
  }
};
