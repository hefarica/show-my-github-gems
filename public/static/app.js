// ArbitrageX Supreme V3.0 - Frontend JavaScript

class ArbitrageXDashboard {
  constructor() {
    this.apiBaseUrl = '';
    this.charts = {};
    this.updateInterval = null;
    this.init();
  }

  async init() {
    console.log('🚀 ArbitrageX Supreme V3.0 Dashboard - Inicializando...');
    
    // Initialize components
    this.updateCurrentTime();
    this.startDataRefresh();
    await this.loadInitialData();
    this.initializeCharts();
    
    console.log('✅ Dashboard inicializado correctamente');
  }

  // Time Management
  updateCurrentTime() {
    const updateTime = () => {
      const now = dayjs().format('DD/MM/YYYY HH:mm:ss');
      const timeElement = document.getElementById('current-time');
      if (timeElement) {
        timeElement.textContent = now;
      }
    };
    
    updateTime();
    setInterval(updateTime, 1000);
  }

  // Data Loading
  async loadInitialData() {
    try {
      await Promise.all([
        this.loadSystemStatus(),
        this.loadOpportunities(),
        this.loadStrategyPerformance(),
        this.loadBlockchainStatus()
      ]);
    } catch (error) {
      console.error('❌ Error cargando datos iniciales:', error);
    }
  }

  async loadSystemStatus() {
    try {
      const response = await axios.get('/api/system/status');
      const data = response.data;
      
      // Update dashboard metrics
      this.updateElement('total-profit', data.totalProfit || '$0');
      this.updateElement('active-strategies', data.activeStrategies || '0');
      this.updateElement('connected-blockchains', data.connectedBlockchains || '0');
      this.updateElement('system-uptime', data.uptime || '0%');
      
    } catch (error) {
      console.error('❌ Error cargando estado del sistema:', error);
    }
  }

  async loadOpportunities() {
    try {
      const response = await axios.get('/api/arbitrage/opportunities');
      const opportunities = response.data.opportunities || [];
      
      const container = document.getElementById('opportunities-list');
      if (container && opportunities.length > 0) {
        container.innerHTML = opportunities.map(opp => `
          <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-colors">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <i class="fas fa-coins text-primary"></i>
              </div>
              <div>
                <p class="font-medium text-gray-900 dark:text-white">${opp.tokenPair}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">${opp.blockchain} • ${opp.dex1} → ${opp.dex2}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-semibold text-success text-lg">${opp.profit}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">${opp.percentage}</p>
            </div>
          </div>
        `).join('');
      }
    } catch (error) {
      console.error('❌ Error cargando oportunidades:', error);
    }
  }

  async loadStrategyPerformance() {
    try {
      const response = await axios.get('/api/strategies/performance');
      const strategies = response.data.strategies || [];
      
      // Update strategy performance table if exists
      const tableBody = document.getElementById('strategies-table');
      if (tableBody && strategies.length > 0) {
        // Update strategy data in table
        console.log('📊 Estrategias cargadas:', strategies.length);
      }
    } catch (error) {
      console.error('❌ Error cargando rendimiento de estrategias:', error);
    }
  }

  async loadBlockchainStatus() {
    try {
      const response = await axios.get('/api/blockchains/status');
      const blockchains = response.data.blockchains || [];
      
      // Update blockchain status
      console.log('🌐 Blockchains cargadas:', blockchains.length);
    } catch (error) {
      console.error('❌ Error cargando estado de blockchains:', error);
    }
  }

  // Chart Initialization
  initializeCharts() {
    this.initProfitChart();
    this.initStrategyChart();
    this.initBlockchainChart();
    this.initNetworkHealthChart();
    this.initRiskAnalysisChart();
  }

