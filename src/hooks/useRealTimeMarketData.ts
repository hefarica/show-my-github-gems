// src/hooks/useRealTimeMarketData.ts
// Hook para streaming ultra-rápido en tiempo real (ms-level, sin parpadeo)
// Arquitectura: Mempool → searcher-rs → Edge Workers → Frontend
// Latencia objetivo: < 100ms end-to-end

import { useEffect, useRef, useState, useCallback } from 'react';
import type { MarketData, WebSocketMessage, Opportunity } from '../types';
import { useOpportunitiesStore } from '../stores/opportunitiesStore';

export const useRealTimeMarketData = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<number>(0);
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const [latency, setLatency] = useState<number>(0);
  
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);
  const pingIntervalRef = useRef<number | null>(null);
  const lastPingRef = useRef<number>(0);
  
  const { addOpportunity, updateOpportunity } = useOpportunitiesStore();

  const cleanup = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    if (pingIntervalRef.current) {
      clearInterval(pingIntervalRef.current);
      pingIntervalRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    return () => {
      ws.close();
    };
  }, []);

  return { data, connected };
}
