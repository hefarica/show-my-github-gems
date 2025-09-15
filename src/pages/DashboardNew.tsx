// src/pages/DashboardNew.tsx
// Dashboard principal con streaming ultra-rápido integrado
// Arquitectura: Mempool → searcher-rs → Edge Workers → Frontend
// Latencia objetivo: < 100ms end-to-end

import React, { useEffect, useState } from 'react';
import { OpportunitiesTable } from '../components/OpportunitiesTable';
import { useUltraFastStreaming } from '../hooks/useUltraFastStreaming';
import { checkSystemHealth } from '../services/api';
import type { SystemHealth } from '../types';

export const Dashboard: React.FC = () => {
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastHealthCheck, setLastHealthCheck] = useState<number>(0);
  
  // Hook de streaming ultra-rápido
  const { 
    isConnected: streamingConnected, 
    latency: streamingLatency, 
    messagesPerSecond, 
    marketData: liveMarketData,
    lastUpdate,
    reconnect 
  } = useUltraFastStreaming();

  // Verificar salud del sistema al cargar y cada 30 segundos
  useEffect(() => {
    const checkHealth = async () => {
      try {
        setIsLoading(true);
        console.log('🏥 Verificando salud del sistema...');
        const health = await checkSystemHealth();
        setSystemHealth(health);
        setLastHealthCheck(Date.now());
        console.log('✅ Salud del sistema actualizada:', health);
      } catch (error: any) {
        console.error('❌ Error verificando salud del sistema:', error);
        // Crear estado de error para mostrar en UI
        setSystemHealth({
          backend: { status: 'error', latency: 0, lastCheck: Date.now() },
          edge: { status: 'error', latency: 0, lastCheck: Date.now() },
          websocket: { status: streamingConnected ? 'connected' : 'error', latency: streamingLatency, lastCheck: Date.now() },
          overall: 'unhealthy'
        });
      } finally {
        setIsLoading(false);
      }
    };

    const interval = setInterval(checkHealth, 30000);
    checkHealth(); // Initial check
    return () => clearInterval(interval);
  }, [streamingConnected, streamingLatency]);

  const handleManualRefresh = async () => {
    setIsLoading(true);
    try {
      const health = await checkSystemHealth();
      setSystemHealth(health);
      setLastHealthCheck(Date.now());
    } catch (error) {
      console.error('Error en refresh manual:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calcular KPIs en tiempo real usando datos de streaming
  const realTimeKPIs = {
    profit: liveMarketData?.profit || 0,
    successRate: liveMarketData?.successRate || 0,
    latency: streamingLatency,
    totalOpportunities: liveMarketData?.totalOpportunities || 0,
    totalExecutions: liveMarketData?.totalExecutions || 0
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header con métricas de streaming en tiempo real */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ArbitrageX Supreme V3.0</h1>
                <p className="text-sm text-gray-600">Streaming Ultra-Rápido • Datos Reales • Sin Mock Data</p>
              </div>
              
              {/* Indicadores de conexión en tiempo real */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    streamingConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                  }`}></div>
                  <span className="text-sm font-medium text-gray-700">
                    {streamingConnected ? 'STREAMING LIVE' : 'DESCONECTADO'}
                  </span>
                </div>
                
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{streamingLatency}ms</span> latencia
                </div>
                
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{messagesPerSecond}</span> msg/s
                </div>
                
                <button
                  onClick={handleManualRefresh}
                  disabled={isLoading}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {isLoading ? '⟳' : '↻'} Refresh
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de métricas principales */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {/* Profit Total */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm font-bold">$</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Profit Total</p>
                <p className="text-lg font-semibold text-gray-900">
                  ${realTimeKPIs.profit.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Success Rate */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-bold">%</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Success Rate</p>
                <p className="text-lg font-semibold text-gray-900">
                  {realTimeKPIs.successRate.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          {/* Latencia */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-sm font-bold">⚡</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Latencia</p>
                <p className="text-lg font-semibold text-gray-900">
                  {realTimeKPIs.latency}ms
                </p>
              </div>
            </div>
          </div>

          {/* Oportunidades */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 text-sm font-bold">#</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Oportunidades</p>
                <p className="text-lg font-semibold text-gray-900">
                  {realTimeKPIs.totalOpportunities}
                </p>
              </div>
            </div>
          </div>

          {/* Ejecuciones */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 text-sm font-bold">✓</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Ejecuciones</p>
                <p className="text-lg font-semibold text-gray-900">
                  {realTimeKPIs.totalExecutions}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Estado del sistema */}
        {systemHealth && (
          <div className="bg-white rounded-lg shadow mb-6 p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Estado del Sistema</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Backend Status */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-700">Backend API</p>
                  <p className="text-xs text-gray-500">{systemHealth.backend.latency}ms</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  systemHealth.backend.status === 'connected' ? 'bg-green-500' :
                  systemHealth.backend.status === 'error' ? 'bg-red-500' : 'bg-yellow-500'
                }`}></div>
              </div>

              {/* Edge Status */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-700">Edge Workers</p>
                  <p className="text-xs text-gray-500">{systemHealth.edge.latency}ms</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  systemHealth.edge.status === 'connected' ? 'bg-green-500' :
                  systemHealth.edge.status === 'error' ? 'bg-red-500' : 'bg-yellow-500'
                }`}></div>
              </div>

              {/* WebSocket Status */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-700">WebSocket</p>
                  <p className="text-xs text-gray-500">{systemHealth.websocket.latency}ms</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  systemHealth.websocket.status === 'connected' ? 'bg-green-500' :
                  systemHealth.websocket.status === 'error' ? 'bg-red-500' : 'bg-yellow-500'
                }`}></div>
              </div>
            </div>
          </div>
        )}

        {/* Tabla de oportunidades con virtual scrolling */}
        <div className="bg-white rounded-lg shadow">
          <OpportunitiesTable />
        </div>

        {/* Footer con información de streaming */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Última actualización: {lastUpdate ? new Date(lastUpdate).toLocaleTimeString() : 'Nunca'} •
            Sistema de verificación: {systemHealth ? 'Activo' : 'Inactivo'} •
            Mock Data: Deshabilitado
          </p>
        </div>
      </div>
    </div>
  );
};
