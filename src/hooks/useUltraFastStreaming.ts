// src/hooks/useUltraFastStreaming.ts
// Hook para streaming ultra-rápido en tiempo real (ms-level, sin parpadeo)
// Arquitectura: Mempool → searcher-rs → Edge Workers → Frontend
// Latencia objetivo: < 100ms end-to-end

import { useEffect, useRef, useState, useCallback } from 'react';
import type { MarketData, WebSocketMessage, Opportunity } from '../types';
import { useOpportunitiesStore } from '../stores/opportunitiesStore';

export const useUltraFastStreaming = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<number>(0);
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const [latency, setLatency] = useState<number>(0);
  const [messagesPerSecond, setMessagesPerSecond] = useState<number>(0);
  
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);
  const pingIntervalRef = useRef<number | null>(null);
  const lastPingRef = useRef<number>(0);
  const messageCountRef = useRef<number>(0);
  const lastMessageCountReset = useRef<number>(Date.now());
  
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
  }, []);

  const connect = useCallback(() => {
    cleanup();
    
    const wsUrl = 'wss://arbitragex.workers.dev/ws';
    console.log(`🚀 [${new Date().toISOString()}] Conectando a streaming ultra-rápido:`, wsUrl);
    
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('⚡ WebSocket conectado - Streaming ultra-rápido activado');
      setIsConnected(true);
      setLastUpdate(Date.now());
      setConnectionAttempts(0);
      
      // Ping cada 30 segundos para mantener conexión viva
      pingIntervalRef.current = window.setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          lastPingRef.current = performance.now();
          ws.send(JSON.stringify({ type: 'ping', timestamp: lastPingRef.current }));
        }
      }, 30000);

      // Contador de mensajes por segundo
      const messageCounter = setInterval(() => {
        const now = Date.now();
        const elapsed = now - lastMessageCountReset.current;
        if (elapsed >= 1000) {
          setMessagesPerSecond(Math.round((messageCountRef.current * 1000) / elapsed));
          messageCountRef.current = 0;
          lastMessageCountReset.current = now;
        }
      }, 1000);

      return () => clearInterval(messageCounter);
    };

    ws.onmessage = (event) => {
      const receiveTime = performance.now();
      messageCountRef.current++;
      
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        
        // Medir latencia con pong
        if (message.type === 'pong' && message.timestamp) {
          const currentLatency = receiveTime - message.timestamp;
          setLatency(Math.round(currentLatency));
        }
        
        // Actualización de mercado (datos generales)
        if (message.type === 'market_update' && message.data) {
          const marketData = message.data as MarketData;
          if (marketData && 'profit' in marketData && 'successRate' in marketData) {
            setMarketData(marketData);
            setLastUpdate(Date.now());
          }
        }
        
        // Nueva oportunidad detectada (streaming ultra-rápido)
        if (message.type === 'opportunity_new' && message.data) {
          // Verificar que los datos son de tipo Opportunity
          const opportunityData = message.data as Opportunity;
          if (opportunityData && 'chain' in opportunityData && 'tokenA' in opportunityData) {
            const opportunity: Opportunity = {
              ...opportunityData,
              timestamp: Date.now(),
              receivedAt: receiveTime // Para debugging de latencia
            };
            
            // Agregar sin parpadeo usando Zustand
            addOpportunity(opportunity);
            setLastUpdate(Date.now());
            
            console.log(`⚡ Nueva oportunidad [${opportunity.id}]: $${opportunity.profit.toFixed(2)} en ${opportunity.chain}`);
          }
        }
        
        // Actualización de oportunidad existente
        if (message.type === 'opportunity_update' && message.data) {
          const opportunityData = message.data as Opportunity;
          if (opportunityData && 'id' in opportunityData) {
            updateOpportunity(opportunityData.id, opportunityData);
            setLastUpdate(Date.now());
          }
        }
        
      } catch (error) {
        console.error('❌ Error parsing WebSocket message:', error);
      }
    };

    ws.onclose = (event) => {
      console.log(`🔌 WebSocket desconectado [${event.code}]: ${event.reason}`);
      setIsConnected(false);
      
      // Reconexión exponencial con backoff
      const backoffDelay = Math.min(1000 * Math.pow(2, connectionAttempts), 30000);
      console.log(`🔄 Reconectando en ${backoffDelay}ms (intento ${connectionAttempts + 1})`);
      
      reconnectTimeoutRef.current = window.setTimeout(() => {
        setConnectionAttempts((prev: number) => prev + 1);
        connect();
      }, backoffDelay);
    };

    ws.onerror = (error) => {
      console.error('❌ WebSocket error:', error);
      setIsConnected(false);
    };
  }, [addOpportunity, updateOpportunity, connectionAttempts, cleanup]);

  useEffect(() => {
    connect();
    return cleanup;
  }, [connect, cleanup]);

  return {
    isConnected,
    lastUpdate,
    marketData,
    latency,
    connectionAttempts,
    messagesPerSecond,
    reconnect: connect
  };
};