  initProfitChart() {
    const canvas = document.getElementById('profit-timeline-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    this.charts.profitTimeline = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.getLast7Days(),
        datasets: [{
          label: 'Ganancias Diarias',
          data: [1234, 2456, 1876, 3421, 2987, 4123, 3567],
          borderColor: '#10B981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  initStrategyChart() {
    const canvas = document.getElementById('strategies-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    this.charts.strategies = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['MEV Bundling', 'Simple Arbitrage', 'Flash Loan', 'Triangle', 'Otros'],
        datasets: [{
          data: [35, 25, 20, 15, 5],
          backgroundColor: [
            '#10B981',
            '#3B82F6', 
            '#F59E0B',
            '#8B5CF6',
            '#6B7280'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  initBlockchainChart() {
    const canvas = document.getElementById('blockchain-distribution-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    this.charts.blockchain = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Ethereum', 'Solana', 'Polygon', 'BSC', 'Arbitrum', 'Otros'],
        datasets: [{
          label: 'Trades por Blockchain',
          data: [245, 198, 167, 134, 98, 82],
          backgroundColor: [
            '#627EEA',
            '#9945FF',
            '#8247E5',
            '#F3BA2F',
            '#28A0F0',
            '#6B7280'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  initNetworkHealthChart() {
    const canvas = document.getElementById('network-health-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    this.charts.networkHealth = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.getLast24Hours(),
        datasets: [
          {
            label: 'Latencia (ms)',
            data: this.generateLatencyData(),
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            yAxisID: 'y'
          },
          {
            label: 'Throughput (TPS)',
            data: this.generateThroughputData(),
            borderColor: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Hora'
            }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Latencia (ms)'
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'TPS'
            },
            grid: {
              drawOnChartArea: false,
            },
          }
        }
      }
    });
  }

  initRiskAnalysisChart() {
    const canvas = document.getElementById('risk-analysis-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    this.charts.riskAnalysis = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.getLast30Days(),
        datasets: [
          {
            label: 'Portfolio Value',
            data: this.generatePortfolioData(),
            borderColor: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            fill: true
          },
          {
            label: 'Drawdown',
            data: this.generateDrawdownData(),
            borderColor: '#EF4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          }
        }
      }
    });
  }

  // Data Generation Helpers
  getLast7Days() {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      days.push(dayjs().subtract(i, 'day').format('DD/MM'));
    }
    return days;
  }

  getLast24Hours() {
    const hours = [];
    for (let i = 23; i >= 0; i--) {
      hours.push(dayjs().subtract(i, 'hour').format('HH:mm'));
    }
    return hours;
  }

  getLast30Days() {
    const days = [];
    for (let i = 29; i >= 0; i--) {
      days.push(dayjs().subtract(i, 'day').format('DD/MM'));
    }
    return days;
  }

  generateLatencyData() {
    return Array.from({ length: 24 }, () => Math.random() * 100 + 20);
  }

  generateThroughputData() {
    return Array.from({ length: 24 }, () => Math.random() * 1000 + 500);
  }

  generatePortfolioData() {
    const baseValue = 50000;
    return Array.from({ length: 30 }, (_, i) => 
      baseValue + (Math.random() - 0.5) * 5000 + i * 100
    );
  }

  generateDrawdownData() {
    return Array.from({ length: 30 }, () => -(Math.random() * 8));
  }

  // Utility Methods
  updateElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = value;
    }
  }

  // Auto-refresh functionality
  startDataRefresh() {
    // Refresh data every 30 seconds
    this.updateInterval = setInterval(() => {
      this.loadSystemStatus();
      this.loadOpportunities();
    }, 30000);
  }

  stopDataRefresh() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  // Dark mode toggle
  toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('darkMode', isDark);
    
    // Update charts for dark mode
    this.updateChartsTheme(isDark);
  }

  updateChartsTheme(isDark) {
    const textColor = isDark ? '#E5E7EB' : '#374151';
    const gridColor = isDark ? '#4B5563' : '#E5E7EB';
    
    Object.values(this.charts).forEach(chart => {
      if (chart && chart.options) {
        chart.options.scales.x.ticks.color = textColor;
        chart.options.scales.y.ticks.color = textColor;
        chart.options.scales.x.grid.color = gridColor;
        chart.options.scales.y.grid.color = gridColor;
        chart.update();
      }
    });
  }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Check for saved dark mode preference
  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode === 'true') {
    document.documentElement.classList.add('dark');
  }
  
  // Initialize dashboard
  window.dashboard = new ArbitrageXDashboard();
  
  // Add event listeners for interactive elements
  document.addEventListener('click', (e) => {
    // Handle refresh buttons
    if (e.target.closest('.refresh-btn')) {
      window.dashboard.loadInitialData();
    }
    
    // Handle dark mode toggle
    if (e.target.closest('.dark-mode-toggle')) {
      window.dashboard.toggleDarkMode();
    }
  });
});

// Export for global access
window.ArbitrageXDashboard = ArbitrageXDashboard;