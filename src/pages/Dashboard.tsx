// src/pages/Dashboard.tsx
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
  const [healthLoading, setHealthLoading] = useState(false);

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
        console.log(' Verificando salud del sistema...');
        setHealthLoading(true);
        console.log('🏥 Verificando salud del sistema...');
        const health = await checkSystemHealth();
        setSystemHealth(health);
        setLastHealthCheck(Date.now());
        console.log('✅ Verificación de salud completada:', health);
      } catch (error) {
        console.error('❌ Error verificando salud del sistema:', error);
        setSystemHealth(null);
      } finally {
        setHealthLoading(false);
      }
    };

    // Verificación inicial
    checkHealth();

    // Verificación periódica cada 30 segundos
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  // Función para refrescar manualmente la salud del sistema
  const handleRefreshHealth = async () => {
    try {
      setHealthLoading(true);
      console.log('🔄 Refrescando verificación manual...');
      const health = await refreshSystemHealth();
      setSystemHealth(health);
      setLastHealthCheck(Date.now());
    } catch (error) {
      console.error('❌ Error refrescando salud:', error);
    } finally {
      setHealthLoading(false);
    }
  };

  // Determinar el estado general del sistema
  const getSystemStatus = () => {
    if (!systemHealth) return { status: 'unknown', color: 'gray', message: 'Verificando...' };
    
    const { backend, edge, websocket } = systemHealth;
    const allHealthy = backend.healthy && edge.healthy && websocket.healthy;
    const anyHealthy = backend.healthy || edge.healthy || websocket.healthy;
    
    if (allHealthy) {
      return { status: 'healthy', color: 'green', message: 'Todos los servicios operativos' };
    } else if (anyHealthy) {
      return { status: 'partial', color: 'yellow', message: 'Algunos servicios con problemas' };
    } else {
      return { status: 'unhealthy', color: 'red', message: 'Servicios no disponibles' };
    }
  };

  const systemStatus = getSystemStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            ArbitrageX Supreme V3.0
          </h1>
          <p className="text-slate-300">
            Sistema de Arbitraje Avanzado - Dashboard Principal
          </p>
        </div>

        {/* System Health Status */}
        <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Overall System Status */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">Estado del Sistema</h3>
              <button
                onClick={handleRefreshHealth}
                disabled={healthLoading}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white text-sm rounded transition-colors"
              >
                {healthLoading ? '🔄' : '🔄 Refrescar'}
              </button>
            </div>
            
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              systemStatus.color === 'green' ? 'bg-green-100 text-green-800' :
              systemStatus.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
              systemStatus.color === 'red' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              <div className={`w-2 h-2 rounded-full mr-2 ${
                systemStatus.color === 'green' ? 'bg-green-500' :
                systemStatus.color === 'yellow' ? 'bg-yellow-500' :
                systemStatus.color === 'red' ? 'bg-red-500' :
                'bg-gray-500'
              }`} />
              {systemStatus.message}
            </div>
            
            {lastHealthCheck > 0 && (
              <p className="text-xs text-slate-400 mt-2">
                Última verificación: {new Date(lastHealthCheck).toLocaleTimeString()}
              </p>
            )}
          </div>

          {/* WebSocket Connection Status */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-3">Conexión WebSocket</h3>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              isConnected 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              <div className={`w-2 h-2 rounded-full mr-2 ${
                isConnected ? 'bg-green-500' : 'bg-red-500'
              }`} />
              {isConnected ? 'Conectado' : 'Desconectado'}
            </div>
            {lastUpdate && (
              <p className="text-xs text-slate-400 mt-2">
                Última actualización: {new Date(lastUpdate).toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>

        {/* Detailed Service Status */}
        {systemHealth && (
          <div className="mb-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-4">Estado Detallado de Servicios</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Backend Status */}
              <div className="bg-black/20 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">Backend API</h4>
                  <div className={`w-3 h-3 rounded-full ${
                    systemHealth.backend.healthy ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                </div>
                <p className="text-sm text-slate-300 mb-1">
                  {systemHealth.backend.healthy ? '✅ Operativo' : '❌ No disponible'}
                </p>
                {systemHealth.backend.error && (
                  <p className="text-xs text-red-400">
                    Error: {systemHealth.backend.error}
                  </p>
                )}
                <p className="text-xs text-slate-400">
                  Latencia: {systemHealth.backend.responseTime}ms
                </p>
              </div>

              {/* Edge Status */}
              <div className="bg-black/20 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">Edge Workers</h4>
                  <div className={`w-3 h-3 rounded-full ${
                    systemHealth.edge.healthy ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                </div>
                <p className="text-sm text-slate-300 mb-1">
                  {systemHealth.edge.healthy ? '✅ Operativo' : '❌ No disponible'}
                </p>
                {systemHealth.edge.error && (
                  <p className="text-xs text-red-400">
                    Error: {systemHealth.edge.error}
                  </p>
                )}
                <p className="text-xs text-slate-400">
                  Latencia: {systemHealth.edge.responseTime}ms
                </p>
              </div>

              {/* WebSocket Status */}
              <div className="bg-black/20 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">WebSocket</h4>
                  <div className={`w-3 h-3 rounded-full ${
                    systemHealth.websocket.healthy ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                </div>
                <p className="text-sm text-slate-300 mb-1">
                  {systemHealth.websocket.healthy ? '✅ Operativo' : '❌ No disponible'}
                </p>
                {systemHealth.websocket.error && (
                  <p className="text-xs text-red-400">
                    Error: {systemHealth.websocket.error}
                  </p>
                )}
                <p className="text-xs text-slate-400">
                  Latencia: {systemHealth.websocket.responseTime}ms
                </p>
              </div>
            </div>
          </div>
        )}

        {/* KPIs Grid - Solo mostrar si hay servicios operativos */}
        {systemStatus.status !== 'unhealthy' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-2">Ganancia Total</h3>
              <p className="text-3xl font-bold text-green-400">
                {systemStatus.status === 'healthy' ? '$12,450.75' : 'N/A'}
              </p>
              <p className="text-sm text-slate-300 mt-1">
                {systemStatus.status === 'healthy' ? '+15.2% desde ayer' : 'Datos no disponibles'}
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-2">Tasa de Éxito</h3>
              <p className="text-3xl font-bold text-blue-400">
                {systemStatus.status === 'healthy' ? '94.2%' : 'N/A'}
              </p>
              <p className="text-sm text-slate-300 mt-1">
                {systemStatus.status === 'healthy' ? '847 de 900 operaciones' : 'Datos no disponibles'}
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-2">Latencia Promedio</h3>
              <p className="text-3xl font-bold text-purple-400">
                {systemStatus.status === 'healthy' ? '23ms' : 'N/A'}
              </p>
              <p className="text-sm text-slate-300 mt-1">
                {systemStatus.status === 'healthy' ? 'Óptimo para arbitraje' : 'Verificando conexiones'}
              </p>
            </div>
          </div>
        )}

        {/* Warning when no services available */}
        {systemStatus.status === 'unhealthy' && (
          <div className="mb-8 bg-red-900/20 border border-red-500/50 rounded-lg p-6">
            <div className="flex items-center mb-3">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">!</span>
              </div>
              <h3 className="text-lg font-semibold text-red-400">Servicios No Disponibles</h3>
            </div>
            <p className="text-red-300 mb-4">
              No se puede conectar a ninguno de los servicios de ArbitrageX. Verifique:
            </p>
            <ul className="text-red-300 text-sm space-y-1 ml-4">
              <li>• Backend API está ejecutándose en localhost:8080</li>
              <li>• Edge Workers están desplegados en Cloudflare</li>
              <li>• Credenciales JWT configuradas correctamente</li>
              <li>• Conexión a internet estable</li>
            </ul>
          </div>
        )}

        {/* Opportunities Table */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
          <div className="p-6 border-b border-white/20">
            <h2 className="text-xl font-semibold text-white">
              Oportunidades de Arbitraje en Tiempo Real
            </h2>
            {systemStatus.status === 'unhealthy' && (
              <p className="text-yellow-400 text-sm mt-2">
                ⚠️ No se pueden cargar oportunidades - servicios no disponibles
              </p>
            )}
          </div>
          <OpportunitiesTable />
        </div>
      </div>
    </div>
  );
};
}
