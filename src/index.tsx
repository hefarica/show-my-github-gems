import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'
import { Dashboard } from './components/Dashboard'
import { StrategiesView } from './components/StrategiesView'
import { BlockchainsView } from './components/BlockchainsView'
import { ConfigurationView } from './components/ConfigurationView'
import { AlertsView } from './components/AlertsView'
import { AnalyticsView } from './components/AnalyticsView'

const app = new Hono()

// Enable CORS for API calls
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Apply JSX renderer to all routes
app.use(renderer)

// Main Dashboard Route
app.get('/', (c) => {
  return c.render(<Dashboard />)
})

// Strategies Management
app.get('/strategies', (c) => {
  return c.render(<StrategiesView />)
})

// Blockchains Management
app.get('/blockchains', (c) => {
  return c.render(<BlockchainsView />)
})

// Configuration Management
app.get('/configuration', (c) => {
  return c.render(<ConfigurationView />)
})

// Alerts Management
app.get('/alerts', (c) => {
  return c.render(<AlertsView />)
})

// Analytics View
app.get('/analytics', (c) => {
  return c.render(<AnalyticsView />)
})

// API Routes for real-time data
app.get('/api/system/status', async (c) => {
  // Mock data - in production this would connect to your backend
  return c.json({
    status: 'active',
    uptime: '99.97%',
    totalProfit: '$45,789.23',
    activeStrategies: 8,
    connectedBlockchains: 12
  })
})

app.get('/api/arbitrage/opportunities', async (c) => {
  // Mock arbitrage opportunities data
  return c.json({
    opportunities: [
      {
        id: 1,
        tokenPair: 'ETH/USDC',
        profit: '$234.56',
        percentage: '2.34%',
        blockchain: 'Ethereum',
        dex1: 'Uniswap V3',
        dex2: 'SushiSwap',
        status: 'active'
      },
      {
        id: 2,
        tokenPair: 'BTC/USDT',
        profit: '$567.89',
        percentage: '1.87%',
        blockchain: 'Polygon',
        dex1: 'QuickSwap',
        dex2: '1inch',
        status: 'pending'
      }
    ]
  })
})

app.get('/api/strategies/performance', async (c) => {
  return c.json({
    strategies: [
      {
        name: 'Triangle Arbitrage',
        profit: '$12,345.67',
        trades: 245,
        successRate: '94.5%',
        status: 'active'
      },
      {
        name: 'Flash Loan Arbitrage',
        profit: '$8,976.54',
        trades: 189,
        successRate: '91.2%',
        status: 'active'
      },
      {
        name: 'MEV Bundling',
        profit: '$15,432.10',
        trades: 298,
        successRate: '96.8%',
        status: 'active'
      }
    ]
  })
})

app.get('/api/blockchains/status', async (c) => {
  return c.json({
    blockchains: [
      { name: 'Ethereum', status: 'connected', latency: '45ms', gasPrice: '25 gwei' },
      { name: 'Polygon', status: 'connected', latency: '32ms', gasPrice: '30 gwei' },
      { name: 'BSC', status: 'connected', latency: '28ms', gasPrice: '3 gwei' },
      { name: 'Arbitrum', status: 'connected', latency: '21ms', gasPrice: '0.1 gwei' },
      { name: 'Optimism', status: 'connected', latency: '26ms', gasPrice: '0.001 gwei' },
      { name: 'Avalanche', status: 'connected', latency: '18ms', gasPrice: '25 nAVAX' },
      { name: 'Fantom', status: 'connected', latency: '22ms', gasPrice: '100 gwei' },
      { name: 'Base', status: 'connected', latency: '24ms', gasPrice: '0.001 gwei' },
      { name: 'Solana', status: 'connected', latency: '15ms', gasPrice: '0.00001 SOL' },
      { name: 'NEAR', status: 'connected', latency: '19ms', gasPrice: '0.0001 NEAR' },
      { name: 'Cardano', status: 'connected', latency: '35ms', gasPrice: '0.17 ADA' },
      { name: 'Cosmos', status: 'connected', latency: '29ms', gasPrice: '0.0025 ATOM' }
    ]
  })
})

export default app