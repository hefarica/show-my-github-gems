import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  DollarSign, 
  Activity,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Wallet
} from "lucide-react";
import { DashboardSummary, ArbitrageOpportunity, ArbitrageExecution } from "@/types/arbitrage";
import { arbitrageApi } from "@/services/api";

// Real-time data with loading states
const initialDashboardData: DashboardSummary = {
  active_opportunities: 0,
  total_profit_24h: 0,
  total_executions_24h: 0,
  success_rate_24h: 0,
  portfolio_value: 0,
  portfolio_change_24h: 0,
  top_performing_chains: [],
  recent_executions: [],
  alerts_count: 0
};


export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardSummary>(initialDashboardData);
  const [opportunities, setOpportunities] = useState<ArbitrageOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load dashboard data from API
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const [summary, opportunitiesList] = await Promise.all([
          arbitrageApi.getDashboardSummary(),
          arbitrageApi.getOpportunities({ limit: 10, sort_by: 'profit_percentage', sort_order: 'desc' })
        ]);
        
        setDashboardData(summary);
        setOpportunities(opportunitiesList);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Using demo data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();

    // Connect to WebSocket for real-time updates
    arbitrageApi.connectWebSocket();

    // Listen for real-time updates
    const handleOpportunityUpdate = (event: CustomEvent) => {
      setOpportunities(prev => {
        const newOpp = event.detail;
        const existing = prev.findIndex(opp => opp.id === newOpp.id);
        if (existing >= 0) {
          const updated = [...prev];
          updated[existing] = newOpp;
          return updated;
        }
        return [newOpp, ...prev.slice(0, 9)];
      });
    };

    const handlePortfolioUpdate = (event: CustomEvent) => {
      setDashboardData(prev => ({
        ...prev,
        ...event.detail
      }));
    };

    window.addEventListener('arbitrage:opportunity', handleOpportunityUpdate as EventListener);
    window.addEventListener('arbitrage:portfolio_update', handlePortfolioUpdate as EventListener);

    return () => {
      arbitrageApi.disconnectWebSocket();
      window.removeEventListener('arbitrage:opportunity', handleOpportunityUpdate as EventListener);
      window.removeEventListener('arbitrage:portfolio_update', handlePortfolioUpdate as EventListener);
    };
  }, [toast]);

  // Execute opportunity
  const handleExecuteOpportunity = async (opportunityId: string, amount: number = 1000) => {
    try {
      const execution = await arbitrageApi.executeOpportunity(opportunityId, amount);
      toast({
        title: "Execution Started",
        description: `Arbitrage execution initiated with ID: ${execution.id}`,
      });
      
      // Refresh opportunities after execution
      const updatedOpportunities = await arbitrageApi.getOpportunities({ limit: 10, sort_by: 'profit_percentage', sort_order: 'desc' });
      setOpportunities(updatedOpportunities);
    } catch (error) {
      console.error('Error executing opportunity:', error);
      toast({
        title: "Execution Failed",
        description: "Failed to execute arbitrage opportunity. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  const getChainColor = (chain: string) => {
    const colors: Record<string, string> = {
      'Ethereum': 'bg-ethereum',
      'Arbitrum': 'bg-arbitrum',
      'Polygon': 'bg-polygon',
      'BSC': 'bg-bsc',
      'Optimism': 'bg-optimism'
    };
    return colors[chain] || 'bg-muted';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">ArbitrageX Supreme Dashboard</h1>
          <p className="text-muted-foreground">Real-time arbitrage opportunities across 5 blockchains</p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${loading ? 'bg-warning animate-pulse' : 'bg-profit animate-pulse'}`}></div>
          <span className="text-sm text-muted-foreground">
            {loading ? 'Connecting...' : 'Live Feed Active'}
          </span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(dashboardData.portfolio_value)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {dashboardData.portfolio_change_24h >= 0 ? (
                <TrendingUp className="h-3 w-3 mr-1 text-profit" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1 text-loss" />
              )}
              {formatPercentage(dashboardData.portfolio_change_24h)} from yesterday
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">24h Profit</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-profit">{formatCurrency(dashboardData.total_profit_24h)}</div>
            <p className="text-xs text-muted-foreground">
              {dashboardData.total_executions_24h} executions completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Opportunities</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.active_opportunities}</div>
            <p className="text-xs text-muted-foreground">
              Scanning across 5 chains
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.success_rate_24h}%</div>
            <Progress value={dashboardData.success_rate_24h} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Top Opportunities */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Top Arbitrage Opportunities</CardTitle>
            <CardDescription>Real-time opportunities with highest profit potential</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {opportunities.map((opportunity) => (
              <div key={opportunity.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {opportunity.type.replace('_', ' ').toUpperCase()}
                      </Badge>
                      <span className="font-medium">{opportunity.asset_pair}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{opportunity.source_exchange}</span>
                      <ArrowUpRight className="h-3 w-3" />
                      <span>{opportunity.target_exchange || 'Multi-DEX'}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getChainColor(opportunity.source_chain.name)}`}></div>
                    <span className="text-sm">{opportunity.source_chain.name}</span>
                    {opportunity.target_chain && (
                      <>
                        <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
                        <div className={`w-2 h-2 rounded-full ${getChainColor(opportunity.target_chain.name)}`}></div>
                        <span className="text-sm">{opportunity.target_chain.name}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-lg font-bold text-profit">
                      {formatCurrency(opportunity.net_profit_usd)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {opportunity.profit_percentage.toFixed(2)}% profit
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant={opportunity.risk_score <= 2 ? "default" : opportunity.risk_score <= 4 ? "secondary" : "destructive"}>
                      Risk: {opportunity.risk_score}/5
                    </Badge>
                    <Button 
                      size="sm" 
                      className="bg-profit hover:bg-profit/90"
                      onClick={() => handleExecuteOpportunity(opportunity.id)}
                      disabled={loading}
                    >
                      <Zap className="h-3 w-3 mr-1" />
                      Execute
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chain Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardData.top_performing_chains.map((chain) => (
          <Card key={chain.chain}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{chain.chain}</CardTitle>
              <div className={`w-3 h-3 rounded-full ${getChainColor(chain.chain)}`}></div>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-profit">
                {formatCurrency(chain.profit_24h)}
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Executions:</span>
                  <span>{chain.executions_24h}</span>
                </div>
                <div className="flex justify-between">
                  <span>Success Rate:</span>
                  <span>{chain.success_rate}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Gas:</span>
                  <span>${chain.avg_gas_cost.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}