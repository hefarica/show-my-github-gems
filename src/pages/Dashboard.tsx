// src/pages/Dashboard.tsx
// Debe incluir:
// - useRealTimeMarketData()
// - Grid de KPIs: Profit, Success Rate, Latency
// - Conexión a SSE de Cloudflare

import { useRealTimeMarketData } from '../hooks/useRealTimeMarketData';
import OpportunitiesTable from '../components/OpportunitiesTable';

export default function Dashboard() {
  const { data, connected } = useRealTimeMarketData();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">ArbitrageX Supreme V3.0</h1>
          <p className="text-gray-600 mt-2">Real-time MEV arbitrage monitoring dashboard</p>
        </div>
        
        {/* KPIs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Profit</h3>
                <p className="text-2xl font-bold text-green-600">
                  ${data?.profit?.toFixed(2) || '0.00'}
                </p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm font-bold">$</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Success Rate</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {data?.successRate?.toFixed(1) || '0.0'}%
                </p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm font-bold">%</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Avg Latency</h3>
                <p className="text-2xl font-bold text-purple-600">
                  {data?.latency || '0'}ms
                </p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-sm font-bold">⚡</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Opportunities Table */}
        <OpportunitiesTable />
        
        {/* Connection Status */}
        <div className="mt-6 flex items-center justify-between bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              data ? 'bg-green-400 animate-pulse' : 'bg-red-400'
            }`}></div>
            <span className="text-sm text-gray-600">
              {data ? 'Connected to Edge Computing' : 'Disconnected'}
            </span>
          </div>
          <div className="text-xs text-gray-400">
            Last update: {data ? new Date().toLocaleTimeString() : 'Never'}
          </div>
        </div>
      </div>
    </div>
  );
}
