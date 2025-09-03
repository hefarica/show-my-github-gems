// Hook para detectar el estado de conexión del backend
import { useState, useEffect } from 'react';
import { arbitrageApi } from '@/services/api';

export interface BackendStatus {
  isConnected: boolean;
  isUsingRealData: boolean;
  status: 'connected' | 'disconnected' | 'connecting';
  lastChecked: Date;
  endpoint: string;
}

export const useBackendStatus = () => {
  const [backendStatus, setBackendStatus] = useState<BackendStatus>({
    isConnected: false,
    isUsingRealData: false,
    status: 'disconnected',
    lastChecked: new Date(),
    endpoint: 'https://8001c524.arbitragex-supreme-backend.pages.dev'
  });

  const checkBackendStatus = async () => {
    setBackendStatus(prev => ({ ...prev, status: 'connecting' }));
    
    try {
      // Intentar obtener datos del dashboard
      const startTime = Date.now();
      const data = await arbitrageApi.getDashboardSummary();
      const responseTime = Date.now() - startTime;
      
      // Verificar si los datos son reales basándose en la fuente
      // Si contiene datos de CoinGecko = datos reales
      const isRealData = data.total_profit_24h > 0 && data.active_opportunities > 0 && data.portfolio_value > 1000;

      console.log(`✅ Datos ${isRealData ? 'REALES' : 'MOCK'} detectados`);

      setBackendStatus({
        isConnected: true,
        isUsingRealData: isRealData,
        status: 'connected',
        lastChecked: new Date(),
        endpoint: 'https://8001c524.arbitragex-supreme-backend.pages.dev'
      });

      console.log(`✅ Backend status: ${isRealData ? 'REAL DATA' : 'MOCK DATA'} (${responseTime}ms)`);
      
    } catch (error) {
      setBackendStatus({
        isConnected: false,
        isUsingRealData: false,
        status: 'disconnected',
        lastChecked: new Date(),
        endpoint: 'https://8001c524.arbitragex-supreme-backend.pages.dev'
      });

      console.log('❌ Backend disconnected, using mock data');
    }
  };

  useEffect(() => {
    // Verificar estado inmediatamente
    checkBackendStatus();

    // Verificar cada 10 segundos
    const interval = setInterval(checkBackendStatus, 10000);

    return () => clearInterval(interval);
  }, []);

  return {
    backendStatus,
    refetchStatus: checkBackendStatus
  };
};