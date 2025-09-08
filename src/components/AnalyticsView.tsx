import { Layout } from './Layout'

export const AnalyticsView = () => {
  return (
    <Layout title="Analíticas y Reportes" activeSection="analytics">
      {/* Key Metrics */}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 dark:text-gray-400 text-sm font-medium">ROI Total</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">+347.8%</p>
              <p class="text-success text-sm mt-1">
                <i class="fas fa-arrow-up"></i> +23.4% este mes
              </p>
            </div>
            <div class="bg-success/10 p-3 rounded-lg">
              <i class="fas fa-percentage text-success text-xl"></i>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 dark:text-gray-400 text-sm font-medium">Volumen Trading</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">$2.4M</p>
              <p class="text-primary text-sm mt-1">
                <i class="fas fa-chart-line"></i> Últimos 30 días
              </p>
            </div>
            <div class="bg-primary/10 p-3 rounded-lg">
              <i class="fas fa-coins text-primary text-xl"></i>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 dark:text-gray-400 text-sm font-medium">Trades Exitosos</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">94.2%</p>
              <p class="text-success text-sm mt-1">
                <i class="fas fa-check-circle"></i> 1,247 de 1,324
              </p>
            </div>
            <div class="bg-success/10 p-3 rounded-lg">
              <i class="fas fa-bullseye text-success text-xl"></i>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 dark:text-gray-400 text-sm font-medium">Profit Promedio</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">$186.5</p>
              <p class="text-warning text-sm mt-1">
                <i class="fas fa-trending-up"></i> Por trade
              </p>
            </div>
            <div class="bg-warning/10 p-3 rounded-lg">
              <i class="fas fa-dollar-sign text-warning text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Profit Timeline */}
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              <i class="fas fa-chart-area text-success mr-2"></i>
              Evolución de Ganancias
            </h3>
            <div class="flex space-x-2">
              <select class="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm">
                <option>7 días</option>
                <option>30 días</option>
                <option>90 días</option>
                <option>1 año</option>
              </select>
            </div>
          </div>
          <canvas id="profit-timeline-chart" width="400" height="250"></canvas>
        </div>

        {/* Blockchain Distribution */}
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              <i class="fas fa-chart-pie text-primary mr-2"></i>
              Distribución por Blockchain
            </h3>
          </div>
          <canvas id="blockchain-distribution-chart" width="400" height="250"></canvas>
        </div>
      </div>

      {/* Strategy Performance Table */}
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              <i class="fas fa-table text-warning mr-2"></i>
              Rendimiento Detallado por Estrategia
            </h3>
            <div class="flex space-x-2">
              <button class="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg transition-colors">
                <i class="fas fa-download mr-2"></i>Exportar
              </button>
              <button class="bg-primary hover:bg-secondary text-white px-3 py-2 rounded-lg transition-colors">
                <i class="fas fa-refresh mr-2"></i>Actualizar
              </button>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th class="text-left py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Estrategia</th>
                <th class="text-right py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Profit Total</th>
                <th class="text-right py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Trades</th>
                <th class="text-right py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Success Rate</th>
                <th class="text-right py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Avg Profit</th>
                <th class="text-right py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">ROI</th>
                <th class="text-center py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Trend</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td class="py-4 px-6">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center mr-3">
                      <i class="fas fa-sitemap text-success text-sm"></i>
                    </div>
                    <div>
                      <p class="font-medium text-gray-900 dark:text-white">MEV Bundling</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">Avanzada</p>
                    </div>
                  </div>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-success font-semibold text-lg">$15,432.10</span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-gray-900 dark:text-white font-medium">298</span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-success font-medium">96.8%</span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-gray-900 dark:text-white">$51.78</span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-success font-semibold">+387%</span>
                </td>
                <td class="py-4 px-6 text-center">
                  <i class="fas fa-arrow-up text-success"></i>
                </td>
              </tr>

              <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td class="py-4 px-6">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                      <i class="fas fa-exchange-alt text-primary text-sm"></i>
                    </div>
                    <div>
                      <p class="font-medium text-gray-900 dark:text-white">Simple Arbitrage</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">Base</p>
                    </div>
                  </div>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-success font-semibold text-lg">$12,345.67</span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-gray-900 dark:text-white font-medium">245</span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-success font-medium">94.5%</span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-gray-900 dark:text-white">$50.39</span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-success font-semibold">+312%</span>
                </td>
                <td class="py-4 px-6 text-center">
                  <i class="fas fa-arrow-up text-success"></i>
                </td>
              </tr>

              <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td class="py-4 px-6">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center mr-3">
                      <i class="fas fa-bolt text-warning text-sm"></i>
                    </div>
                    <div>
                      <p class="font-medium text-gray-900 dark:text-white">Flash Loan Arbitrage</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">Base</p>
                    </div>
                  </div>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-success font-semibold text-lg">$8,976.54</span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-gray-900 dark:text-white font-medium">189</span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-success font-medium">91.2%</span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-gray-900 dark:text-white">$47.49</span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-success font-semibold">+276%</span>
                </td>
                <td class="py-4 px-6 text-center">
                  <i class="fas fa-arrow-up text-success"></i>
                </td>
              </tr>

              <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td class="py-4 px-6">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
                      <i class="fas fa-layer-group text-purple-600 text-sm"></i>
                    </div>
                    <div>
                      <p class="font-medium text-gray-900 dark:text-white">Liquidity Fragmentation</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">Avanzada</p>
                    </div>
                  </div>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-success font-semibold text-lg">$6,543.21</span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-gray-900 dark:text-white font-medium">156</span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-success font-medium">89.7%</span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-gray-900 dark:text-white">$41.94</span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-success font-semibold">+234%</span>
                </td>
                <td class="py-4 px-6 text-center">
                  <i class="fas fa-minus text-warning"></i>
                </td>
              </tr>

              <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td class="py-4 px-6">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                      <i class="fas fa-shapes text-blue-600 text-sm"></i>
                    </div>
                    <div>
                      <p class="font-medium text-gray-900 dark:text-white">Triangle Arbitrage</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">Base</p>
                    </div>
                  </div>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-success font-semibold text-lg">$4,321.98</span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-gray-900 dark:text-white font-medium">134</span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-success font-medium">88.1%</span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-gray-900 dark:text-white">$32.25</span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-success font-semibold">+189%</span>
                </td>
                <td class="py-4 px-6 text-center">
                  <i class="fas fa-arrow-up text-success"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Advanced Analytics */}
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Heat Map */}
        <div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              <i class="fas fa-fire text-danger mr-2"></i>
              Mapa de Calor - Oportunidades por Hora
            </h3>
          </div>
          
          <div class="grid grid-cols-24 gap-1 mb-4">
            {/* Hours 0-23 */}
            <div class="text-xs text-gray-500 dark:text-gray-400 text-center">0</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 text-center">1</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 text-center">2</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 text-center">3</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 text-center">4</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 text-center">5</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 text-center">6</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 text-center">7</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 text-center">8</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 text-center">9</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 text-center">10</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 text-center">11</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 text-center">12</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 text-center">13</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 text-center">14</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 text-center">15</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 text-center">16</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 text-center">17</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 text-center">18</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 text-center">19</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 text-center">20</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 text-center">21</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 text-center">22</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 text-center">23</div>
          </div>

          <div class="space-y-1 mb-4">
            <div class="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span class="w-8">Lun</span>
              <div class="grid grid-cols-24 gap-1 flex-1">
                <div class="h-4 bg-green-200 dark:bg-green-800 rounded-sm" title="12 oportunidades"></div>
                <div class="h-4 bg-green-300 dark:bg-green-700 rounded-sm" title="18 oportunidades"></div>
                <div class="h-4 bg-green-500 dark:bg-green-600 rounded-sm" title="32 oportunidades"></div>
                <div class="h-4 bg-green-600 dark:bg-green-500 rounded-sm" title="45 oportunidades"></div>
                <div class="h-4 bg-red-500 dark:bg-red-600 rounded-sm" title="89 oportunidades"></div>
                <div class="h-4 bg-red-600 dark:bg-red-500 rounded-sm" title="103 oportunidades"></div>
                <div class="h-4 bg-red-700 dark:bg-red-400 rounded-sm" title="127 oportunidades"></div>
                <div class="h-4 bg-red-800 dark:bg-red-300 rounded-sm" title="156 oportunidades"></div>
                <div class="h-4 bg-red-700 dark:bg-red-400 rounded-sm" title="134 oportunidades"></div>
                <div class="h-4 bg-red-600 dark:bg-red-500 rounded-sm" title="98 oportunidades"></div>
                <div class="h-4 bg-red-500 dark:bg-red-600 rounded-sm" title="76 oportunidades"></div>
                <div class="h-4 bg-green-600 dark:bg-green-500 rounded-sm" title="54 oportunidades"></div>
                <div class="h-4 bg-green-500 dark:bg-green-600 rounded-sm" title="43 oportunidades"></div>
                <div class="h-4 bg-green-400 dark:bg-green-700 rounded-sm" title="29 oportunidades"></div>
                <div class="h-4 bg-green-300 dark:bg-green-800 rounded-sm" title="21 oportunidades"></div>
                <div class="h-4 bg-green-200 dark:bg-green-900 rounded-sm" title="15 oportunidades"></div>
                <div class="h-4 bg-green-300 dark:bg-green-800 rounded-sm" title="19 oportunidades"></div>
                <div class="h-4 bg-green-400 dark:bg-green-700 rounded-sm" title="27 oportunidades"></div>
                <div class="h-4 bg-green-500 dark:bg-green-600 rounded-sm" title="35 oportunidades"></div>
                <div class="h-4 bg-green-600 dark:bg-green-500 rounded-sm" title="48 oportunidades"></div>
                <div class="h-4 bg-green-500 dark:bg-green-600 rounded-sm" title="41 oportunidades"></div>
                <div class="h-4 bg-green-400 dark:bg-green-700 rounded-sm" title="33 oportunidades"></div>
                <div class="h-4 bg-green-300 dark:bg-green-800 rounded-sm" title="24 oportunidades"></div>
                <div class="h-4 bg-green-200 dark:bg-green-900 rounded-sm" title="16 oportunidades"></div>
              </div>
            </div>
            {/* Similar patterns for other days */}
          </div>

          <div class="flex items-center justify-between text-xs">
            <span class="text-gray-500 dark:text-gray-400">Menos</span>
            <div class="flex space-x-1">
              <div class="w-3 h-3 bg-green-100 dark:bg-green-900 rounded-sm"></div>
              <div class="w-3 h-3 bg-green-200 dark:bg-green-800 rounded-sm"></div>
              <div class="w-3 h-3 bg-green-400 dark:bg-green-600 rounded-sm"></div>
              <div class="w-3 h-3 bg-green-600 dark:bg-green-400 rounded-sm"></div>
              <div class="w-3 h-3 bg-red-600 dark:bg-red-400 rounded-sm"></div>
            </div>
            <span class="text-gray-500 dark:text-gray-400">Más</span>
          </div>
        </div>

        {/* Top Performers */}
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">
              <i class="fas fa-trophy text-warning mr-2"></i>
              Top Performers
            </h3>
          </div>

          <div class="space-y-4">
            <div class="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <i class="fas fa-crown text-white text-sm"></i>
                </div>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">ETH/USDC</p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">Ethereum</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-semibold text-yellow-700 dark:text-yellow-300">$2,345</p>
                <p class="text-xs text-gray-600 dark:text-gray-400">47 trades</p>
              </div>
            </div>

            <div class="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-600/50 rounded-lg border border-gray-200 dark:border-gray-600">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center">
                  <i class="fas fa-medal text-white text-sm"></i>
                </div>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">SOL/USDT</p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">Solana</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-semibold text-gray-700 dark:text-gray-300">$1,876</p>
                <p class="text-xs text-gray-600 dark:text-gray-400">32 trades</p>
              </div>
            </div>

            <div class="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg border border-orange-200 dark:border-orange-800">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <i class="fas fa-award text-white text-sm"></i>
                </div>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">MATIC/USDC</p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">Polygon</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-semibold text-orange-700 dark:text-orange-300">$1,432</p>
                <p class="text-xs text-gray-600 dark:text-gray-400">28 trades</p>
              </div>
            </div>

            <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span class="text-white text-xs font-bold">4</span>
                </div>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">BNB/BUSD</p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">BSC</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-semibold text-gray-700 dark:text-gray-300">$987</p>
                <p class="text-xs text-gray-600 dark:text-gray-400">19 trades</p>
              </div>
            </div>

            <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span class="text-white text-xs font-bold">5</span>
                </div>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">AVAX/USDC</p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">Avalanche</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-semibold text-gray-700 dark:text-gray-300">$756</p>
                <p class="text-xs text-gray-600 dark:text-gray-400">15 trades</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Analysis */}
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">
            <i class="fas fa-shield-alt text-danger mr-2"></i>
            Análisis de Riesgo y Drawdown
          </h3>
          <div class="flex items-center space-x-4">
            <div class="text-center">
              <p class="text-sm text-gray-500 dark:text-gray-400">Max Drawdown</p>
              <p class="text-lg font-bold text-danger">-8.3%</p>
            </div>
            <div class="text-center">
              <p class="text-sm text-gray-500 dark:text-gray-400">Sharpe Ratio</p>
              <p class="text-lg font-bold text-success">2.47</p>
            </div>
            <div class="text-center">
              <p class="text-sm text-gray-500 dark:text-gray-400">VaR (95%)</p>
              <p class="text-lg font-bold text-warning">$234</p>
            </div>
          </div>
        </div>
        <canvas id="risk-analysis-chart" width="800" height="300"></canvas>
      </div>
    </Layout>
  )
}