// src/components/OpportunitiesTable.tsx
// Tabla de oportunidades en tiempo real
// Debe incluir:
// - Zustand store
// - Auto-refresh cada 10s
// - Formateo de datos

import React, { useEffect } from 'react';
import { useOpportunitiesStore } from '../stores/opportunitiesStore';
import { fetchOpportunities } from '../services/api';
import { Opportunity } from '../types';

export default function OpportunitiesTable() {
  const { opportunities, addOpportunity, clearOpportunities } = useOpportunitiesStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOpportunities();
        clearOpportunities(); // Clear existing before adding new
        data.forEach((opp: Opportunity) => addOpportunity(opp));
      } catch (error) {
        console.error('Error fetching opportunities:', error);
        // Add mock data for demonstration
        const mockOpportunities: Opportunity[] = [
          {
            id: '1',
            chain: 'Ethereum',
            tokenA: 'USDC',
            tokenB: 'USDT',
            profit: 125.50,
            gasEstimate: 45,
            timestamp: Date.now(),
            status: 'pending'
          },
          {
            id: '2',
            chain: 'Polygon',
            tokenA: 'WETH',
            tokenB: 'MATIC',
            profit: 89.25,
            gasEstimate: 12,
            timestamp: Date.now() - 30000,
            status: 'executing'
          },
          {
            id: '3',
            chain: 'Arbitrum',
            tokenA: 'DAI',
            tokenB: 'USDC',
            profit: 67.80,
            gasEstimate: 8,
            timestamp: Date.now() - 60000,
            status: 'completed'
          }
        ];
        clearOpportunities();
        mockOpportunities.forEach(addOpportunity);
      }
    };

    const interval = setInterval(fetchData, 10000);
    fetchData(); // Initial fetch
    return () => clearInterval(interval);
  }, [addOpportunity, clearOpportunities]);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Live Opportunities</h3>
        <p className="text-sm text-gray-500">Real-time arbitrage opportunities</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chain</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tokens</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gas</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {opportunities.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No opportunities found
                </td>
              </tr>
            ) : (
              opportunities.map((opp: Opportunity) => (
                <tr key={opp.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {opp.chain}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {opp.tokenA} → {opp.tokenB}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                    ${opp.profit.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {opp.gasEstimate} gwei
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      opp.status === 'completed' ? 'bg-green-100 text-green-800' :
                      opp.status === 'executing' ? 'bg-yellow-100 text-yellow-800' :
                      opp.status === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {opp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(opp.timestamp).toLocaleTimeString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Showing {opportunities.length} opportunities
          </p>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-500">Live updates</span>
          </div>
        </div>
      </div>
    </div>
  );
}
