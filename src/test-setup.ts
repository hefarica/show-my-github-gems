/**
 * ArbitrageX Supreme V3.0 - Test Setup
 * Global test configuration and mocks
 */

import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock WebSocket globally
global.WebSocket = vi.fn().mockImplementation(() => ({
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  send: vi.fn(),
  close: vi.fn(),
  readyState: 1,
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3
}));

// Mock fetch globally
global.fetch = vi.fn();

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}));

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}));

// Mock performance.now
global.performance.now = vi.fn(() => Date.now());

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};
global.localStorage = localStorageMock as any;

// Mock sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};
global.sessionStorage = sessionStorageMock as any;

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  warn: vi.fn(),
  error: vi.fn(),
  log: vi.fn()
};

// Setup test environment variables
process.env.NODE_ENV = 'test';
process.env.VITE_API_BASE_URL = 'http://localhost:8000';
process.env.VITE_WS_URL = 'ws://localhost:8000/ws';

// Global test utilities
global.testUtils = {
  flushPromises: () => new Promise(resolve => setTimeout(resolve, 0)),
  
  mockApiResponse: (data: any, success = true) => ({
    success,
    data: success ? data : undefined,
    error: success ? undefined : { message: 'Test error', code: 'TEST_ERROR' }
  }),
  
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
  })
};

// Clean up after each test
afterEach(() => {
  vi.clearAllMocks();
  localStorageMock.clear();
  sessionStorageMock.clear();
});
