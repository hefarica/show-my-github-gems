/**
 * ArbitrageX Supreme V3.0 - Frontend Unit Tests
 * Comprehensive test suite for Dashboard and components
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import Dashboard from '../components/Dashboard';
import { OpportunitiesTable } from '../components/OpportunitiesTable';
import { useOpportunityStore } from '../store/opportunityStore';
import { apiService } from '../services/api';

// Mock API service
vi.mock('../services/api', () => ({
  apiService: {
    getOpportunities: vi.fn(),
    getExecutions: vi.fn(),
    getAnalytics: vi.fn(),
    getStrategies: vi.fn(),
    connectWebSocket: vi.fn(),
    disconnectWebSocket: vi.fn()
  }
}));

// Mock WebSocket
global.WebSocket = vi.fn().mockImplementation(() => ({
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  send: vi.fn(),
  close: vi.fn(),
  readyState: 1
}));

// Mock zustand store
vi.mock('../store/opportunityStore', () => ({
  useOpportunityStore: vi.fn()
}));

describe('Dashboard Component', () => {
  const mockOpportunities = [
    {
      id: 'opp_1',
      token_in: 'USDC',
      token_out: 'WETH',
      amount_in: '1000',
      amount_out: '0.5',
      profit_usd: 150.75,
      gas_cost: 25.50,
      net_profit: 125.25,
      chain: 'ethereum',
      dex_path: ['Uniswap V3', 'SushiSwap'],
      confidence: 0.95,
      timestamp: new Date().toISOString(),
      receivedAt: Date.now()
    },
    {
      id: 'opp_2',
      token_in: 'WETH',
      token_out: 'USDT',
      amount_in: '0.5',
      amount_out: '1200',
      profit_usd: 89.30,
      gas_cost: 18.20,
      net_profit: 71.10,
      chain: 'polygon',
      dex_path: ['QuickSwap', 'Curve'],
      confidence: 0.88,
      timestamp: new Date().toISOString(),
      receivedAt: Date.now()
    }
  ];

  const mockStore = {
    opportunities: mockOpportunities,
    isConnected: true,
    connectionStatus: 'connected' as const,
    lastUpdate: Date.now(),
    addOpportunity: vi.fn(),
    updateOpportunity: vi.fn(),
    removeOpportunity: vi.fn(),
    setConnectionStatus: vi.fn(),
    clearOpportunities: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useOpportunityStore as any).mockReturnValue(mockStore);
    (apiService.getOpportunities as any).mockResolvedValue({
      success: true,
      data: mockOpportunities
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders dashboard with all components', async () => {
    render(<Dashboard />);
    
    expect(screen.getByText('ArbitrageX Supreme V3.0')).toBeInTheDocument();
    expect(screen.getByText('Real-time Arbitrage Opportunities')).toBeInTheDocument();
    expect(screen.getByText('Live Opportunities')).toBeInTheDocument();
  });

  it('displays connection status correctly', () => {
    render(<Dashboard />);
    
    const statusElement = screen.getByText(/Connected/);
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveClass('text-green-600');
  });

  it('shows disconnected status when not connected', () => {
    const disconnectedStore = { ...mockStore, isConnected: false, connectionStatus: 'disconnected' as const };
    (useOpportunityStore as any).mockReturnValue(disconnectedStore);
    
    render(<Dashboard />);
    
    const statusElement = screen.getByText(/Disconnected/);
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveClass('text-red-600');
  });

  it('displays opportunities count correctly', () => {
    render(<Dashboard />);
    
    expect(screen.getByText('2')).toBeInTheDocument(); // Opportunities count
  });

  it('handles refresh button click', async () => {
    render(<Dashboard />);
    
    const refreshButton = screen.getByRole('button', { name: /refresh/i });
    fireEvent.click(refreshButton);
    
    await waitFor(() => {
      expect(apiService.getOpportunities).toHaveBeenCalled();
    });
  });

  it('displays error message when API fails', async () => {
    (apiService.getOpportunities as any).mockRejectedValue(new Error('API Error'));
    
    render(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch opportunities/)).toBeInTheDocument();
    });
  });

  it('shows loading state during data fetch', async () => {
    (apiService.getOpportunities as any).mockImplementation(() => 
      new Promise(resolve => setTimeout(resolve, 100))
    );
    
    render(<Dashboard />);
    
    expect(screen.getByText(/Loading/)).toBeInTheDocument();
  });
});

describe('OpportunitiesTable Component', () => {
  const mockOpportunities = [
    {
      id: 'opp_1',
      token_in: 'USDC',
      token_out: 'WETH',
      amount_in: '1000',
      amount_out: '0.5',
      profit_usd: 150.75,
      gas_cost: 25.50,
      net_profit: 125.25,
      chain: 'ethereum',
      dex_path: ['Uniswap V3', 'SushiSwap'],
      confidence: 0.95,
      timestamp: new Date().toISOString(),
      receivedAt: Date.now()
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders table with opportunities', () => {
    render(<OpportunitiesTable opportunities={mockOpportunities} />);
    
    expect(screen.getByText('USDC → WETH')).toBeInTheDocument();
    expect(screen.getByText('$150.75')).toBeInTheDocument();
    expect(screen.getByText('$125.25')).toBeInTheDocument();
    expect(screen.getByText('ethereum')).toBeInTheDocument();
  });

  it('displays empty state when no opportunities', () => {
    render(<OpportunitiesTable opportunities={[]} />);
    
    expect(screen.getByText('No opportunities available')).toBeInTheDocument();
  });

  it('sorts opportunities by profit correctly', () => {
    const unsortedOpportunities = [
      { ...mockOpportunities[0], profit_usd: 50 },
      { ...mockOpportunities[0], id: 'opp_2', profit_usd: 150 },
      { ...mockOpportunities[0], id: 'opp_3', profit_usd: 100 }
    ];
    
    render(<OpportunitiesTable opportunities={unsortedOpportunities} />);
    
    const profitCells = screen.getAllByText(/\$\d+/);
    expect(profitCells[0]).toHaveTextContent('$150');
    expect(profitCells[1]).toHaveTextContent('$100');
    expect(profitCells[2]).toHaveTextContent('$50');
  });

  it('handles virtual scrolling for large datasets', () => {
    const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
      ...mockOpportunities[0],
      id: `opp_${i}`,
      profit_usd: Math.random() * 1000
    }));
    
    render(<OpportunitiesTable opportunities={largeDataset} />);
    
    // Virtual scrolling should only render visible items
    const visibleRows = screen.getAllByRole('row');
    expect(visibleRows.length).toBeLessThan(1000);
  });

  it('updates in real-time when new opportunities arrive', async () => {
    const { rerender } = render(<OpportunitiesTable opportunities={mockOpportunities} />);
    
    const newOpportunity = {
      ...mockOpportunities[0],
      id: 'opp_new',
      profit_usd: 200,
      receivedAt: Date.now()
    };
    
    rerender(<OpportunitiesTable opportunities={[...mockOpportunities, newOpportunity]} />);
    
    await waitFor(() => {
      expect(screen.getByText('$200')).toBeInTheDocument();
    });
  });

  it('highlights high-profit opportunities', () => {
    const highProfitOpportunity = {
      ...mockOpportunities[0],
      profit_usd: 500,
      net_profit: 475
    };
    
    render(<OpportunitiesTable opportunities={[highProfitOpportunity]} />);
    
    const profitCell = screen.getByText('$500');
    expect(profitCell.closest('tr')).toHaveClass('bg-green-50');
  });

  it('shows confidence indicators correctly', () => {
    render(<OpportunitiesTable opportunities={mockOpportunities} />);
    
    expect(screen.getByText('95%')).toBeInTheDocument();
  });

  it('displays DEX path information', () => {
    render(<OpportunitiesTable opportunities={mockOpportunities} />);
    
    expect(screen.getByText('Uniswap V3 → SushiSwap')).toBeInTheDocument();
  });
});

describe('API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it('fetches opportunities successfully', async () => {
    const mockResponse = {
      success: true,
      data: mockOpportunities
    };
    
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });
    
    const result = await apiService.getOpportunities();
    
    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockOpportunities);
  });

  it('handles API errors gracefully', async () => {
    (global.fetch as any).mockRejectedValue(new Error('Network error'));
    
    const result = await apiService.getOpportunities();
    
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  it('includes proper headers in requests', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true, data: [] })
    });
    
    await apiService.getOpportunities();
    
    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        })
      })
    );
  });

  it('handles timeout correctly', async () => {
    (global.fetch as any).mockImplementation(() => 
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 100)
      )
    );
    
    const result = await apiService.getOpportunities();
    
    expect(result.success).toBe(false);
    expect(result.error?.message).toContain('timeout');
  });
});

describe('WebSocket Integration', () => {
  let mockWebSocket: any;

  beforeEach(() => {
    mockWebSocket = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      send: vi.fn(),
      close: vi.fn(),
      readyState: 1
    };
    
    (global.WebSocket as any).mockImplementation(() => mockWebSocket);
  });

  it('establishes WebSocket connection', () => {
    apiService.connectWebSocket();
    
    expect(global.WebSocket).toHaveBeenCalledWith(
      expect.stringContaining('ws')
    );
  });

  it('handles WebSocket messages correctly', () => {
    apiService.connectWebSocket();
    
    const messageHandler = mockWebSocket.addEventListener.mock.calls
      .find(([event]) => event === 'message')[1];
    
    const mockMessage = {
      data: JSON.stringify({
        type: 'opportunity_update',
        data: mockOpportunities[0]
      })
    };
    
    messageHandler(mockMessage);
    
    // Should process the message without errors
    expect(mockWebSocket.addEventListener).toHaveBeenCalledWith('message', expect.any(Function));
  });

  it('handles WebSocket disconnection', () => {
    apiService.connectWebSocket();
    
    const closeHandler = mockWebSocket.addEventListener.mock.calls
      .find(([event]) => event === 'close')[1];
    
    closeHandler({ code: 1000, reason: 'Normal closure' });
    
    expect(mockWebSocket.addEventListener).toHaveBeenCalledWith('close', expect.any(Function));
  });

  it('attempts reconnection on unexpected disconnect', async () => {
    apiService.connectWebSocket();
    
    const closeHandler = mockWebSocket.addEventListener.mock.calls
      .find(([event]) => event === 'close')[1];
    
    closeHandler({ code: 1006, reason: 'Abnormal closure' });
    
    // Should attempt reconnection
    await waitFor(() => {
      expect(global.WebSocket).toHaveBeenCalledTimes(2);
    }, { timeout: 6000 });
  });
});

describe('Store Management', () => {
  it('adds opportunities correctly', () => {
    const store = useOpportunityStore.getState();
    
    store.addOpportunity(mockOpportunities[0]);
    
    expect(store.opportunities).toContain(mockOpportunities[0]);
  });

  it('updates existing opportunities', () => {
    const store = useOpportunityStore.getState();
    
    store.addOpportunity(mockOpportunities[0]);
    
    const updatedOpportunity = {
      ...mockOpportunities[0],
      profit_usd: 200
    };
    
    store.updateOpportunity(updatedOpportunity);
    
    const found = store.opportunities.find(opp => opp.id === mockOpportunities[0].id);
    expect(found?.profit_usd).toBe(200);
  });

  it('removes opportunities correctly', () => {
    const store = useOpportunityStore.getState();
    
    store.addOpportunity(mockOpportunities[0]);
    store.removeOpportunity(mockOpportunities[0].id);
    
    expect(store.opportunities).not.toContain(mockOpportunities[0]);
  });

  it('manages connection status', () => {
    const store = useOpportunityStore.getState();
    
    store.setConnectionStatus('connecting');
    expect(store.connectionStatus).toBe('connecting');
    
    store.setConnectionStatus('connected');
    expect(store.connectionStatus).toBe('connected');
    expect(store.isConnected).toBe(true);
  });

  it('clears opportunities when needed', () => {
    const store = useOpportunityStore.getState();
    
    store.addOpportunity(mockOpportunities[0]);
    store.clearOpportunities();
    
    expect(store.opportunities).toHaveLength(0);
  });
});

describe('Performance Tests', () => {
  it('handles rapid updates without performance degradation', async () => {
    const start = performance.now();
    
    const rapidUpdates = Array.from({ length: 100 }, (_, i) => ({
      ...mockOpportunities[0],
      id: `rapid_${i}`,
      receivedAt: Date.now() + i
    }));
    
    render(<OpportunitiesTable opportunities={rapidUpdates} />);
    
    const end = performance.now();
    const renderTime = end - start;
    
    expect(renderTime).toBeLessThan(1000); // Should render within 1 second
  });

  it('maintains 60fps during real-time updates', async () => {
    const { rerender } = render(<OpportunitiesTable opportunities={mockOpportunities} />);
    
    const frameStart = performance.now();
    
    for (let i = 0; i < 60; i++) {
      const newOpportunities = [
        ...mockOpportunities,
        {
          ...mockOpportunities[0],
          id: `frame_${i}`,
          receivedAt: Date.now()
        }
      ];
      
      rerender(<OpportunitiesTable opportunities={newOpportunities} />);
    }
    
    const frameEnd = performance.now();
    const avgFrameTime = (frameEnd - frameStart) / 60;
    
    expect(avgFrameTime).toBeLessThan(16.67); // 60fps = 16.67ms per frame
  });
});

// Export test utilities for other test files
export const testUtils = {
  createMockOpportunity: (overrides = {}) => ({
    id: 'test_opp',
    token_in: 'USDC',
    token_out: 'WETH',
    amount_in: '1000',
    amount_out: '0.5',
    profit_usd: 100,
    gas_cost: 20,
    net_profit: 80,
    chain: 'ethereum',
    dex_path: ['Uniswap V3'],
    confidence: 0.9,
    timestamp: new Date().toISOString(),
    receivedAt: Date.now(),
    ...overrides
  }),
  
  mockApiResponse: (data: any, success = true) => ({
    success,
    data: success ? data : undefined,
    error: success ? undefined : { message: 'Test error', code: 'TEST_ERROR' }
  }),
  
  waitForNextTick: () => new Promise(resolve => setTimeout(resolve, 0))
};
