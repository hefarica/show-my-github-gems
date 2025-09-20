# ArbitrageX Supreme V3.0 - Secrets Management Matrix
# Paquete Operativo Completo - Variables de Entorno y Secretos

## 🔐 BACKEND SECRETS (Contabo VPS)

### **Archivo: .env.production**
```bash
# Database Configuration
DATABASE_URL=postgresql://arbitragex_user:${POSTGRES_PASSWORD}@localhost:5432/arbitragex_prod
POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
POSTGRES_USER=arbitragex_user
POSTGRES_DB=arbitragex_prod

# Redis Configuration
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=${REDIS_PASSWORD}

# Blockchain RPC URLs
ETHEREUM_RPC_URL=${ETHEREUM_RPC_URL}
POLYGON_RPC_URL=${POLYGON_RPC_URL}
BSC_RPC_URL=${BSC_RPC_URL}
ARBITRUM_RPC_URL=${ARBITRUM_RPC_URL}
OPTIMISM_RPC_URL=${OPTIMISM_RPC_URL}

# MEV Relay Configuration
FLASHBOTS_RELAY_URL=https://relay.flashbots.net
FLASHBOTS_PRIVATE_KEY=${FLASHBOTS_PRIVATE_KEY}
EDEN_RELAY_URL=https://api.edennetwork.io/v1/bundle
EDEN_API_KEY=${EDEN_API_KEY}

# Authentication & Security
JWT_SECRET=${JWT_SECRET}
API_KEY=${API_KEY}
ENCRYPTION_KEY=${ENCRYPTION_KEY}

# External APIs
DEXSCREENER_API_KEY=${DEXSCREENER_API_KEY}
COINGECKO_API_KEY=${COINGECKO_API_KEY}
ETHERSCAN_API_KEY=${ETHERSCAN_API_KEY}
POLYGONSCAN_API_KEY=${POLYGONSCAN_API_KEY}

# Monitoring & Logging
PROMETHEUS_PORT=9090
GRAFANA_ADMIN_PASSWORD=${GRAFANA_ADMIN_PASSWORD}
LOG_LEVEL=info
SENTRY_DSN=${SENTRY_DSN}

# Rate Limiting
RATE_LIMIT_REQUESTS_PER_MINUTE=1000
RATE_LIMIT_BURST=100

# CORS Configuration
CORS_ORIGINS=https://arbitragex.app,https://staging.arbitragex.app

# Feature Flags
ENABLE_MEV_PROTECTION=true
ENABLE_FLASHLOAN_ARBITRAGE=true
ENABLE_CROSS_CHAIN=true
ENABLE_ANALYTICS=true

# Performance Tuning
MAX_CONCURRENT_REQUESTS=1000
CONNECTION_POOL_SIZE=20
QUERY_TIMEOUT_MS=5000
```

### **GitHub Secrets (Backend Repository)**
```
POSTGRES_PASSWORD=<strong-random-password>
REDIS_PASSWORD=<strong-random-password>
ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/<infura-key>
POLYGON_RPC_URL=https://polygon-mainnet.infura.io/v3/<infura-key>
BSC_RPC_URL=https://bsc-dataseed.binance.org/
ARBITRUM_RPC_URL=https://arb1.arbitrum.io/rpc
OPTIMISM_RPC_URL=https://mainnet.optimism.io
FLASHBOTS_PRIVATE_KEY=<flashbots-private-key>
EDEN_API_KEY=<eden-api-key>
JWT_SECRET=<256-bit-random-key>
API_KEY=<api-key-for-frontend>
ENCRYPTION_KEY=<256-bit-encryption-key>
DEXSCREENER_API_KEY=<dexscreener-api-key>
COINGECKO_API_KEY=<coingecko-api-key>
ETHERSCAN_API_KEY=<etherscan-api-key>
POLYGONSCAN_API_KEY=<polygonscan-api-key>
GRAFANA_ADMIN_PASSWORD=<grafana-admin-password>
SENTRY_DSN=<sentry-dsn>
STAGING_HOST=<staging-server-ip>
PRODUCTION_HOST=<production-server-ip>
DEPLOY_USER=arbitragex
DEPLOY_SSH_KEY=<ssh-private-key>
GITHUB_TOKEN=<github-token>
SLACK_WEBHOOK=<slack-webhook-url>
```

