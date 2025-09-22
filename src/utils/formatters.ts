// ArbitrageX Supreme V3.3 (RLI) - Utilidades de formateo
// Funciones de utilidad para dar formato a valores numéricos y fechas

/**
 * Formatea un valor numérico como moneda (USD)
 * @param value Valor numérico a formatear
 * @param minimumFractionDigits Mínimo de dígitos decimales (por defecto 2)
 * @param maximumFractionDigits Máximo de dígitos decimales (por defecto 2)
 * @returns String formateado como moneda
 */
export const formatCurrency = (
  value: number, 
  minimumFractionDigits: number = 2,
  maximumFractionDigits: number = 2
): string => {
  if (value === undefined || value === null) return '$0.00';
  
  // Usar valores adecuados para números pequeños
  if (Math.abs(value) < 0.01 && value !== 0) {
    maximumFractionDigits = 6;
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits,
    maximumFractionDigits
  }).format(value);
};

/**
 * Formatea un valor numérico con separador de miles
 * @param value Valor numérico a formatear
 * @param minimumFractionDigits Mínimo de dígitos decimales (por defecto 0)
 * @param maximumFractionDigits Máximo de dígitos decimales (por defecto 2)
 * @returns String formateado con separador de miles
 */
export const formatNumber = (
  value: number,
  minimumFractionDigits: number = 0,
  maximumFractionDigits: number = 2
): string => {
  if (value === undefined || value === null) return '0';
  
  // Usar valores adecuados para números pequeños
  if (Math.abs(value) < 0.01 && value !== 0) {
    maximumFractionDigits = 6;
  }
  
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits,
    maximumFractionDigits
  }).format(value);
};

/**
 * Formatea un valor numérico como porcentaje
 * @param value Valor decimal a formatear (ej: 0.05 para 5%)
 * @param minimumFractionDigits Mínimo de dígitos decimales (por defecto 2)
 * @param maximumFractionDigits Máximo de dígitos decimales (por defecto 2)
 * @returns String formateado como porcentaje
 */
export const formatPercentage = (
  value: number,
  minimumFractionDigits: number = 2,
  maximumFractionDigits: number = 2
): string => {
  if (value === undefined || value === null) return '0%';
  
  // Convertir a porcentaje si es decimal (0.05 → 5%)
  const percentValue = value <= 1 && value >= -1 && value !== 0 ? value * 100 : value;
  
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits,
    maximumFractionDigits
  }).format(percentValue / 100);
};

/**
 * Formatea un valor numérico en puntos base (bps)
 * @param value Valor decimal a formatear (ej: 0.0005 para 5 bps)
 * @returns String formateado en bps
 */
export const formatBasisPoints = (value: number): string => {
  if (value === undefined || value === null) return '0 bps';
  
  // 1 bps = 0.01%, por lo que multiplicamos por 10000 para convertir a bps
  const bpsValue = Math.round(value * 10000);
  return `${bpsValue} bps`;
};

/**
 * Acorta una dirección de Ethereum
 * @param address Dirección completa
 * @param prefixLength Longitud del prefijo (por defecto 6)
 * @param suffixLength Longitud del sufijo (por defecto 4)
 * @returns Dirección acortada
 */
export const shortenAddress = (
  address: string,
  prefixLength: number = 6,
  suffixLength: number = 4
): string => {
  if (!address) return '';
  if (address.length <= prefixLength + suffixLength) return address;
  
  return `${address.substring(0, prefixLength)}...${address.substring(
    address.length - suffixLength
  )}`;
};

/**
 * Formatea una fecha en formato legible
 * @param dateStr Fecha en formato ISO o timestamp
 * @param includeTime Incluir la hora en el resultado
 * @returns Fecha formateada
 */
export const formatDate = (
  dateStr: string | number | Date,
  includeTime: boolean = true
): string => {
  if (!dateStr) return '';
  
  const date = typeof dateStr === 'string' || typeof dateStr === 'number'
    ? new Date(dateStr)
    : dateStr;
  
  if (isNaN(date.getTime())) return 'Fecha inválida';
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  
  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
    options.second = '2-digit';
  }
  
  return new Intl.DateTimeFormat('es-ES', options).format(date);
};

/**
 * Formatea una duración en tiempo relativo
 * @param timestamp Timestamp en milisegundos o fecha ISO
 * @returns Tiempo relativo (ej: "hace 5 minutos")
 */
export const formatTimeAgo = (timestamp: number | string): string => {
  if (!timestamp) return '';
  
  const date = typeof timestamp === 'number'
    ? new Date(timestamp)
    : new Date(timestamp);
  
  if (isNaN(date.getTime())) return '';
  
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  // Menos de 1 minuto
  if (diffInSeconds < 60) {
    return `hace ${diffInSeconds} segundo${diffInSeconds !== 1 ? 's' : ''}`;
  }
  
  // Menos de 1 hora
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `hace ${diffInMinutes} minuto${diffInMinutes !== 1 ? 's' : ''}`;
  }
  
  // Menos de 1 día
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `hace ${diffInHours} hora${diffInHours !== 1 ? 's' : ''}`;
  }
  
  // Menos de 30 días
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `hace ${diffInDays} día${diffInDays !== 1 ? 's' : ''}`;
  }
  
  // Menos de 12 meses
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `hace ${diffInMonths} mes${diffInMonths !== 1 ? 'es' : ''}`;
  }
  
  // Más de 12 meses
  const diffInYears = Math.floor(diffInMonths / 12);
  return `hace ${diffInYears} año${diffInYears !== 1 ? 's' : ''}`;
};

/**
 * Formatea un número grande en formato abreviado (K, M, B)
 * @param value Valor numérico
 * @returns Número formateado y abreviado
 */
export const formatCompactNumber = (value: number): string => {
  if (value === undefined || value === null) return '0';
  
  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1
  });
  
  return formatter.format(value);
};

/**
 * Formatea una cantidad de gas en Gwei
 * @param value Valor en Gwei
 * @returns String formateado
 */
export const formatGwei = (value: number): string => {
  if (value === undefined || value === null) return '0 Gwei';
  
  return `${formatNumber(value, 0, 2)} Gwei`;
};

/**
 * Formatea un número como cantidad de cripto con el símbolo
 * @param value Valor numérico
 * @param symbol Símbolo de la criptomoneda
 * @returns String formateado con símbolo
 */
export const formatCrypto = (
  value: number | string,
  symbol: string,
  decimals: number = 6
): string => {
  if (value === undefined || value === null) return `0 ${symbol}`;
  
  // Convertir string a número si es necesario
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) return `0 ${symbol}`;
  
  // Para valores muy pequeños, usar notación científica
  if (Math.abs(numValue) < 0.000001 && numValue !== 0) {
    return `${numValue.toExponential(4)} ${symbol}`;
  }
  
  return `${formatNumber(numValue, 0, decimals)} ${symbol}`;
};
