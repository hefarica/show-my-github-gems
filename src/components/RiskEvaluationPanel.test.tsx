import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RiskEvaluationPanel from './RiskEvaluationPanel';

// Mock de fetch para simular respuestas API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      success: true,
      data: {
        security_score: 85,
        token0_security: {
          symbol: 'ETH',
          security_score: 95,
          warning_flags: []
        },
        token1_security: {
          symbol: 'USDC',
          security_score: 90,
          warning_flags: []
        },
        recommendation: 'SEGURO - Par verificado con alta puntuación de seguridad'
      },
      timestamp: Date.now()
    })
  })
) as jest.Mock;

// Tema para el componente
const theme = createTheme();

// Wrapper con ThemeProvider para los tests
const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('RiskEvaluationPanel Component', () => {
  beforeEach(() => {
    // Limpiar los mocks antes de cada test
    jest.clearAllMocks();
  });

  test('muestra el estado de carga inicial', () => {
    renderWithTheme(<RiskEvaluationPanel chainId={1} pairId="0x123" />);
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('muestra mensaje de error si hay error en la carga', async () => {
    // Sobrescribir el mock de fetch para simular un error
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject('API Error')
    );
    
    renderWithTheme(<RiskEvaluationPanel chainId={1} pairId="0x123" />);
    
    // Esperar a que aparezca el mensaje de error
    const errorElement = await screen.findByText(/error/i);
    expect(errorElement).toBeInTheDocument();
  });

  test('muestra los datos correctamente cuando se cargan', async () => {
    renderWithTheme(<RiskEvaluationPanel chainId={1} pairId="0x123" />);
    
    // Verificar que los datos se muestran correctamente después de cargar
    const title = await screen.findByText('Evaluación de Riesgos');
    expect(title).toBeInTheDocument();
    
    // Verificar que se muestran los símbolos de los tokens
    const ethSymbol = await screen.findByText('ETH');
    expect(ethSymbol).toBeInTheDocument();
    
    const usdcSymbol = await screen.findByText('USDC');
    expect(usdcSymbol).toBeInTheDocument();
    
    // Verificar que se muestra la recomendación de seguridad
    const recommendation = await screen.findByText('SEGURO - Par verificado con alta puntuación de seguridad');
    expect(recommendation).toBeInTheDocument();
  });

  test('realiza las llamadas API correctas', () => {
    renderWithTheme(<RiskEvaluationPanel chainId={1} pairId="0x123" />);
    
    // Verificar que se llama a fetch con los endpoints correctos
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/security/pair/1/0x123'),
      expect.any(Object)
    );
  });
});
