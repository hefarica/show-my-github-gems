import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  Divider,
  LinearProgress,
  Grid,
  Chip,
  Card,
  CardContent,
  Alert,
  Tooltip,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SecurityIcon from '@mui/icons-material/Security';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useTheme } from '@mui/material/styles';
import { API_BASE_URL } from '../config';
import { formatCurrency, formatNumber } from '../utils/formatters';

// Tipos para la evaluación de riesgos
interface TokenSecurity {
  token_address: string;
  symbol: string;
  security_score: number;
  warning_flags: string[];
  is_blacklisted: boolean;
  is_whitelisted: boolean;
}

interface PairSecurity {
  pair_id: string;
  security_score: number;
  token0_security: TokenSecurity;
  token1_security: TokenSecurity;
  recommendation: string;
}

interface LiquidityDepth {
  avg_slippage_per_1k_usd: number;
  max_single_trade_usd: number;
  liquidity_distribution_score: number;
  overall_health_score: number;
}

interface PriceConfidence {
  token_a: string;
  token_b: string;
  dex_price_ratio: number;
  oracle_price: number;
  confidence_score: number;
  deviation_percent: number;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  timestamp: number;
}

interface RiskEvaluationPanelProps {
  chainId: number;
  pairId: string;
  pairSymbols?: {
    token0: string;
    token1: string;
  };
  dexPrice?: number;
}

const StyledLinearProgress = styled(LinearProgress)<{ score: number }>(({ theme, score }) => {
  let color;
  if (score >= 80) {
    color = theme.palette.success.main;
  } else if (score >= 50) {
    color = theme.palette.warning.main;
  } else {
    color = theme.palette.error.main;
  }

  return {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    height: 10,
    borderRadius: 5,
    '& .MuiLinearProgress-bar': {
      backgroundColor: color,
    }
  };
});

const RiskChip = styled(Chip)<{ score: number }>(({ theme, score }) => {
  let color;
  if (score >= 80) {
    color = theme.palette.success.main;
  } else if (score >= 50) {
    color = theme.palette.warning.main;
  } else {
    color = theme.palette.error.main;
  }

  return {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.8)',
    color: color,
    fontWeight: 700,
    border: `1px solid ${color}`,
    '& .MuiChip-icon': {
      color: color,
    }
  };
});

