import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Tooltip,
  Grid,
  Chip,
  useTheme,
  CircularProgress,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import BalanceIcon from '@mui/icons-material/Balance';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { formatCurrency, formatNumber, formatPercentage } from '../utils/formatters';

// Definición de tipos
interface EVCalculation {
  successProbability: number;
  executionGasCost: number;
  potentialProfit: number;
  potentialLoss: number;
  expectedValue: number;
  riskRewardRatio: number;
  evaluationScores: {
    securityScore: number;
    liquidityScore: number;
    priceConfidenceScore: number;
  };
  recommendation: string;
}

// Props del componente
interface ExpectedValueCardProps {
  opportunityId?: string;
  loading?: boolean;
  error?: string;
  data?: EVCalculation;
  onRecalculate?: () => void;
}

// Componente estilizado para los valores numéricos
const StyledValue = styled(Typography)<{ positive?: boolean; neutral?: boolean }>(
  ({ theme, positive, neutral }) => ({
    fontWeight: 700,
    fontSize: '1.1rem',
    color: neutral
      ? theme.palette.text.primary
      : positive
      ? theme.palette.success.main
      : theme.palette.error.main,
  })
);

// Componente estilizado para los chips de probabilidad
const ProbabilityChip = styled(Chip)<{ probability: number }>(({ theme, probability }) => {
  let color;
  
  if (probability >= 0.75) {
    color = theme.palette.success.main;
  } else if (probability >= 0.5) {
    color = theme.palette.warning.main;
  } else {
    color = theme.palette.error.main;
  }
  
  return {
    fontWeight: 700,
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.8)',
    color: color,
    border: `1px solid ${color}`,
  };
});

// Componente principal
const ExpectedValueCard: React.FC<ExpectedValueCardProps> = ({
  opportunityId,
  loading = false,
  error = null,
  data,
  onRecalculate
}) => {
  const theme = useTheme();

  // Si está cargando
  if (loading) {
    return (
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={4}>
            <CircularProgress size={40} sx={{ mb: 2 }} />
            <Typography variant="body1" color="textSecondary">
              Calculando valor esperado...
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  // Si hay un error
  if (error) {
    return (
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Alert severity="error" sx={{ mb: 1 }}>
            {error}
          </Alert>
        </CardContent>
      </Card>
    );
  }

  // Si no hay datos
  if (!data) {
    return (
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" display="flex" alignItems="center">
              <BalanceIcon sx={{ mr: 1 }} />
              Análisis de Valor Esperado
            </Typography>
            <Tooltip title="El cálculo del valor esperado considera la probabilidad de éxito, costos potenciales y ganancias para evaluar si una oportunidad es rentable">
              <HelpOutlineIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
            </Tooltip>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={3}>
            <QuestionMarkIcon sx={{ fontSize: 40, color: theme.palette.text.secondary, mb: 1 }} />
            <Typography variant="body1" color="textSecondary">
              No hay datos de EV disponibles para esta oportunidad
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  // Determinar color y mensaje para el EV
  let evColor, evIcon;
  if (data.expectedValue > 0) {
    evColor = theme.palette.success.main;
    evIcon = <TrendingUpIcon />;
  } else {
    evColor = theme.palette.error.main;
    evIcon = <TrendingDownIcon />;
  }

  // Datos disponibles, mostrar tarjeta completa
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" display="flex" alignItems="center">
            <BalanceIcon sx={{ mr: 1 }} />
            Análisis de Valor Esperado
          </Typography>
          <Tooltip title="El cálculo del valor esperado considera la probabilidad de éxito, costos potenciales y ganancias para evaluar si una oportunidad es rentable">
            <HelpOutlineIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
          </Tooltip>
        </Box>
        
        {/* Valor esperado principal */}
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          mt={2} 
          p={1.5} 
          borderRadius={1}
          bgcolor={theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.03)'}
        >
          <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center"
          >
            <Typography variant="body2" color="textSecondary" gutterBottom>
              VALOR ESPERADO (EV)
            </Typography>
            <Box display="flex" alignItems="center">
              <Box 
                component="span" 
                display="inline-flex" 
                alignItems="center" 
                justifyContent="center" 
                mr={1}
                p={0.5}
                borderRadius="50%"
                bgcolor={evColor}
                color="white"
              >
                {evIcon}
              </Box>
              <Typography 
                variant="h4" 
                component="div" 
                fontWeight={700}
                color={evColor}
              >
                {formatCurrency(data.expectedValue)}
              </Typography>
            </Box>
          </Box>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        {/* Datos del cálculo */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box mb={2}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Probabilidad de Éxito
              </Typography>
              <Box display="flex" alignItems="center">
                <ProbabilityChip
                  label={`${(data.successProbability * 100).toFixed(1)}%`}
                  probability={data.successProbability}
                />
              </Box>
            </Box>
            
            <Box mb={2}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Ganancia Potencial
              </Typography>
              <StyledValue positive>
                {formatCurrency(data.potentialProfit)}
              </StyledValue>
            </Box>
            
            <Box>
              <Typography variant="body2" color="textSecondary" gutterBottom display="flex" alignItems="center">
                <LocalGasStationIcon fontSize="small" sx={{ mr: 0.5 }} />
                Costo de Gas
              </Typography>
              <StyledValue neutral>
                {formatCurrency(data.executionGasCost)}
              </StyledValue>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Box mb={2}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Ratio Riesgo/Recompensa
              </Typography>
              <StyledValue positive={data.riskRewardRatio >= 2} neutral={data.riskRewardRatio < 2 && data.riskRewardRatio >= 1}>
                {data.riskRewardRatio.toFixed(2)}x
              </StyledValue>
            </Box>
            
            <Box mb={2}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Pérdida Potencial (Fallo)
              </Typography>
              <StyledValue>
                {formatCurrency(data.potentialLoss)}
              </StyledValue>
            </Box>
            
            <Box>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Puntuación Combinada
              </Typography>
              <Box display="flex">
                <Tooltip title="Seguridad">
                  <Chip
                    size="small"
                    label={`${data.evaluationScores.securityScore}%`}
                    sx={{ mr: 0.5, fontWeight: 600 }}
                  />
                </Tooltip>
                <Tooltip title="Liquidez">
                  <Chip
                    size="small"
                    label={`${data.evaluationScores.liquidityScore}%`}
                    sx={{ mr: 0.5, fontWeight: 600 }}
                  />
                </Tooltip>
                <Tooltip title="Confianza de Precio">
                  <Chip
                    size="small"
                    label={`${data.evaluationScores.priceConfidenceScore}%`}
                    sx={{ fontWeight: 600 }}
                  />
                </Tooltip>
              </Box>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 2 }} />
        
        {/* Recomendación */}
        <Alert 
          severity={data.expectedValue > 0 ? "success" : "warning"}
          icon={data.expectedValue > 0 ? <MonetizationOnIcon /> : <BalanceIcon />}
        >
          <Typography variant="body2">
            <strong>Recomendación:</strong> {data.recommendation}
          </Typography>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default ExpectedValueCard;