---

## ⚡ EDGE SECRETS (Cloudflare Workers)

### **Archivo: wrangler.toml - Variables**
```toml
[env.production.vars]
BACKEND_URL = "https://api.arbitragex.dev"
FRONTEND_URL = "https://arbitragex.app"
RATE_LIMIT_REQUESTS_PER_MINUTE = "1000"
CACHE_TTL_SECONDS = "300"
ENABLE_ANALYTICS = "true"
LOG_LEVEL = "info"
CORS_ORIGINS = "https://arbitragex.app"
```

### **Cloudflare Secrets (wrangler secret)**
```bash
# Authentication
wrangler secret put JWT_SECRET --env production
wrangler secret put API_KEY --env production
wrangler secret put BACKEND_API_KEY --env production

# External APIs
wrangler secret put DEXSCREENER_API_KEY --env production
wrangler secret put COINGECKO_API_KEY --env production

# Monitoring
wrangler secret put SENTRY_DSN --env production
wrangler secret put DATADOG_API_KEY --env production

# Webhooks
wrangler secret put SLACK_WEBHOOK --env production
wrangler secret put DISCORD_WEBHOOK --env production
```

### **GitHub Secrets (Edge Repository)**
```
CLOUDFLARE_API_TOKEN=<cloudflare-api-token>
CLOUDFLARE_ACCOUNT_ID=<cloudflare-account-id>
CLOUDFLARE_ZONE_ID=<cloudflare-zone-id>
JWT_SECRET=<same-as-backend>
API_KEY=<same-as-backend>
BACKEND_API_KEY=<backend-api-key>
DEXSCREENER_API_KEY=<dexscreener-api-key>
COINGECKO_API_KEY=<coingecko-api-key>
SENTRY_DSN=<sentry-dsn>
DATADOG_API_KEY=<datadog-api-key>
SLACK_WEBHOOK=<slack-webhook-url>
DISCORD_WEBHOOK=<discord-webhook-url>
GRAFANA_API_KEY=<grafana-api-key>
GRAFANA_URL=<grafana-url>
```

---

## 🎨 FRONTEND SECRETS (Lovable/Cloudflare Pages)

### **Archivo: .env.production**
```bash
# API Configuration
VITE_API_BASE_URL=https://api.arbitragex.dev
VITE_EDGE_URL=https://arbitragex.workers.dev
VITE_WS_URL=wss://arbitragex.workers.dev/ws

# Authentication
VITE_API_KEY=${VITE_API_KEY}

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_STREAMING=true

# Monitoring
VITE_SENTRY_DSN=${VITE_SENTRY_DSN}
VITE_DATADOG_CLIENT_TOKEN=${VITE_DATADOG_CLIENT_TOKEN}
VITE_DATADOG_APPLICATION_ID=${VITE_DATADOG_APPLICATION_ID}

# Performance
VITE_VIRTUAL_SCROLL_ENABLED=true
VITE_MAX_OPPORTUNITIES_DISPLAY=1000
VITE_WEBSOCKET_RECONNECT_ATTEMPTS=5

# Environment
VITE_ENVIRONMENT=production
VITE_VERSION=${GITHUB_SHA}
```

### **GitHub Secrets (Frontend Repository)**
```
VITE_API_KEY=<api-key-for-frontend>
VITE_SENTRY_DSN=<sentry-dsn-frontend>
VITE_DATADOG_CLIENT_TOKEN=<datadog-client-token>
VITE_DATADOG_APPLICATION_ID=<datadog-app-id>
CLOUDFLARE_API_TOKEN=<cloudflare-api-token>
CLOUDFLARE_ACCOUNT_ID=<cloudflare-account-id>
WPT_API_KEY=<webpagetest-api-key>
CODECOV_TOKEN=<codecov-token>
SLACK_WEBHOOK=<slack-webhook-url>
```

---

## 🔒 SECURITY BEST PRACTICES

