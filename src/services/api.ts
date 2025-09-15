// src/services/api.ts
// Cliente API para ArbitrageX Supreme V3.0 - SOLO DATOS REALES
// Sistema de verificación de conexiones integrado
// NO HAY DATOS MOCK - Todo debe venir de APIs reales

import { connectionVerifier, type SystemHealth } from './connectionVerifier';
import type { Opportunity, Execution, ApiResponse } from '../types';

const API_BASE_URL = 'https://arbitragex.workers.dev/api';
const BACKEND_URL = 'http://localhost:8080/api';

export interface ApiError {
  message: string;
  code: string;
  service: 'backend' | 'edge' | 'websocket';
  endpoint: string;
  details?: string;
  timestamp: number;
}

class ApiClient {
  private baseUrl: string;
  private backendUrl: string;
  private authToken?: string;
  private systemHealth?: SystemHealth;

  constructor(baseUrl: string = API_BASE_URL, backendUrl: string = BACKEND_URL) {
    this.baseUrl = baseUrl;
    this.backendUrl = backendUrl;
    this.authToken = this.getStoredToken();
  }

  private getStoredToken(): string | undefined {
    try {
      return localStorage.getItem('arbitragex_jwt_token') || undefined;
    } catch {
      console.warn('⚠️ localStorage no disponible, usando modo sin autenticación');
      return undefined;
    }
  }

  private createApiError(message: string, service: ApiError['service'], endpoint: string, details?: string): ApiError {
    return {
      message,
      code: `${service.toUpperCase()}_ERROR`,
      service,
      endpoint,
      details,
      timestamp: Date.now()
    };
  }

  private async request<T>(endpoint: string, service: 'backend' | 'edge', options: RequestInit = {}): Promise<T> {
    const baseUrl = service === 'backend' ? this.backendUrl : this.baseUrl;
    const url = `${baseUrl}${endpoint}`;
    
    console.log(`🌐 API Request: ${service.toUpperCase()} ${endpoint}`);
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(this.authToken && { 'Authorization': `Bearer ${this.authToken}` }),
          ...options.headers,
        },
        signal: AbortSignal.timeout(10000) // 10s timeout
      });

      if (!response.ok) {
        if (response.status === 401) {
          const error = this.createApiError(
            'Credenciales JWT inválidas o faltantes',
            service,
            endpoint,
            `${service === 'edge' ? 'Edge Workers' : 'Backend'} requiere autenticación válida`
          );
          console.error('🔑 Error de autenticación:', error);
          throw error;
        }
        
        if (response.status === 404) {
          const error = this.createApiError(
            'Endpoint no encontrado',
            service,
            endpoint,
            `El endpoint ${endpoint} no existe en ${service}`
          );
          console.error('🔍 Endpoint no encontrado:', error);
          throw error;
        }

        const error = this.createApiError(
          `HTTP ${response.status}: ${response.statusText}`,
          service,
          endpoint,
          `${service} respondió con error`
        );
        console.error(`❌ ${service.toUpperCase()} Error:`, error);
        throw error;
      }

      const data = await response.json();
      console.log(`✅ ${service.toUpperCase()} Success:`, endpoint, `(${JSON.stringify(data).length} chars)`);
      return data;
      
    } catch (error: any) {
      if (error.name === 'AbortError') {
        const timeoutError = this.createApiError(
          'Timeout: Servicio no responde',
          service,
          endpoint,
          `${service} no respondió en 10 segundos`
        );
        console.error('⏱️ Timeout Error:', timeoutError);
        throw timeoutError;
      }
      
      if (error.message?.includes('fetch')) {
        const connectionError = this.createApiError(
          'No se puede conectar al servicio',
          service,
          endpoint,
          `${service} no está accesible. Verificar: servicio iniciado, red, firewall`
        );
        console.error('🔌 Connection Error:', connectionError);
        throw connectionError;
      }

      // Si ya es un ApiError, re-lanzarlo
      if (error.code && error.service) {
        throw error;
      }

      // Error desconocido
      const unknownError = this.createApiError(
        error.message || 'Error desconocido',
        service,
        endpoint,
        'Error inesperado en la comunicación'
      );
      console.error('❓ Unknown Error:', unknownError);
      throw unknownError;
    }
  }

  async fetchOpportunities(): Promise<Opportunity[]> {
    console.log('📊 Obteniendo oportunidades de arbitraje...');
    
    // Intentar Edge Computing primero (más rápido)
    try {
      const response = await this.request<ApiResponse<Opportunity[]>>('/opportunities', 'edge');
      if (response.success && response.data) {
        console.log(`✅ Oportunidades obtenidas de Edge: ${response.data.length}`);
        return response.data;
      }
      throw new Error('Edge response sin datos válidos');
    } catch (edgeError) {
      console.log('⚠️ Edge Computing falló, intentando Backend directo...');
      
      // Fallback al Backend directo
      try {
        const response = await this.request<ApiResponse<Opportunity[]>>('/opportunities', 'backend');
        if (response.success && response.data) {
          console.log(`✅ Oportunidades obtenidas de Backend: ${response.data.length}`);
          return response.data;
        }
        throw new Error('Backend response sin datos válidos');
      } catch (backendError) {
        console.error('❌ Ambos servicios fallaron:', { edgeError, backendError });
        throw backendError; // Lanzar el último error
      }
    }
  }

  async fetchExecutions(): Promise<Execution[]> {
    console.log('⚡ Obteniendo ejecuciones...');
    
    try {
      const response = await this.request<ApiResponse<Execution[]>>('/executions', 'edge');
      if (response.success && response.data) {
        console.log(`✅ Ejecuciones obtenidas: ${response.data.length}`);
        return response.data;
      }
      throw new Error('Response sin datos válidos');
    } catch (error) {
      console.error('❌ Error obteniendo ejecuciones:', error);
      throw error;
    }
  }

  async checkSystemHealth(): Promise<SystemHealth> {
    if (!this.systemHealth) {
      console.log('🏥 Verificando salud del sistema...');
      this.systemHealth = await connectionVerifier.checkSystemHealth();
    }
    return this.systemHealth;
  }

  // Método para refrescar la verificación de salud
  async refreshSystemHealth(): Promise<SystemHealth> {
    console.log('🔄 Refrescando verificación de salud del sistema...');
    this.systemHealth = await connectionVerifier.checkSystemHealth();
    return this.systemHealth;
  }

  // Método para establecer token JWT
  setAuthToken(token: string): void {
    this.authToken = token;
    try {
      localStorage.setItem('arbitragex_jwt_token', token);
      console.log('🔑 Token JWT guardado');
    } catch {
      console.warn('⚠️ No se pudo guardar token en localStorage');
    }
  }

  // Método para limpiar autenticación
  clearAuth(): void {
    this.authToken = undefined;
    try {
      localStorage.removeItem('arbitragex_jwt_token');
      console.log('🔑 Token JWT eliminado');
    } catch {
      console.warn('⚠️ No se pudo eliminar token de localStorage');
    }
  }
}

export const apiClient = new ApiClient();
export const fetchOpportunities = () => apiClient.fetchOpportunities();
export const fetchExecutions = () => apiClient.fetchExecutions();
export const checkSystemHealth = () => apiClient.checkSystemHealth();
export const refreshSystemHealth = () => apiClient.refreshSystemHealth();
