import { Layout } from './Layout'

export const BlockchainsView = () => {
  return (
    <Layout title="Gestión de Blockchains" activeSection="blockchains">
      {/* Blockchain Overview */}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 dark:text-gray-400 text-sm font-medium">EVM Blockchains</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">8</p>
              <p class="text-success text-sm mt-1">
                <i class="fas fa-check-circle"></i> Todas conectadas
              </p>
            </div>
            <div class="bg-primary/10 p-3 rounded-lg">
              <i class="fab fa-ethereum text-primary text-xl"></i>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 dark:text-gray-400 text-sm font-medium">Non-EVM Blockchains</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">4</p>
              <p class="text-success text-sm mt-1">
                <i class="fas fa-check-circle"></i> Operativas
              </p>
            </div>
            <div class="bg-warning/10 p-3 rounded-lg">
              <i class="fas fa-cubes text-warning text-xl"></i>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 dark:text-gray-400 text-sm font-medium">Latencia Promedio</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">27ms</p>
              <p class="text-success text-sm mt-1">
                <i class="fas fa-bolt"></i> Excelente
              </p>
            </div>
            <div class="bg-success/10 p-3 rounded-lg">
              <i class="fas fa-tachometer-alt text-success text-xl"></i>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 dark:text-gray-400 text-sm font-medium">Gas Price Prom.</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">15 gwei</p>
              <p class="text-warning text-sm mt-1">
                <i class="fas fa-exclamation-triangle"></i> Moderado
              </p>
            </div>
            <div class="bg-warning/10 p-3 rounded-lg">
              <i class="fas fa-gas-pump text-warning text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* EVM Blockchains */}
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              <i class="fab fa-ethereum text-primary mr-2"></i>
              EVM Blockchains (8)
            </h3>
          </div>
          <div class="p-6 space-y-4" id="evm-blockchains">
            <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <i class="fab fa-ethereum text-blue-600"></i>
                </div>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">Ethereum</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Mainnet</p>
                </div>
              </div>
              <div class="text-right">
                <div class="flex items-center space-x-2 mb-1">
                  <span class="w-3 h-3 bg-success rounded-full"></span>
                  <span class="text-sm font-medium text-success">Conectado</span>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400">45ms • 25 gwei</p>
              </div>
            </div>

            <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <i class="fas fa-gem text-purple-600"></i>
                </div>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">Polygon</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">PoS Chain</p>
                </div>
              </div>
              <div class="text-right">
                <div class="flex items-center space-x-2 mb-1">
                  <span class="w-3 h-3 bg-success rounded-full"></span>
                  <span class="text-sm font-medium text-success">Conectado</span>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400">32ms • 30 gwei</p>
              </div>
            </div>

            <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                  <i class="fas fa-coins text-yellow-600"></i>
                </div>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">BSC</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Binance Smart Chain</p>
                </div>
              </div>
              <div class="text-right">
                <div class="flex items-center space-x-2 mb-1">
                  <span class="w-3 h-3 bg-success rounded-full"></span>
                  <span class="text-sm font-medium text-success">Conectado</span>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400">28ms • 3 gwei</p>
              </div>
            </div>

            <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <i class="fas fa-arrow-up text-blue-600"></i>
                </div>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">Arbitrum</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Layer 2</p>
                </div>
              </div>
              <div class="text-right">
                <div class="flex items-center space-x-2 mb-1">
                  <span class="w-3 h-3 bg-success rounded-full"></span>
                  <span class="text-sm font-medium text-success">Conectado</span>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400">21ms • 0.1 gwei</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              <i class="fas fa-cubes text-warning mr-2"></i>
              Non-EVM Blockchains (4)
            </h3>
          </div>
          <div class="p-6 space-y-4" id="non-evm-blockchains">
            <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <i class="fas fa-sun text-white"></i>
                </div>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">Solana</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">PoH Consensus</p>
                </div>
              </div>
              <div class="text-right">
                <div class="flex items-center space-x-2 mb-1">
                  <span class="w-3 h-3 bg-success rounded-full"></span>
                  <span class="text-sm font-medium text-success">Conectado</span>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400">15ms • 0.00001 SOL</p>
              </div>
            </div>

            <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <i class="fas fa-leaf text-green-600"></i>
                </div>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">NEAR</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Sharded PoS</p>
                </div>
              </div>
              <div class="text-right">
                <div class="flex items-center space-x-2 mb-1">
                  <span class="w-3 h-3 bg-success rounded-full"></span>
                  <span class="text-sm font-medium text-success">Conectado</span>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400">19ms • 0.0001 NEAR</p>
              </div>
            </div>

            <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <i class="fas fa-heart text-blue-600"></i>
                </div>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">Cardano</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Ouroboros PoS</p>
                </div>
              </div>
              <div class="text-right">
                <div class="flex items-center space-x-2 mb-1">
                  <span class="w-3 h-3 bg-success rounded-full"></span>
                  <span class="text-sm font-medium text-success">Conectado</span>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400">35ms • 0.17 ADA</p>
              </div>
            </div>

            <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <i class="fas fa-atom text-white"></i>
                </div>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">Cosmos</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Tendermint BFT</p>
                </div>
              </div>
              <div class="text-right">
                <div class="flex items-center space-x-2 mb-1">
                  <span class="w-3 h-3 bg-success rounded-full"></span>
                  <span class="text-sm font-medium text-success">Conectado</span>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400">29ms • 0.0025 ATOM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blockchain Performance Metrics */}
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 mb-8">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">
            <i class="fas fa-chart-bar text-primary mr-2"></i>
            Métricas de Rendimiento
          </h3>
          <div class="flex space-x-2">
            <select class="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2">
              <option>Tiempo Real</option>
              <option>Últimas 24h</option>
              <option>Última semana</option>
            </select>
            <button class="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg transition-colors">
              <i class="fas fa-refresh mr-2"></i>Actualizar
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th class="text-left py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Blockchain</th>
                <th class="text-center py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Estado</th>
                <th class="text-right py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Latencia</th>
                <th class="text-right py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Gas Price</th>
                <th class="text-right py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">TPS</th>
                <th class="text-right py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Oportunidades</th>
                <th class="text-center py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700" id="blockchain-metrics">
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td class="py-4 px-6">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                      <i class="fab fa-ethereum text-blue-600 text-sm"></i>
                    </div>
                    <div>
                      <p class="font-medium text-gray-900 dark:text-white">Ethereum</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">EVM Compatible</p>
                    </div>
                  </div>
                </td>
                <td class="py-4 px-6 text-center">
                  <span class="inline-flex items-center bg-success/10 text-success px-2 py-1 rounded-full text-xs font-medium">
                    <div class="w-2 h-2 bg-success rounded-full mr-1"></div>
                    Online
                  </span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-success font-medium">45ms</span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-warning font-medium">25 gwei</span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-gray-900 dark:text-white font-medium">15</span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-primary font-semibold">23</span>
                </td>
                <td class="py-4 px-6 text-center">
                  <button class="text-primary hover:text-secondary transition-colors">
                    <i class="fas fa-chart-line"></i>
                  </button>
                </td>
              </tr>

              <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td class="py-4 px-6">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                      <i class="fas fa-sun text-white text-sm"></i>
                    </div>
                    <div>
                      <p class="font-medium text-gray-900 dark:text-white">Solana</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">Non-EVM</p>
                    </div>
                  </div>
                </td>
                <td class="py-4 px-6 text-center">
                  <span class="inline-flex items-center bg-success/10 text-success px-2 py-1 rounded-full text-xs font-medium">
                    <div class="w-2 h-2 bg-success rounded-full mr-1"></div>
                    Online
                  </span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-success font-medium">15ms</span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-success font-medium">0.00001 SOL</span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-gray-900 dark:text-white font-medium">2,500</span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-primary font-semibold">41</span>
                </td>
                <td class="py-4 px-6 text-center">
                  <button class="text-primary hover:text-secondary transition-colors">
                    <i class="fas fa-chart-line"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Network Health Chart */}
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">
            <i class="fas fa-heartbeat text-success mr-2"></i>
            Salud de Redes en Tiempo Real
          </h3>
        </div>
        <canvas id="network-health-chart" width="800" height="400"></canvas>
      </div>
    </Layout>
  )
}