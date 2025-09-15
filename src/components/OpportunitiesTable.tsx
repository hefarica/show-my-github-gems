// src/components/OpportunitiesTable.tsx
// Tabla de oportunidades en tiempo real
// Debe incluir:
// - Zustand store
// - Auto-refresh cada 10s
// - Formateo de datos

import React, { memo, useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';
import { useOpportunitiesStore } from '../stores/opportunitiesStore';
import { useUltraFastStreaming } from '../hooks/useUltraFastStreaming';
import type { Opportunity } from '../types';

// Componente de fila memoizado para evitar re-renders innecesarios
const OpportunityRow = memo(({ index, style, data }: { index: number; style: React.CSSProperties; data: Opportunity[] }) => {
  const opportunity = data[index];
  const isEven = index % 2 === 0;
  
  return (
    <div 
      style={style} 
      className={`flex items-center px-4 py-2 text-sm border-b border-gray-100 transition-colors hover:bg-blue-50 ${
        isEven ? 'bg-white' : 'bg-gray-50'
      }`}
    >
      {/* ID */}
      <div className="w-20 flex-shrink-0 font-mono text-xs text-gray-600">
        #{opportunity.id}
      </div>
      
      {/* Chain */}
      <div className="w-24 flex-shrink-0">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          opportunity.chain === 'Ethereum' ? 'bg-blue-100 text-blue-800' :
          opportunity.chain === 'Polygon' ? 'bg-purple-100 text-purple-800' :
          opportunity.chain === 'Arbitrum' ? 'bg-orange-100 text-orange-800' :
          opportunity.chain === 'BSC' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {opportunity.chain}
        </span>
      </div>
      
      {/* Tokens */}
      <div className="w-32 flex-shrink-0 font-medium text-gray-900">
        {opportunity.tokenA} → {opportunity.tokenB}
      </div>
      
      {/* Profit */}
      <div className="w-24 flex-shrink-0 text-right">
        <span className={`font-bold ${
          opportunity.profit > 200 ? 'text-green-600' :
          opportunity.profit > 100 ? 'text-green-500' :
          opportunity.profit > 50 ? 'text-blue-600' :
          'text-gray-700'
        }`}>
          ${opportunity.profit.toFixed(2)}
        </span>
      </div>
      
      {/* Gas */}
      <div className="w-20 flex-shrink-0 text-right text-gray-500">
        {opportunity.gasEstimate}g
      </div>
      
      {/* Status */}
      <div className="w-24 flex-shrink-0">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          opportunity.status === 'completed' ? 'bg-green-100 text-green-800' :
          opportunity.status === 'executing' ? 'bg-yellow-100 text-yellow-800 animate-pulse' :
          opportunity.status === 'pending' ? 'bg-blue-100 text-blue-800' :
          'bg-red-100 text-red-800'
        }`}>
          {opportunity.status}
        </span>
      </div>
      
      {/* Timestamp */}
      <div className="w-20 flex-shrink-0 text-xs text-gray-400 text-right">
        {new Date(opportunity.timestamp).toLocaleTimeString().slice(0, 8)}
      </div>
      
      {/* Latency indicator (si está disponible) */}
      {opportunity.receivedAt && (
        <div className="w-16 flex-shrink-0 text-xs text-gray-400 text-right">
          {Math.round(Date.now() - opportunity.receivedAt)}ms
        </div>
      )}
    </div>
  );
});

OpportunityRow.displayName = 'OpportunityRow';

export const OpportunitiesTable: React.FC = () => {
  const { opportunities } = useOpportunitiesStore();
  const { isConnected, latency, messagesPerSecond } = useUltraFastStreaming();
  
  // Ordenar oportunidades por timestamp (más recientes primero) de forma memoizada
  const sortedOpportunities = useMemo(() => {
    return [...opportunities].sort((a, b) => b.timestamp - a.timestamp);
  }, [opportunities]);

  if (!isConnected) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Conectando al streaming ultra-rápido...</p>
        <p className="text-sm text-gray-500 mt-2">Edge Workers • WebSocket • Datos reales</p>
      </div>
    );
  }

  if (sortedOpportunities.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">⚡</span>
        </div>
        <p className="text-gray-600 font-medium">Streaming activo - Esperando oportunidades</p>
        <p className="text-sm text-gray-500 mt-2">
          Conectado • Latencia: {latency}ms • {messagesPerSecond} msg/s
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header con métricas en tiempo real */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-3 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold text-gray-900">Streaming Ultra-Rápido</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600 font-medium">LIVE</span>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <div className="text-gray-600">
              <span className="font-medium">{sortedOpportunities.length}</span> oportunidades
            </div>
            <div className="text-gray-600">
              <span className="font-medium">{latency}ms</span> latencia
            </div>
            <div className="text-gray-600">
              <span className="font-medium">{messagesPerSecond}</span> msg/s
            </div>
          </div>
        </div>
      </div>

      {/* Header de columnas */}
      <div className="bg-gray-100 px-4 py-2 text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
        <div className="flex items-center">
          <div className="w-20 flex-shrink-0">ID</div>
          <div className="w-24 flex-shrink-0">Chain</div>
          <div className="w-32 flex-shrink-0">Tokens</div>
          <div className="w-24 flex-shrink-0 text-right">Profit</div>
          <div className="w-20 flex-shrink-0 text-right">Gas</div>
          <div className="w-24 flex-shrink-0">Status</div>
          <div className="w-20 flex-shrink-0 text-right">Time</div>
          <div className="w-16 flex-shrink-0 text-right">Lag</div>
        </div>
      </div>

      {/* Virtual scrolling list - Sin parpadeo, ultra-rápido */}
      <div className="flex-1">
        <List
          height={500} // Altura fija para virtual scrolling
          itemCount={sortedOpportunities.length}
          itemSize={48} // Altura de cada fila
          itemData={sortedOpportunities}
          overscanCount={5} // Pre-renderizar 5 elementos extra para scroll suave
        >
          {OpportunityRow}
        </List>
      </div>

      {/* Footer con estadísticas */}
      <div className="bg-gray-50 px-4 py-2 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div>
            Última actualización: {new Date().toLocaleTimeString()}
          </div>
          <div className="flex items-center space-x-4">
            <span>Virtual Scrolling: ON</span>
            <span>Auto-refresh: STREAMING</span>
            <span>Mock Data: DISABLED</span>
          </div>
        </div>
      </div>
    </div>
  );
};