### **1. Secrets Rotation Schedule**
```bash
# Monthly rotation (High Security)
- JWT_SECRET
- API_KEY
- ENCRYPTION_KEY
- Database passwords

# Quarterly rotation (Medium Security)
- External API keys
- Monitoring tokens

# Annual rotation (Low Security)
- SSH keys
- Service account tokens
```

### **2. Access Control Matrix**
```
SECRET_NAME                 | BACKEND | EDGE | FRONTEND | ROTATION
---------------------------|---------|------|----------|----------
DATABASE_URL               |    ✅   |  ❌  |    ❌    | Monthly
REDIS_PASSWORD             |    ✅   |  ❌  |    ❌    | Monthly
JWT_SECRET                 |    ✅   |  ✅  |    ❌    | Monthly
API_KEY                    |    ✅   |  ✅  |    ✅    | Monthly
ETHEREUM_RPC_URL           |    ✅   |  ❌  |    ❌    | Quarterly
FLASHBOTS_PRIVATE_KEY      |    ✅   |  ❌  |    ❌    | Monthly
SENTRY_DSN                 |    ✅   |  ✅  |    ✅    | Annual
CLOUDFLARE_API_TOKEN       |    ❌   |  ✅  |    ✅    | Quarterly
```

### **3. Environment Validation Script**
```bash
#!/bin/bash
# validate-secrets.sh - Validar que todos los secretos estén configurados

echo "🔍 Validating ArbitrageX Secrets Configuration..."

# Backend Secrets
check_secret() {
    if [ -z "${!1}" ]; then
        echo "❌ Missing secret: $1"
        exit 1
    else
        echo "✅ $1 configured"
    fi
}

# Critical secrets validation
check_secret "DATABASE_URL"
check_secret "JWT_SECRET"
check_secret "API_KEY"
check_secret "ETHEREUM_RPC_URL"
check_secret "FLASHBOTS_PRIVATE_KEY"

echo "✅ All critical secrets validated successfully!"
```

### **4. Secrets Management Commands**

#### **Backend (Docker Compose)**
```bash
# Load secrets from .env file
docker-compose --env-file .env.production up -d

# Validate secrets
./scripts/validate-secrets.sh

# Rotate JWT secret
./scripts/rotate-jwt-secret.sh
```

#### **Edge (Cloudflare Workers)**
```bash
# Set production secrets
wrangler secret put JWT_SECRET --env production
wrangler secret put API_KEY --env production
wrangler secret put BACKEND_API_KEY --env production

# List configured secrets
wrangler secret list --env production

# Delete old secrets
wrangler secret delete OLD_SECRET_NAME --env production
```

#### **Frontend (Cloudflare Pages)**
```bash
# Set environment variables
wrangler pages secret put VITE_API_KEY --project-name=arbitragex-app
wrangler pages secret put VITE_SENTRY_DSN --project-name=arbitragex-app

# Deploy with secrets
wrangler pages deploy dist --project-name=arbitragex-app --env=production
```

---

## 📋 DEPLOYMENT CHECKLIST

### **Pre-Deployment**
- [ ] All secrets configured in GitHub repositories
- [ ] Environment files created for each service
- [ ] Secrets validation scripts executed
- [ ] Access control matrix verified
- [ ] Rotation schedule documented

### **Post-Deployment**
- [ ] Health checks passing with real secrets
- [ ] API connections validated
- [ ] Database connections confirmed
- [ ] External API integrations tested
- [ ] Monitoring and logging active
- [ ] Error tracking configured

### **Security Validation**
- [ ] No secrets in code or logs
- [ ] All connections use TLS/SSL
- [ ] Rate limiting active
- [ ] CORS properly configured
- [ ] Authentication working end-to-end
- [ ] Audit logging enabled

---

## 🚨 EMERGENCY PROCEDURES

### **Secrets Compromise Response**
1. **Immediate**: Rotate compromised secret
2. **Within 1 hour**: Update all affected services
3. **Within 4 hours**: Full security audit
4. **Within 24 hours**: Incident report and lessons learned

### **Service Recovery**
```bash
# Emergency secret rotation
./scripts/emergency-rotate-all-secrets.sh

# Service restart with new secrets
docker-compose down && docker-compose up -d

# Verify all services healthy
./scripts/health-check-all-services.sh
```