const RiskEvaluationPanel: React.FC<RiskEvaluationPanelProps> = ({
  chainId,
  pairId,
  pairSymbols,
  dexPrice
}) => {
  const [security, setSecurity] = useState<PairSecurity | null>(null);
  const [liquidity, setLiquidity] = useState<LiquidityDepth | null>(null);
  const [priceConfidence, setPriceConfidence] = useState<PriceConfidence | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchRiskData = async () => {
      if (!chainId || !pairId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Fetch security evaluation
        const securityRes = await fetch(`${API_BASE_URL}/api/security/pair/${chainId}/${pairId}`);
        
        if (!securityRes.ok) {
          throw new Error(`Security API error: ${securityRes.status}`);
        }
        
        const securityData: ApiResponse<PairSecurity> = await securityRes.json();
        
        if (!securityData.success || !securityData.data) {
          throw new Error(securityData.message || 'Failed to fetch security data');
        }
        
        setSecurity(securityData.data);
        
        // Fetch liquidity depth
        const liquidityRes = await fetch(`${API_BASE_URL}/api/liquidity/depth/${chainId}/${pairId}`);
        
        if (!liquidityRes.ok) {
          throw new Error(`Liquidity API error: ${liquidityRes.status}`);
        }
        
        const liquidityData = await liquidityRes.json();
        
        if (!liquidityData.success || !liquidityData.data) {
          throw new Error(liquidityData.message || 'Failed to fetch liquidity data');
        }
        
        setLiquidity(liquidityData.data.depth_analysis);
        
        // Fetch price confidence if dexPrice is provided
        if (dexPrice && pairSymbols) {
          const priceRes = await fetch(`${API_BASE_URL}/api/oracle/confidence/${chainId}/${pairSymbols.token0}/${pairSymbols.token1}?dex_price_ratio=${dexPrice}`);
          
          if (!priceRes.ok) {
            throw new Error(`Oracle API error: ${priceRes.status}`);
          }
          
          const priceData = await priceRes.json();
          
          if (!priceData.success || !priceData.data) {
            throw new Error(priceData.message || 'Failed to fetch price confidence data');
          }
          
          setPriceConfidence(priceData.data);
        }
      } catch (err) {
        console.error('Error fetching risk data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchRiskData();
  }, [chainId, pairId, dexPrice, pairSymbols]);

  const getScoreIcon = (score: number) => {
    if (score >= 80) {
      return <CheckCircleIcon />;
    } else if (score >= 50) {
      return <WarningIcon />;
    } else {
      return <ErrorIcon />;
    }
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) {
      return 'Bajo Riesgo';
    } else if (score >= 50) {
      return 'Riesgo Medio';
    } else {
      return 'Alto Riesgo';
    }
  };

  // Calcula la puntuación de riesgo combinada
  const calculateCombinedScore = () => {
    if (!security || !liquidity) return null;
    
    // Ponderación: Seguridad (40%), Liquidez (40%), Confianza de precio (20% si disponible)
    if (priceConfidence) {
      return Math.round(
        security.security_score * 0.4 + 
        liquidity.overall_health_score * 0.4 + 
        priceConfidence.confidence_score * 0.2
      );
    } else {
      return Math.round(
        security.security_score * 0.5 + 
        liquidity.overall_health_score * 0.5
      );
    }
  };

  const combinedScore = calculateCombinedScore();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="300px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Error cargando datos de riesgo: {error}
      </Alert>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2, mb: 2 }}>
      <Typography variant="h5" gutterBottom>
        Evaluación de Riesgos
      </Typography>
      
      {/* Puntuación combinada */}
      {combinedScore !== null && (
        <Box sx={{ mb: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="h6">Evaluación Global</Typography>
            <RiskChip 
              label={`${combinedScore}%`} 
              score={combinedScore} 
              icon={getScoreIcon(combinedScore)}
            />
          </Box>
          <StyledLinearProgress variant="determinate" value={combinedScore} score={combinedScore} />
          <Typography variant="body2" sx={{ mt: 1, fontWeight: 500, color: theme.palette.text.secondary }}>
            {getScoreLabel(combinedScore)}
          </Typography>
        </Box>
      )}
      
      <Divider sx={{ my: 2 }} />
      
      <Grid container spacing={2}>
        {/* Sección de Seguridad */}
        {security && (
          <Grid item xs={12} md={4}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                  <Typography variant="h6" display="flex" alignItems="center">
                    <SecurityIcon sx={{ mr: 1 }} />
                    Seguridad
                  </Typography>
                  <Tooltip title="Evaluación de seguridad basada en análisis Anti-Rug">
                    <HelpOutlineIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
                  </Tooltip>
                </Box>
                
                <StyledLinearProgress 
                  variant="determinate" 
                  value={security.security_score} 
                  score={security.security_score}
                  sx={{ mb: 2 }} 
                />
                
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">Token 0</Typography>
                    <Typography variant="body1" fontWeight="bold">{security.token0_security.symbol}</Typography>
                    <RiskChip 
                      size="small"
                      label={`${security.token0_security.security_score}%`} 
                      score={security.token0_security.security_score}
                      sx={{ mt: 0.5 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">Token 1</Typography>
                    <Typography variant="body1" fontWeight="bold">{security.token1_security.symbol}</Typography>
                    <RiskChip 
                      size="small"
                      label={`${security.token1_security.security_score}%`} 
                      score={security.token1_security.security_score}
                      sx={{ mt: 0.5 }}
                    />
                  </Grid>
                </Grid>
                
                {security.token0_security.warning_flags.length > 0 || security.token1_security.warning_flags.length > 0 ? (
                  <Alert 
                    severity={security.security_score < 50 ? "error" : "warning"} 
                    icon={security.security_score < 50 ? <ErrorIcon /> : <WarningIcon />}
                    sx={{ mt: 2, p: 1 }}
                  >
                    <Typography variant="body2">
                      {security.recommendation}
                    </Typography>
                  </Alert>
                ) : (
                  <Alert severity="success" icon={<CheckCircleIcon />} sx={{ mt: 2, p: 1 }}>
                    <Typography variant="body2">
                      {security.recommendation}
                    </Typography>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>
        )}
        
        {/* Sección de Liquidez */}
        {liquidity && (
          <Grid item xs={12} md={4}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                  <Typography variant="h6" display="flex" alignItems="center">
                    <WaterDropIcon sx={{ mr: 1 }} />
                    Liquidez
                  </Typography>
                  <Tooltip title="Evaluación de profundidad y distribución de liquidez">
                    <HelpOutlineIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
                  </Tooltip>
                </Box>
                
                <StyledLinearProgress 
                  variant="determinate" 
                  value={liquidity.overall_health_score} 
                  score={liquidity.overall_health_score}
                  sx={{ mb: 2 }} 
                />
                
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">Slippage por $1k</Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {liquidity.avg_slippage_per_1k_usd.toFixed(2)}%
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">Trade Máx.</Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {formatCurrency(liquidity.max_single_trade_usd)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ mt: 1 }}>
                    <Typography variant="body2" color="textSecondary">Distribución</Typography>
                    <Box display="flex" alignItems="center">
                      <StyledLinearProgress 
                        variant="determinate" 
                        value={liquidity.liquidity_distribution_score} 
                        score={liquidity.liquidity_distribution_score}
                        sx={{ my: 1, flexGrow: 1, mr: 1 }} 
                      />
                      <Typography variant="body2" fontWeight="bold">
                        {liquidity.liquidity_distribution_score}%
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                
                <Alert 
                  severity={liquidity.overall_health_score >= 80 ? "success" : 
                          liquidity.overall_health_score >= 50 ? "warning" : "error"} 
                  sx={{ mt: 2, p: 1 }}
                >
                  <Typography variant="body2">
                    {liquidity.overall_health_score >= 80 
                      ? "Liquidez óptima para operaciones de arbitraje" 
                      : liquidity.overall_health_score >= 50 
                        ? "Liquidez aceptable, monitorear slippage" 
                        : "Liquidez insuficiente, alto riesgo de slippage"}
                  </Typography>
                </Alert>
              </CardContent>
            </Card>
          </Grid>
        )}
        
        {/* Sección de Confianza de Precio */}
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Typography variant="h6" display="flex" alignItems="center">
                  <TrendingUpIcon sx={{ mr: 1 }} />
                  Confianza de Precio
                </Typography>
                <Tooltip title="Evaluación de confianza en precios basada en oráculos">
                  <HelpOutlineIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
                </Tooltip>
              </Box>
              
              {priceConfidence ? (
                <>
                  <StyledLinearProgress 
                    variant="determinate" 
                    value={priceConfidence.confidence_score} 
                    score={priceConfidence.confidence_score}
                    sx={{ mb: 2 }} 
                  />
                  
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">Precio DEX</Typography>
                      <Typography variant="body1" fontWeight="bold">
                        {priceConfidence.dex_price_ratio.toFixed(6)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">Precio Oráculo</Typography>
                      <Typography variant="body1" fontWeight="bold">
                        {priceConfidence.oracle_price.toFixed(6)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 1 }}>
                      <Typography variant="body2" color="textSecondary">Desviación</Typography>
                      <Typography variant="body1" fontWeight="bold" 
                        color={
                          priceConfidence.deviation_percent < 0.5 ? 'success.main' :
                          priceConfidence.deviation_percent < 2 ? 'warning.main' : 'error.main'
                        }
                      >
                        {priceConfidence.deviation_percent.toFixed(2)}%
                      </Typography>
                    </Grid>
                  </Grid>
                  
                  <Alert 
                    severity={priceConfidence.confidence_score >= 80 ? "success" : 
                            priceConfidence.confidence_score >= 50 ? "warning" : "error"} 
                    sx={{ mt: 2, p: 1 }}
                  >
                    <Typography variant="body2">
                      {priceConfidence.confidence_score >= 80 
                        ? "Alta confianza en el precio, consistente con oráculos" 
                        : priceConfidence.confidence_score >= 50 
                          ? "Confianza moderada, ligera desviación con oráculos" 
                          : "Baja confianza, alta desviación de oráculos"}
                    </Typography>
                  </Alert>
                </>
              ) : (
                <Box display="flex" justifyContent="center" alignItems="center" height="200px" flexDirection="column">
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    Datos no disponibles
                  </Typography>
                  <Typography variant="caption" color="textSecondary" align="center">
                    Los datos de confianza de precio requieren información adicional de precios
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RiskEvaluationPanel;
