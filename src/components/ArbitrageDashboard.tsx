import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useArbitrageData } from '@/hooks/useArbitrageData';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Target,
  Zap,
  AlertCircle,
  RefreshCw,
  Eye,
  PlayCircle,
  CheckCircle,
  XCircle,
  Clock,
  Network,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export const ArbitrageDashboard: React.FC = () => {
  const { toast } = useToast();
  const [executingOpportunity, setExecutingOpportunity] = useState<string | null>(null);
  
  const {
    dashboardData,
    opportunities,
    portfolio,
    recentExecutions,
    networks,
    alerts,
    isLoading,
    hasError,
    isConnected,
    executeOpportunity,
    refreshAllData
  } = useArbitrageData();

  // Handle opportunity execution
  const handleExecuteOpportunity = async (opportunityId: string, amount: number) => {
    try {
      setExecutingOpportunity(opportunityId);
      
      await executeOpportunity(opportunityId, amount);
      
      toast({
        title: "✅ Execution Started",
        description: `Arbitrage opportunity execution initiated with $${amount.toLocaleString()}`,
      });
    } catch (error: any) {
      toast({
        title: "❌ Execution Failed",
        description: error.message || "Failed to execute arbitrage opportunity",
        variant: "destructive",
      });
    } finally {
      setExecutingOpportunity(null);
    }
  };

  // Utility functions
  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  const formatPercentage = (percentage: number) => 
    `${percentage > 0 ? '+' : ''}${percentage.toFixed(2)}%`;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Activity className="h-4 w-4 text-green-500" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getChainColor = (chain: string) => {
    const colors: Record<string, string> = {
      'ethereum': 'bg-blue-500',
      'bsc': 'bg-yellow-500',
      'polygon': 'bg-purple-500',
      'arbitrum': 'bg-blue-600',
      'optimism': 'bg-red-500',
      'avalanche': 'bg-red-600',
      'fantom': 'bg-blue-400',
      'base': 'bg-blue-700',
    };
    return colors[chain.toLowerCase()] || 'bg-gray-500';
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-32" />
              </CardHeader>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...Array(3)].map((_, j) => (
                    <Skeleton key={j} className="h-16 w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (hasError) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load arbitrage data. Please check your connection and try again.
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-4"
              onClick={refreshAllData}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">ArbitrageX Supreme</h1>
          <p className="text-muted-foreground">Real-time arbitrage opportunities across DeFi</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant={isConnected ? "default" : "destructive"}>
            <div className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            {isConnected ? 'Connected' : 'Disconnected'}
          </Badge>
          <Button onClick={refreshAllData} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(dashboardData?.portfolio_value || portfolio?.total_balance_usd || 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              {formatPercentage(dashboardData?.portfolio_change_24h || 0)} from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">24h Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(dashboardData?.total_profit_24h || 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              {dashboardData?.total_executions_24h || 0} opportunities executed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Opportunities</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{opportunities.length}</div>
            <p className="text-xs text-muted-foreground">
              Avg. profit: {formatPercentage(opportunities.reduce((acc, opp) => acc + opp.profit_percentage, 0) / opportunities.length || 0)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData?.success_rate_24h || 92}%</div>
            <p className="text-xs text-muted-foreground">
              Last 100 executions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Arbitrage Opportunities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Top Arbitrage Opportunities
            </CardTitle>
            <CardDescription>
              Live opportunities with highest profit potential
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {opportunities.slice(0, 5).map((opportunity) => (
                <div key={opportunity.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {opportunity.asset_pair}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {opportunity.source_exchange} → {opportunity.target_exchange || 'Multi-step'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${getChainColor(opportunity.source_chain.name)}`} />
                        {opportunity.source_chain.name}
                      </span>
                      <ArrowUpRight className="h-3 w-3" />
                      <span className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${getChainColor(opportunity.target_chain?.name || 'unknown')}`} />
                        {opportunity.target_chain?.name || 'Multi-chain'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="font-bold text-green-600">
                      {formatCurrency(opportunity.profit_usd)}
                    </div>
                    <div className="text-sm text-green-600">
                      {formatPercentage(opportunity.profit_percentage)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Risk: {opportunity.risk_score}/100
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleExecuteOpportunity(opportunity.id, opportunity.max_amount_usd / 10)}
                    disabled={executingOpportunity === opportunity.id}
                    className="ml-2"
                  >
                    {executingOpportunity === opportunity.id ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <PlayCircle className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              ))}
              
              {opportunities.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No active opportunities found</p>
                  <p className="text-sm">Check back in a few moments</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Executions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Executions
            </CardTitle>
            <CardDescription>
              Latest arbitrage execution results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentExecutions.slice(0, 5).map((execution) => (
                <div key={execution.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(execution.status)}
                      <span className="font-medium">
                        {formatCurrency(execution.amount_usd)}
                      </span>
                      <Badge variant={execution.status === 'completed' ? 'default' : 'secondary'}>
                        {execution.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(execution.started_at).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${execution.actual_profit_usd >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {execution.actual_profit_usd >= 0 ? '+' : ''}{formatCurrency(execution.actual_profit_usd)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Gas: {formatCurrency(execution.gas_fee_usd)}
                    </div>
                  </div>
                </div>
              ))}
              
              {recentExecutions.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No recent executions</p>
                  <p className="text-sm">Execute your first opportunity to see results here</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Chains */}
      {dashboardData?.top_performing_chains && dashboardData.top_performing_chains.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5" />
              Top Performing Chains (24h)
            </CardTitle>
            <CardDescription>
              Blockchain networks with highest arbitrage activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {dashboardData.top_performing_chains.map((chain) => (
                <div key={chain.chain} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${getChainColor(chain.chain)}`} />
                    <span className="font-medium">{chain.chain}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">
                      Executions: {chain.executions_24h}
                    </div>
                    <div className="text-sm font-medium text-green-600">
                      Profit: {formatCurrency(chain.profit_24h)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Success: {chain.success_rate}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Alerts */}
      {alerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.slice(0, 3).map((alert) => (
                <Alert key={alert.id}>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="flex items-center justify-between">
                      <span>{alert.message}</span>
                      <Badge variant="outline" className="text-xs">
                        {alert.type}
                      </Badge>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};