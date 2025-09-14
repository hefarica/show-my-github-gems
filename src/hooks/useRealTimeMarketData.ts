// src/hooks/useRealTimeMarketData.ts
// Hook para datos de mercado en tiempo real
// Debe incluir:
// - Conexión WebSocket a Edge Computing
// - Estado de datos de mercado
// - Manejo de reconexión

import { useState, useEffect } from 'react';
import { MarketData, WebSocketMessage } from '../types';

export function useRealTimeMarketData() {
  const [data, setData] = useState<MarketData | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const connectWebSocket = () => {
      const ws = new WebSocket('wss://arbitragex.workers.dev/ws');
      
      ws.onopen = () => {
        setConnected(true);
        console.log('WebSocket connected to Edge Computing');
      };
      
      ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          
          if (message.type === 'market:update') {
            setData(message.data as MarketData);
          } else if (message.type === 'opportunity:new') {
            // Simular actualización de datos de mercado
            setData(prev => prev ? {
              ...prev,
              totalOpportunities: prev.totalOpportunities + 1,
              lastUpdate: Date.now()
            } : {
              profit: Math.random() * 1000,
              successRate: 85 + Math.random() * 10,
              latency: 50 + Math.random() * 100,
              totalOpportunities: 1,
              totalExecutions: 0,
              lastUpdate: Date.now()
            });
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
      
      ws.onclose = () => {
        setConnected(false);
        console.log('WebSocket disconnected, attempting reconnect...');
        setTimeout(connectWebSocket, 5000);
      };
      
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setConnected(false);
      };
      
      return ws;
    };

    const ws = connectWebSocket();
    
    // Datos iniciales simulados
    setData({
      profit: 1234.56,
      successRate: 87.3,
      latency: 125,
      totalOpportunities: 42,
      totalExecutions: 38,
      lastUpdate: Date.now()
    });

    return () => {
      ws.close();
    };
  }, []);

  return { data, connected };
}
