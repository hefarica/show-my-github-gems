import { Layout } from './Layout'

export const StrategiesView = () => {
  return (
    <Layout title="Gestión de Estrategias MEV" activeSection="strategies">
      {/* Strategy Overview */}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Estrategias Base</h3>
            <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">6/6</span>
          </div>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-gray-600 dark:text-gray-400 text-sm">Simple Arbitrage</span>
              <span class="text-success text-sm"><i class="fas fa-check-circle"></i></span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-600 dark:text-gray-400 text-sm">Triangle Arbitrage</span>
              <span class="text-success text-sm"><i class="fas fa-check-circle"></i></span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-600 dark:text-gray-400 text-sm">Flash Loan Arbitrage</span>
              <span class="text-success text-sm"><i class="fas fa-check-circle"></i></span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-600 dark:text-gray-400 text-sm">Sandwich Attacks</span>
              <span class="text-success text-sm"><i class="fas fa-check-circle"></i></span>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Estrategias Avanzadas</h3>
            <span class="bg-success/10 text-success px-3 py-1 rounded-full text-sm font-medium">7/7</span>
          </div>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-gray-600 dark:text-gray-400 text-sm">MEV Bundling</span>
              <span class="text-success text-sm"><i class="fas fa-check-circle"></i></span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-600 dark:text-gray-400 text-sm">Liquidity Fragmentation</span>
              <span class="text-success text-sm"><i class="fas fa-check-circle"></i></span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-600 dark:text-gray-400 text-sm">Governance Arbitrage</span>
              <span class="text-success text-sm"><i class="fas fa-check-circle"></i></span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-600 dark:text-gray-400 text-sm">Intent-Based Arbitrage</span>
              <span class="text-success text-sm"><i class="fas fa-check-circle"></i></span>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Rendimiento Global</h3>
            <span class="bg-warning/10 text-warning px-3 py-1 rounded-full text-sm font-medium">Activo</span>
          </div>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-gray-600 dark:text-gray-400 text-sm">Éxito Total</span>
              <span class="text-success font-semibold">94.2%</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-600 dark:text-gray-400 text-sm">Trades Ejecutados</span>
              <span class="text-primary font-semibold">1,247</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-600 dark:text-gray-400 text-sm">Ganancia Media</span>
              <span class="text-success font-semibold">$186.50</span>
            </div>
          </div>
        </div>
      </div>

      {/* Strategy Details Table */}
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              <i class="fas fa-list text-primary mr-2"></i>
              Detalle de Estrategias
            </h3>
            <div class="flex space-x-3">
              <button class="bg-success hover:bg-success/80 text-white px-4 py-2 rounded-lg transition-colors">
                <i class="fas fa-play mr-2"></i>Activar Todas
              </button>
              <button class="bg-warning hover:bg-warning/80 text-white px-4 py-2 rounded-lg transition-colors">
                <i class="fas fa-pause mr-2"></i>Pausar Todas
              </button>
              <button class="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg transition-colors">
                <i class="fas fa-cog mr-2"></i>Configurar
              </button>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th class="text-left py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Estrategia</th>
                <th class="text-left py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Tipo</th>
                <th class="text-center py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Estado</th>
                <th class="text-right py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Ganancia</th>
                <th class="text-right py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Trades</th>
                <th class="text-right py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Éxito</th>
                <th class="text-center py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700" id="strategies-table">
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td class="py-4 px-6">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                      <i class="fas fa-exchange-alt text-primary"></i>
                    </div>
                    <div>
                      <p class="font-medium text-gray-900 dark:text-white">Simple Arbitrage</p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">Arbitraje básico entre DEXs</p>
                    </div>
                  </div>
                </td>
                <td class="py-4 px-6">
                  <span class="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium">Base</span>
                </td>
                <td class="py-4 px-6 text-center">
                  <span class="inline-flex items-center bg-success/10 text-success px-3 py-1 rounded-full text-sm font-medium">
                    <div class="w-2 h-2 bg-success rounded-full mr-2"></div>
                    Activo
                  </span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-success font-semibold">$12,345.67</span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-gray-900 dark:text-white font-medium">245</span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-success font-medium">94.5%</span>
                </td>
                <td class="py-4 px-6 text-center">
                  <div class="flex items-center justify-center space-x-2">
                    <button class="text-primary hover:text-secondary transition-colors">
                      <i class="fas fa-cog"></i>
                    </button>
                    <button class="text-warning hover:text-warning/80 transition-colors">
                      <i class="fas fa-pause"></i>
                    </button>
                    <button class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                      <i class="fas fa-chart-line"></i>
                    </button>
                  </div>
                </td>
              </tr>

              <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td class="py-4 px-6">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center mr-3">
                      <i class="fas fa-sitemap text-success"></i>
                    </div>
                    <div>
                      <p class="font-medium text-gray-900 dark:text-white">MEV Bundling</p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">Agrupación avanzada MEV</p>
                    </div>
                  </div>
                </td>
                <td class="py-4 px-6">
                  <span class="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-2 py-1 rounded-full text-xs font-medium">Avanzada</span>
                </td>
                <td class="py-4 px-6 text-center">
                  <span class="inline-flex items-center bg-success/10 text-success px-3 py-1 rounded-full text-sm font-medium">
                    <div class="w-2 h-2 bg-success rounded-full mr-2"></div>
                    Activo
                  </span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-success font-semibold">$15,432.10</span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-gray-900 dark:text-white font-medium">298</span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-success font-medium">96.8%</span>
                </td>
                <td class="py-4 px-6 text-center">
                  <div class="flex items-center justify-center space-x-2">
                    <button class="text-primary hover:text-secondary transition-colors">
                      <i class="fas fa-cog"></i>
                    </button>
                    <button class="text-warning hover:text-warning/80 transition-colors">
                      <i class="fas fa-pause"></i>
                    </button>
                    <button class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                      <i class="fas fa-chart-line"></i>
                    </button>
                  </div>
                </td>
              </tr>

              <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td class="py-4 px-6">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center mr-3">
                      <i class="fas fa-flash text-warning"></i>
                    </div>
                    <div>
                      <p class="font-medium text-gray-900 dark:text-white">Flash Loan Arbitrage</p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">Arbitraje con préstamos flash</p>
                    </div>
                  </div>
                </td>
                <td class="py-4 px-6">
                  <span class="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium">Base</span>
                </td>
                <td class="py-4 px-6 text-center">
                  <span class="inline-flex items-center bg-success/10 text-success px-3 py-1 rounded-full text-sm font-medium">
                    <div class="w-2 h-2 bg-success rounded-full mr-2"></div>
                    Activo
                  </span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-success font-semibold">$8,976.54</span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-gray-900 dark:text-white font-medium">189</span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-success font-medium">91.2%</span>
                </td>
                <td class="py-4 px-6 text-center">
                  <div class="flex items-center justify-center space-x-2">
                    <button class="text-primary hover:text-secondary transition-colors">
                      <i class="fas fa-cog"></i>
                    </button>
                    <button class="text-warning hover:text-warning/80 transition-colors">
                      <i class="fas fa-pause"></i>
                    </button>
                    <button class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                      <i class="fas fa-chart-line"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Strategy Performance Chart */}
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">
            <i class="fas fa-chart-area text-primary mr-2"></i>
            Rendimiento Temporal de Estrategias
          </h3>
          <div class="flex space-x-2">
            <select class="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2">
              <option>Últimas 24h</option>
              <option>Última semana</option>
              <option>Último mes</option>
              <option>Últimos 3 meses</option>
            </select>
          </div>
        </div>
        <canvas id="strategy-performance-chart" width="800" height="400"></canvas>
      </div>
    </Layout>
  )
}