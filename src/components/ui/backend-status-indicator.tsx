// Componente de indicador de estado del backend
import { cn } from '@/lib/utils';
import { useBackendStatus } from '@/hooks/useBackendStatus';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { RefreshCw, Wifi, WifiOff, Database } from 'lucide-react';

interface BackendStatusIndicatorProps {
  className?: string;
}

export const BackendStatusIndicator = ({ className }: BackendStatusIndicatorProps) => {
  const { backendStatus, refetchStatus } = useBackendStatus();

  const getStatusColor = () => {
    if (backendStatus.status === 'connecting') return 'bg-yellow-500';
    if (backendStatus.isUsingRealData) return 'bg-green-500';
    return 'bg-red-500';
  };

  const getStatusText = () => {
    if (backendStatus.status === 'connecting') return 'Conectando...';
    if (backendStatus.isUsingRealData) return 'Datos Reales';
    return 'Mock Data';
  };

  const getIcon = () => {
    if (backendStatus.status === 'connecting') return <RefreshCw className="w-3 h-3 animate-spin" />;
    if (backendStatus.isUsingRealData) return <Database className="w-3 h-3" />;
    if (backendStatus.isConnected) return <Wifi className="w-3 h-3" />;
    return <WifiOff className="w-3 h-3" />;
  };

  const getTooltipContent = () => {
    const lastChecked = backendStatus.lastChecked.toLocaleTimeString();
    
    if (backendStatus.isUsingRealData) {
      return (
        <div className="text-center">
          <div className="font-semibold text-green-400">✅ Backend Conectado</div>
          <div className="text-xs mt-1">
            Conectado al backend de producción:<br/>
            <span className="font-mono text-green-300">8001c524.arbitragex-supreme-backend.pages.dev</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Última verificación: {lastChecked}
          </div>
        </div>
      );
    }

    if (backendStatus.status === 'connecting') {
      return (
        <div className="text-center">
          <div className="font-semibold text-yellow-400">🔄 Conectando...</div>
          <div className="text-xs mt-1">
            Verificando conexión con backend...
          </div>
        </div>
      );
    }

    return (
      <div className="text-center">
        <div className="font-semibold text-red-400">❌ Backend No Disponible</div>
        <div className="text-xs mt-1">
          Backend de producción no responde:<br/>
          <span className="font-mono text-red-300">8001c524.arbitragex-supreme-backend.pages.dev</span>
        </div>
        <div className="text-xs text-yellow-300 mt-1">
          Usando datos mock temporales
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Última verificación: {lastChecked}
        </div>
      </div>
    );
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn("flex items-center gap-2 text-sm", className)}>
            <div className={cn(
              "w-2 h-2 rounded-full transition-colors duration-300",
              getStatusColor(),
              backendStatus.isUsingRealData ? "animate-pulse" : ""
            )}></div>
            <span className="text-muted-foreground hidden sm:inline">
              {getStatusText()}
            </span>
            <div className="text-muted-foreground">
              {getIcon()}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={refetchStatus}
              className="h-6 w-6 p-0 opacity-60 hover:opacity-100"
              disabled={backendStatus.status === 'connecting'}
            >
              <RefreshCw className={cn(
                "w-3 h-3",
                backendStatus.status === 'connecting' && "animate-spin"
              )} />
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-sm">
          {getTooltipContent()}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};