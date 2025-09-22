// ArbitrageX Supreme V3.3 (RLI) - Configuración global
// Configuración para la conexión con las APIs y comportamiento de la aplicación

// URL Base para APIs (Cloudflare Workers)
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.arbitragex.io';

// URL Base para WebSockets
export const WS_BASE_URL = process.env.REACT_APP_WS_BASE_URL || 'wss://ws.arbitragex.io';

// Configuración de timeouts y reintentos
export const API_CONFIG = {
  // Timeout para peticiones API en milisegundos
  timeout: 30000,
  // Número de reintentos para peticiones fallidas
  retries: 3,
  // Espera entre reintentos (ms)
  retryDelay: 1000,
  // Tiempo de caché para datos estáticos (ms)
  staticCacheTTL: 3600000, // 1 hora
  // Tiempo de caché para datos dinámicos (ms)
  dynamicCacheTTL: 60000, // 1 minuto
};

// Configuración de WebSocket
export const WS_CONFIG = {
  // Intervalo de heartbeat para WebSocket (ms)
  heartbeatInterval: 30000,
  // Timeout para reconexión de WebSocket (ms)
  reconnectTimeout: 5000,
  // Máximo número de reconexiones
  maxReconnects: 5,
};

// Configuración para actualización de datos en tiempo real
export const REALTIME_CONFIG = {
  // Intervalo de actualización para oportunidades (ms)
  opportunitiesUpdateInterval: 5000,
  // Intervalo de actualización para precios (ms)
  pricesUpdateInterval: 10000,
  // Intervalo de actualización para métricas del sistema (ms)
  metricsUpdateInterval: 15000,
};

// Configuración para autenticación
export const AUTH_CONFIG = {
  // Nombre del token en localStorage
  tokenName: 'arbitragex_auth_token',
  // Duración del token (ms)
  tokenExpiry: 86400000, // 24 horas
  // Endpoint para autenticación
  authEndpoint: '/api/auth',
};

// Lista de blockchains principales a monitorear por defecto
export const DEFAULT_MONITORED_CHAINS = [
  { id: 1, name: 'Ethereum' },
  { id: 42161, name: 'Arbitrum' },
  { id: 137, name: 'Polygon' },
  { id: 10, name: 'Optimism' },
  { id: 56, name: 'BNB Chain' },
];

// Nuevas configuraciones V3.3 (RLI) - Anti-Rug
export const SECURITY_CONFIG = {
  // Nivel mínimo de seguridad recomendado para tokens
  minSecurityScore: 70,
  // Intervalo de refresco para análisis de seguridad (ms)
  securityRefreshInterval: 3600000, // 1 hora
  // Umbral para blacklist automática
  blacklistThreshold: 30,
};

// Nuevas configuraciones V3.3 (RLI) - Liquidez
export const LIQUIDITY_CONFIG = {
  // Slippage máximo aceptable para operaciones (%)
  maxAcceptableSlippage: 1.0,
  // Profundidad mínima de liquidez ($)
  minLiquidityDepth: 100000,
  // Puntuación mínima de distribución de liquidez
  minDistributionScore: 70,
};

// Nuevas configuraciones V3.3 (RLI) - Oráculos
export const ORACLE_CONFIG = {
  // Desviación máxima aceptable entre DEX y oráculo (%)
  maxPriceDeviation: 2.0,
  // Puntuación mínima de confianza para precios
  minConfidenceScore: 80,
  // Fuentes de precios preferidas
  preferredSources: ['Chainlink', 'UniswapV3TWAP'],
};

// Configuración para cálculo de EV (Expected Value)
export const EV_CONFIG = {
  // Factor de riesgo para operaciones con baja puntuación de seguridad
  securityRiskFactor: 1.5,
  // Factor de riesgo para operaciones con baja liquidez
  liquidityRiskFactor: 1.3,
  // Factor de riesgo para precios con baja confianza
  priceRiskFactor: 1.2,
  // Ratio mínimo riesgo/recompensa para operaciones recomendadas
  minRiskRewardRatio: 2.0,
};

// Feature flags para funcionalidades
export const FEATURES = {
  // Nuevas funcionalidades V3.3 (RLI)
  enableAntiRugSystem: true,
  enableLiquidityAnalysis: true,
  enableOraclePricing: true,
  enableEVCalculation: true,
  // Funcionalidades experimentales
  enableSimulations: false,
  enableAutoExecution: false,
};

// Tema y colores para la aplicación
export const THEME_COLORS = {
  primary: '#3f51b5',
  secondary: '#f50057',
  background: {
    light: '#f5f5f5',
    dark: '#121212',
  },
  text: {
    light: '#212121',
    dark: '#ffffff',
  },
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
  info: '#2196f3',
};
