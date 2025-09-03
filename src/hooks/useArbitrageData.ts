import { useState, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { arbitrageApi } from '@/services/api';
import type {
  ArbitrageOpportunity,
  DashboardSummary,
  ArbitrageExecution,
  Portfolio,
  BlockchainNetwork,
  Alert
} from '@/types/arbitrage';

// Custom hook for real-time arbitrage data
export const useArbitrageData = () => {
  const queryClient = useQueryClient();
  const [isConnected, setIsConnected] = useState(false);

  // Dashboard Summary Query
  const {
    data: dashboardData,
    isLoading: isDashboardLoading,
    error: dashboardError,
    refetch: refetchDashboard
  } = useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: () => arbitrageApi.getDashboardSummary(),
    refetchInterval: 30000, // Refresh every 30 seconds
    retry: 3,
  });

  // Arbitrage Opportunities Query
  const {
    data: opportunities = [],
    isLoading: isOpportunitiesLoading,
    error: opportunitiesError,
    refetch: refetchOpportunities
  } = useQuery({
    queryKey: ['arbitrage-opportunities'],
    queryFn: () => arbitrageApi.getOpportunities({ limit: 20 }),
    refetchInterval: 10000, // Refresh every 10 seconds for live data
    retry: 3,
  });

  // Portfolio Query
  const {
    data: portfolio,
    isLoading: isPortfolioLoading,
    error: portfolioError,
    refetch: refetchPortfolio
  } = useQuery({
    queryKey: ['portfolio'],
    queryFn: () => arbitrageApi.getPortfolio(),
    refetchInterval: 30000,
    retry: 3,
  });

  // Recent Executions Query
  const {
    data: recentExecutions = [],
    isLoading: isExecutionsLoading,
    error: executionsError,
    refetch: refetchExecutions
  } = useQuery({
    queryKey: ['recent-executions'],
    queryFn: () => arbitrageApi.getExecutions(),
    refetchInterval: 15000,
    retry: 3,
  });

  // Networks Query
  const {
    data: networks = [],
    isLoading: isNetworksLoading,
    error: networksError
  } = useQuery({
    queryKey: ['blockchain-networks'],
    queryFn: () => arbitrageApi.getNetworks(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });

  // Alerts Query
  const {
    data: alerts = [],
    isLoading: isAlertsLoading,
    error: alertsError,
    refetch: refetchAlerts
  } = useQuery({
    queryKey: ['alerts'],
    queryFn: () => arbitrageApi.getAlerts(),
    refetchInterval: 60000, // Refresh every minute
    retry: 3,
  });

  // Execute Arbitrage Opportunity
  const executeOpportunity = useCallback(async (opportunityId: string, amount: number) => {
    try {
      const execution = await arbitrageApi.executeOpportunity(opportunityId, amount);
      
      // Refresh related data
      queryClient.invalidateQueries({ queryKey: ['arbitrage-opportunities'] });
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
      queryClient.invalidateQueries({ queryKey: ['recent-executions'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-summary'] });
      
      return execution;
    } catch (error) {
      console.error('Failed to execute opportunity:', error);
      throw error;
    }
  }, [queryClient]);

  // WebSocket Connection Effect
  useEffect(() => {
    // Connect to WebSocket for real-time updates
    arbitrageApi.connectWebSocket();
    setIsConnected(true);

    // Listen for real-time events
    const handleOpportunityUpdate = (event: CustomEvent) => {
      queryClient.setQueryData(['arbitrage-opportunities'], (oldData: ArbitrageOpportunity[] = []) => {
        const newOpportunity = event.detail;
        const existingIndex = oldData.findIndex(opp => opp.id === newOpportunity.id);
        
        if (existingIndex >= 0) {
          // Update existing opportunity
          const newData = [...oldData];
          newData[existingIndex] = newOpportunity;
          return newData;
        } else {
          // Add new opportunity
          return [newOpportunity, ...oldData].slice(0, 20); // Keep only top 20
        }
      });
    };

    const handlePortfolioUpdate = (event: CustomEvent) => {
      queryClient.setQueryData(['portfolio'], event.detail);
      queryClient.invalidateQueries({ queryKey: ['dashboard-summary'] });
    };

    const handleExecutionUpdate = (event: CustomEvent) => {
      queryClient.invalidateQueries({ queryKey: ['recent-executions'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-summary'] });
    };

    const handleAlertUpdate = (event: CustomEvent) => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    };

    // Add event listeners
    window.addEventListener('arbitrage:opportunity', handleOpportunityUpdate as EventListener);
    window.addEventListener('arbitrage:portfolio_update', handlePortfolioUpdate as EventListener);
    window.addEventListener('arbitrage:execution', handleExecutionUpdate as EventListener);
    window.addEventListener('arbitrage:alert', handleAlertUpdate as EventListener);

    // Cleanup
    return () => {
      arbitrageApi.disconnectWebSocket();
      setIsConnected(false);
      window.removeEventListener('arbitrage:opportunity', handleOpportunityUpdate as EventListener);
      window.removeEventListener('arbitrage:portfolio_update', handlePortfolioUpdate as EventListener);
      window.removeEventListener('arbitrage:execution', handleExecutionUpdate as EventListener);
      window.removeEventListener('arbitrage:alert', handleAlertUpdate as EventListener);
    };
  }, [queryClient]);

  // Manual refresh function
  const refreshAllData = useCallback(() => {
    refetchDashboard();
    refetchOpportunities();
    refetchPortfolio();
    refetchExecutions();
    refetchAlerts();
  }, [refetchDashboard, refetchOpportunities, refetchPortfolio, refetchExecutions, refetchAlerts]);

  // Compute loading states
  const isLoading = isDashboardLoading || isOpportunitiesLoading || isPortfolioLoading;
  const hasError = dashboardError || opportunitiesError || portfolioError || executionsError || networksError || alertsError;

  return {
    // Data
    dashboardData,
    opportunities,
    portfolio,
    recentExecutions,
    networks,
    alerts,
    
    // Loading states
    isLoading,
    isDashboardLoading,
    isOpportunitiesLoading,
    isPortfolioLoading,
    isExecutionsLoading,
    isNetworksLoading,
    isAlertsLoading,
    
    // Error states
    hasError,
    dashboardError,
    opportunitiesError,
    portfolioError,
    executionsError,
    networksError,
    alertsError,
    
    // Connection state
    isConnected,
    
    // Actions
    executeOpportunity,
    refreshAllData,
    
    // Individual refresh functions
    refetchDashboard,
    refetchOpportunities,
    refetchPortfolio,
    refetchExecutions,
    refetchAlerts,
  };
};