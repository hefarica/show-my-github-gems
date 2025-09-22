import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  CircularProgress,
  Typography,
  Chip,
  Box,
  Tooltip,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SecurityIcon from '@mui/icons-material/Security';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import WaterIcon from '@mui/icons-material/Water';
import VerifiedIcon from '@mui/icons-material/Verified';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import { formatCurrency, formatNumber } from '../utils/formatters';
import { LiquidityPair, ApiResponse } from '../types/api';
import { useTheme } from '@mui/material/styles';
import { API_BASE_URL } from '../config';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${theme.palette.mode === 'dark' ? 'head' : 'head'}`]: {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.primary.main,
    color: theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.common.white,
  },
  [`&.${theme.palette.mode === 'dark' ? 'body' : 'body'}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[50],
  },
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
    cursor: 'pointer',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ScoreChip = styled(Chip)<{ score: number }>(({ theme, score }) => {
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
    fontWeight: 600,
    border: `1px solid ${color}`,
    '& .MuiChip-icon': {
      color: color,
    }
  };
});

interface TopPairsTableProps {
  onPairSelect?: (pair: LiquidityPair) => void;
}

interface LiquidityPairsResponse {
  pairs: LiquidityPair[];
  total: number;
}

const TopPairsTable: React.FC<TopPairsTableProps> = ({ onPairSelect }) => {
  const [pairs, setPairs] = useState<LiquidityPair[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchTopPairs = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/liquidity/top-pairs?limit=10`);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data: ApiResponse<LiquidityPairsResponse> = await response.json();
        
        if (!data.success || !data.data) {
          throw new Error(data.message || 'Failed to fetch top pairs');
        }
        
        setPairs(data.data.pairs);
      } catch (err) {
        console.error('Error fetching top pairs:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchTopPairs();
  }, []);

  const getScoreIcon = (score: number) => {
    if (score >= 80) {
      return <VerifiedIcon fontSize="small" />;
    } else if (score >= 50) {
      return <WarningIcon fontSize="small" />;
    } else {
      return <ErrorIcon fontSize="small" />;
    }
  };

  const handleRowClick = (pair: LiquidityPair) => {
    if (onPairSelect) {
      onPairSelect(pair);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="300px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="300px">
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Paper elevation={3}>
      <Typography variant="h6" sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        Top Trading Pairs by Liquidity
      </Typography>
      <TableContainer>
        <Table aria-label="top liquidity pairs table" size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>Pair</StyledTableCell>
              <StyledTableCell align="right">DEX</StyledTableCell>
              <StyledTableCell align="right">Chain</StyledTableCell>
              <StyledTableCell align="right">Liquidity</StyledTableCell>
              <StyledTableCell align="right">Volume (24h)</StyledTableCell>
              <StyledTableCell align="right">
                <Tooltip title="Security Score - Based on Anti-Rug system analysis">
                  <Box display="flex" alignItems="center" justifyContent="flex-end">
                    <SecurityIcon fontSize="small" sx={{ mr: 0.5 }} />
                    <span>Security</span>
                  </Box>
                </Tooltip>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Tooltip title="Liquidity Score - Based on depth and distribution analysis">
                  <Box display="flex" alignItems="center" justifyContent="flex-end">
                    <WaterDropIcon fontSize="small" sx={{ mr: 0.5 }} />
                    <span>Liquidity</span>
                  </Box>
                </Tooltip>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Tooltip title="Optimal Trade Size - Based on slippage analysis">
                  <Box display="flex" alignItems="center" justifyContent="flex-end">
                    <WaterIcon fontSize="small" sx={{ mr: 0.5 }} />
                    <span>Max Trade</span>
                  </Box>
                </Tooltip>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pairs.map((row) => (
              <StyledTableRow key={row.pair.id} onClick={() => handleRowClick(row)}>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Typography variant="body2" fontWeight="bold">
                      {row.pair.token0_symbol}/{row.pair.token1_symbol}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">{row.pair.dex_name}</TableCell>
                <TableCell align="right">{row.pair.chain_id}</TableCell>
                <TableCell align="right">{formatCurrency(row.pair.liquidity_usd)}</TableCell>
                <TableCell align="right">{formatCurrency(row.pair.volume_24h_usd)}</TableCell>
                <TableCell align="right">
                  <ScoreChip
                    size="small"
                    label={`${row.depth_analysis.liquidity_distribution_score}%`}
                    score={row.depth_analysis.liquidity_distribution_score}
                    icon={getScoreIcon(row.depth_analysis.liquidity_distribution_score)}
                  />
                </TableCell>
                <TableCell align="right">
                  <ScoreChip
                    size="small"
                    label={`${row.depth_analysis.overall_health_score}%`}
                    score={row.depth_analysis.overall_health_score}
                    icon={getScoreIcon(row.depth_analysis.overall_health_score)}
                  />
                </TableCell>
                <TableCell align="right">{formatCurrency(row.optimal_trade_size)}</TableCell>
              </StyledTableRow>
            ))}
            {pairs.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No pairs found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TopPairsTable;
