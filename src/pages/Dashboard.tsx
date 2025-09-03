import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";
import { DashboardSummary, ArbitrageOpportunity, ArbitrageExecution } from "@/types/arbitrage";

// Mock data for demonstration - Replace with real API calls
const mockDashboardData: DashboardSummary = {
  active_opportunities: 47,
  total_profit_24h: 15420.32,
  total_executions_24h: 23,
  success_rate_24h: 91.3,
  portfolio_value: 125000.00,
  portfolio_change_24h: 2.45,
  top_performing_chains: [
    { chain: "Ethereum", profit_24h: 5420.12, executions_24h: 8, success_rate: 87.5, avg_gas_cost: 45.32 },
    { chain: "Arbitrum", profit_24h: 4200.45, executions_24h: 7, success_rate: 100, avg_gas_cost: 2.15 },
    { chain: "Polygon", profit_24h: 3800.75, executions_24h: 5, success_rate: 80, avg_gas_cost: 0.05 },
    { chain: "BSC", profit_24h: 2000.00, executions_24h: 3, success_rate: 100, avg_gas_cost: 0.20 }
  ],
  recent_executions: [],
  alerts_count: 3
};

const mockOpportunities: ArbitrageOpportunity[] = [
  {
    id: "1",
    type: "cross_chain",
    profit_percentage: 2.45,
    profit_usd: 489.50,
    gas_cost_usd: 42.30,
    net_profit_usd: 447.20,
    asset_pair: "ETH/USDC",
    source_chain: { id: "1", name: "Ethereum", chain_id: 1 } as any,
    target_chain: { id: "42161", name: "Arbitrum", chain_id: 42161 } as any,
    source_exchange: "Uniswap V3",
    target_exchange: "SushiSwap",
    source_price: 2350.45,
    target_price: 2408.12,
    price_difference: 57.67,
    slippage_tolerance: 0.5,
    max_amount_usd: 20000,
    min_profit_threshold: 1.0,
    execution_time_estimate: 45,
    risk_score: 3,
    confidence_level: 0.92,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    status: "active",
    metadata: {}
  },
  {
    id: "2", 
    type: "triangular",
    profit_percentage: 1.87,
    profit_usd: 372.40,
    gas_cost_usd: 15.60,
    net_profit_usd: 356.80,
    asset_pair: "BTC/ETH/USDC",
    source_chain: { id: "137", name: "Polygon", chain_id: 137 } as any,
    source_exchange: "QuickSwap",
    source_price: 0.0,
    target_price: 0.0,
    price_difference: 0.0,
    slippage_tolerance: 0.3,
    max_amount_usd: 15000,
    min_profit_threshold: 1.0,
    execution_time_estimate: 30,
    risk_score: 2,
    confidence_level: 0.88,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    status: "active",
    metadata: {}
  }
];

const profitData = [
  { time: "00:00", profit: 1200 },
  { time: "04:00", profit: 2100 },
  { time: "08:00", profit: 3200 },
  { time: "12:00", profit: 4800 },
  { time: "16:00", profit: 6200 },
  { time: "20:00", profit: 7400 },
  { time: "24:00", profit: 8600 }
];

const chainData = [
  { name: "Ethereum", value: 35, profit: 5420 },
  { name: "Arbitrum", value: 25, profit: 4200 },
  { name: "Polygon", value: 20, profit: 3800 },
  { name: "BSC", value: 15, profit: 2000 },
  { name: "Optimism", value: 5, profit: 1000 }
];

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardSummary>(mockDashboardData);
  const [opportunities, setOpportunities] = useState<ArbitrageOpportunity[]>(mockOpportunities);

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
          <div className="w-3 h-3 rounded-full bg-profit animate-pulse"></div>
          <span className="text-sm text-muted-foreground">Live Feed Active</span>
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

      {/* Charts and Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profit Chart */}
        <Card>
          <CardHeader>
            <CardTitle>24h Profit Trend</CardTitle>
            <CardDescription>Cumulative profit over the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                profit: {
                  label: "Profit",
                  color: "hsl(var(--profit))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={profitData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="profit"
                    stroke="hsl(var(--profit))"
                    fill="hsl(var(--profit))"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Chain Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Chain Performance</CardTitle>
            <CardDescription>Profit distribution by blockchain</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                profit: {
                  label: "Profit",
                  color: "hsl(var(--primary))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chainData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="profit" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
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
                    <Button size="sm" className="bg-profit hover:bg-profit/90">
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