// src/services/connectionVerifier.ts
// Sistema de verificación de conexiones y credenciales
// Diagnostica exactamente qué falta en cada capa del sistema

export interface ConnectionStatus {
  service: string;
  status: 'connected' | 'disconnected' | 'error' | 'missing_credentials';
  endpoint?: string;
  error?: string;
  details?: string;
  timestamp: number;
}

export interface SystemHealth {
  backend: ConnectionStatus;
  edge: ConnectionStatus;
  websocket: ConnectionStatus;
  overall: 'healthy' | 'partial' | 'down';
  missingCredentials: string[];
  missingServices: string[];
}

class ConnectionVerifier {
  private readonly BACKEND_URL = 'http://localhost:8080';
  private readonly EDGE_URL = 'https://arbitragex.workers.dev';
  private readonly WS_URL = 'wss://arbitragex.workers.dev/ws';

  async verifyBackend(): Promise<ConnectionStatus> {
    const status: ConnectionStatus = {
      service: 'Backend (Contabo VPS)',
      status: 'disconnected',
      endpoint: `${this.BACKEND_URL}/health`,
      timestamp: Date.now()
    };

    try {
      console.log('🔍 Verificando Backend Rust en Contabo VPS...');
      
      const response = await fetch(`${this.BACKEND_URL}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(5000) // 5s timeout
      });

      if (response.ok) {
        const data = await response.json();
        status.status = 'connected';
        status.details = `Backend healthy: ${JSON.stringify(data)}`;
        console.log('✅ Backend conectado correctamente');
      } else {
        status.status = 'error';
        status.error = `HTTP ${response.status}: ${response.statusText}`;
        status.details = 'Backend responde pero con error';
        console.log(`❌ Backend error: ${status.error}`);
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        status.status = 'error';
        status.error = 'Timeout: Backend no responde en 5 segundos';
        status.details = 'Posibles causas: VPS apagado, firewall bloqueando, servicio no iniciado';
      } else if (error.message.includes('fetch')) {
        status.status = 'disconnected';
        status.error = 'No se puede conectar al Backend';
        status.details = 'Backend VPS no está accesible. Verificar: docker-compose up, puertos abiertos, IP correcta';
      } else {
        status.status = 'error';
        status.error = error.message;
        status.details = 'Error inesperado conectando al Backend';
      }
      console.log(`❌ Backend verification failed: ${status.error}`);
    }

    return status;
  }

  async verifyEdge(): Promise<ConnectionStatus> {
    const status: ConnectionStatus = {
      service: 'Edge Computing (Cloudflare Workers)',
      status: 'disconnected',
      endpoint: `${this.EDGE_URL}/api/opportunities`,
      timestamp: Date.now()
    };

    try {
      console.log('🔍 Verificando Edge Computing en Cloudflare Workers...');
      
      const response = await fetch(`${this.EDGE_URL}/api/opportunities`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-token' // Token de prueba
        },
        signal: AbortSignal.timeout(10000) // 10s timeout para Cloudflare
      });

      if (response.ok) {
        const data = await response.json();
        status.status = 'connected';
        status.details = `Edge Workers funcionando: ${data.length || 0} oportunidades`;
        console.log('✅ Edge Computing conectado correctamente');
      } else if (response.status === 401) {
        status.status = 'missing_credentials';
        status.error = 'JWT Token inválido o faltante';
        status.details = 'Edge Workers requiere autenticación JWT válida';
        console.log('🔑 Edge Computing requiere credenciales JWT');
      } else {
        status.status = 'error';
        status.error = `HTTP ${response.status}: ${response.statusText}`;
        status.details = 'Edge Workers responde pero con error';
        console.log(`❌ Edge Computing error: ${status.error}`);
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        status.status = 'error';
        status.error = 'Timeout: Edge Workers no responde en 10 segundos';
        status.details = 'Cloudflare Workers puede estar inactivo o con problemas';
      } else {
        status.status = 'disconnected';
        status.error = 'No se puede conectar a Edge Computing';
        status.details = 'Cloudflare Workers no desplegado o dominio incorrecto';
      }
      console.log(`❌ Edge verification failed: ${status.error}`);
    }

    return status;
  }

  async verifyWebSocket(): Promise<ConnectionStatus> {
    const status: ConnectionStatus = {
      service: 'WebSocket (Real-time)',
      status: 'disconnected',
      endpoint: this.WS_URL,
      timestamp: Date.now()
    };

    return new Promise((resolve) => {
      try {
        console.log('🔍 Verificando WebSocket para datos en tiempo real...');
        
        const ws = new WebSocket(this.WS_URL);
        const timeout = setTimeout(() => {
          ws.close();
          status.status = 'error';
          status.error = 'Timeout: WebSocket no conecta en 5 segundos';
          status.details = 'WebSocket endpoint no responde';
          console.log('❌ WebSocket timeout');
          resolve(status);
        }, 5000);

        ws.onopen = () => {
          clearTimeout(timeout);
          status.status = 'connected';
          status.details = 'WebSocket conectado para datos en tiempo real';
          console.log('✅ WebSocket conectado correctamente');
          ws.close();
          resolve(status);
        };

        ws.onerror = (error) => {
          clearTimeout(timeout);
          status.status = 'error';
          status.error = 'WebSocket connection error';
          status.details = 'Error conectando WebSocket para tiempo real';
          console.log('❌ WebSocket error:', error);
          resolve(status);
        };

        ws.onclose = (event) => {
          if (status.status === 'disconnected') {
            clearTimeout(timeout);
            status.status = 'disconnected';
            status.error = `WebSocket closed: ${event.code} ${event.reason}`;
            status.details = 'WebSocket no disponible';
            console.log('❌ WebSocket closed:', event.code, event.reason);
            resolve(status);
          }
        };
      } catch (error: any) {
        status.status = 'error';
        status.error = error.message;
        status.details = 'Error creando WebSocket connection';
        console.log('❌ WebSocket creation failed:', error);
        resolve(status);
      }
    });
  }

  async checkSystemHealth(): Promise<SystemHealth> {
    console.log('🏥 Iniciando verificación completa del sistema ArbitrageX...');
    
    const [backend, edge, websocket] = await Promise.all([
      this.verifyBackend(),
      this.verifyEdge(),
      this.verifyWebSocket()
    ]);

    const connectedServices = [backend, edge, websocket].filter(s => s.status === 'connected').length;
    const missingCredentials: string[] = [];
    const missingServices: string[] = [];

    // Analizar qué falta específicamente
    if (backend.status === 'missing_credentials') missingCredentials.push('Backend API Key');
    if (edge.status === 'missing_credentials') missingCredentials.push('JWT Token para Edge');
    if (websocket.status === 'missing_credentials') missingCredentials.push('WebSocket Auth');

    if (backend.status === 'disconnected' || backend.status === 'error') {
      missingServices.push('Backend Rust (Contabo VPS)');
    }
    if (edge.status === 'disconnected' || edge.status === 'error') {
      missingServices.push('Edge Computing (Cloudflare Workers)');
    }
    if (websocket.status === 'disconnected' || websocket.status === 'error') {
      missingServices.push('WebSocket Real-time');
    }

    const overall: SystemHealth['overall'] = 
      connectedServices === 3 ? 'healthy' :
      connectedServices > 0 ? 'partial' : 'down';

    const health: SystemHealth = {
      backend,
      edge,
      websocket,
      overall,
      missingCredentials,
      missingServices
    };

    console.log(`🏥 Verificación completa: ${overall.toUpperCase()}`);
    console.log(`📊 Servicios conectados: ${connectedServices}/3`);
    if (missingCredentials.length > 0) {
      console.log(`🔑 Credenciales faltantes: ${missingCredentials.join(', ')}`);
    }
    if (missingServices.length > 0) {
      console.log(`⚠️ Servicios no disponibles: ${missingServices.join(', ')}`);
    }

    return health;
  }
}

export const connectionVerifier = new ConnectionVerifier();
