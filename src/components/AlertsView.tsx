import { Layout } from './Layout'

export const AlertsView = () => {
  return (
    <Layout title="Gestión de Alertas y Notificaciones" activeSection="alerts">
      {/* Alert Statistics */}
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 dark:text-gray-400 text-sm font-medium">Alertas Activas</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">3</p>
              <p class="text-danger text-sm mt-1">
                <i class="fas fa-exclamation-circle"></i> Requieren atención
              </p>
            </div>
            <div class="bg-danger/10 p-3 rounded-lg">
              <i class="fas fa-bell text-danger text-xl animate-pulse"></i>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 dark:text-gray-400 text-sm font-medium">Alertas Hoy</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">47</p>
              <p class="text-success text-sm mt-1">
                <i class="fas fa-arrow-up"></i> +15% vs ayer
              </p>
            </div>
            <div class="bg-success/10 p-3 rounded-lg">
              <i class="fas fa-chart-line text-success text-xl"></i>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 dark:text-gray-400 text-sm font-medium">Promedio Response</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">2.3s</p>
              <p class="text-success text-sm mt-1">
                <i class="fas fa-clock"></i> Muy rápido
              </p>
            </div>
            <div class="bg-primary/10 p-3 rounded-lg">
              <i class="fas fa-tachometer-alt text-primary text-xl"></i>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 dark:text-gray-400 text-sm font-medium">Canales Activos</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">2</p>
              <p class="text-primary text-sm mt-1">
                <i class="fas fa-broadcast-tower"></i> Discord, Telegram
              </p>
            </div>
            <div class="bg-warning/10 p-3 rounded-lg">
              <i class="fas fa-satellite-dish text-warning text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Active Alerts */}
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 mb-8">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">
            <i class="fas fa-exclamation-triangle text-danger mr-2"></i>
            Alertas Activas
          </h3>
          <div class="flex space-x-2">
            <button class="bg-danger hover:bg-danger/80 text-white px-4 py-2 rounded-lg transition-colors">
              <i class="fas fa-times mr-2"></i>Resolver Todas
            </button>
            <button class="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg transition-colors">
              <i class="fas fa-refresh mr-2"></i>Actualizar
            </button>
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex items-start justify-between p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div class="flex items-start space-x-3">
              <div class="w-8 h-8 bg-danger rounded-lg flex items-center justify-center">
                <i class="fas fa-exclamation text-white text-sm"></i>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">Gas Price Crítico en Ethereum</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  El precio del gas ha excedido 150 gwei. Estrategias pausadas automáticamente.
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  <i class="fas fa-clock mr-1"></i>Hace 5 minutos
                </p>
              </div>
            </div>
            <div class="flex space-x-2">
              <button class="text-primary hover:text-secondary">
                <i class="fas fa-eye"></i>
              </button>
              <button class="text-danger hover:text-danger/80">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>

          <div class="flex items-start justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div class="flex items-start space-x-3">
              <div class="w-8 h-8 bg-warning rounded-lg flex items-center justify-center">
                <i class="fas fa-exclamation-triangle text-white text-sm"></i>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">Conexión Inestable - BSC</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Latencia elevada detectada en Binance Smart Chain (&gt;500ms).
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  <i class="fas fa-clock mr-1"></i>Hace 12 minutos
                </p>
              </div>
            </div>
            <div class="flex space-x-2">
              <button class="text-primary hover:text-secondary">
                <i class="fas fa-eye"></i>
              </button>
              <button class="text-danger hover:text-danger/80">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>

          <div class="flex items-start justify-between p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div class="flex items-start space-x-3">
              <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <i class="fas fa-info text-white text-sm"></i>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">Nueva Oportunidad Detectada</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Gran oportunidad de arbitraje detectada: ETH/USDC en Polygon (3.2% profit).
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  <i class="fas fa-clock mr-1"></i>Hace 18 minutos
                </p>
              </div>
            </div>
            <div class="flex space-x-2">
              <button class="text-primary hover:text-secondary">
                <i class="fas fa-eye"></i>
              </button>
              <button class="text-danger hover:text-danger/80">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Alert History and Notification Channels */}
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Alert History */}
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                <i class="fas fa-history text-primary mr-2"></i>
                Historial de Alertas
              </h3>
              <div class="flex space-x-2">
                <select class="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm">
                  <option>Todas</option>
                  <option>Críticas</option>
                  <option>Advertencias</option>
                  <option>Informativas</option>
                </select>
              </div>
            </div>
          </div>

          <div class="p-6">
            <div class="space-y-4 max-h-96 overflow-y-auto">
              <div class="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div class="w-2 h-2 bg-success rounded-full mt-2"></div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">Trade ejecutado exitosamente</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Flash loan arbitrage en Ethereum - Profit: $145.67
                  </p>
                  <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">15:42:30</p>
                </div>
              </div>

              <div class="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div class="w-2 h-2 bg-warning rounded-full mt-2"></div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">Slippage elevado detectado</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Slippage de 1.2% en MATIC/USDC - Trade cancelado
                  </p>
                  <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">15:38:15</p>
                </div>
              </div>

              <div class="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div class="w-2 h-2 bg-success rounded-full mt-2"></div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">Sistema reactivado</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Todas las estrategias reanudadas después del mantenimiento
                  </p>
                  <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">15:35:22</p>
                </div>
              </div>

              <div class="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div class="w-2 h-2 bg-danger rounded-full mt-2"></div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">Fallo en transacción</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Transaction reverted - Gas insuficiente en Arbitrum
                  </p>
                  <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">15:30:45</p>
                </div>
              </div>

              <div class="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div class="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">Nueva oportunidad</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Triangle arbitrage disponible en Solana - 2.8% profit
                  </p>
                  <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">15:28:12</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Channels */}
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              <i class="fas fa-broadcast-tower text-warning mr-2"></i>
              Canales de Notificación
            </h3>
          </div>

          <div class="p-6 space-y-6">
            {/* Discord */}
            <div class="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                    <i class="fab fa-discord text-purple-600"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 dark:text-white">Discord</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Canal: #arbitrage-alerts</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="w-3 h-3 bg-success rounded-full"></span>
                  <span class="text-sm font-medium text-success">Activo</span>
                </div>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Último mensaje: hace 2min</span>
                <button class="text-purple-600 hover:text-purple-800 font-medium">
                  <i class="fas fa-cog mr-1"></i>Configurar
                </button>
              </div>
            </div>

            {/* Telegram */}
            <div class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <i class="fab fa-telegram text-blue-600"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 dark:text-white">Telegram</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Bot: @ArbitrageX_Bot</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="w-3 h-3 bg-success rounded-full"></span>
                  <span class="text-sm font-medium text-success">Activo</span>
                </div>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Último mensaje: hace 5min</span>
                <button class="text-blue-600 hover:text-blue-800 font-medium">
                  <i class="fas fa-cog mr-1"></i>Configurar
                </button>
              </div>
            </div>

            {/* Email */}
            <div class="p-4 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg opacity-60">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <i class="fas fa-envelope text-gray-600"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 dark:text-white">Email</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">admin@arbitragex.com</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="w-3 h-3 bg-gray-400 rounded-full"></span>
                  <span class="text-sm font-medium text-gray-500">Desactivado</span>
                </div>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-500 dark:text-gray-500">No configurado</span>
                <button class="text-gray-600 hover:text-gray-800 font-medium">
                  <i class="fas fa-plus mr-1"></i>Activar
                </button>
              </div>
            </div>

            {/* Test Notification Button */}
            <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
              <button class="w-full bg-primary hover:bg-secondary text-white py-2 px-4 rounded-lg transition-colors">
                <i class="fas fa-paper-plane mr-2"></i>
                Enviar Notificación de Prueba
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Rules Configuration */}
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">
            <i class="fas fa-rules text-primary mr-2"></i>
            Reglas de Alertas
          </h3>
          <button class="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg transition-colors">
            <i class="fas fa-plus mr-2"></i>Nueva Regla
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th class="text-left py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Nombre</th>
                <th class="text-left py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Condición</th>
                <th class="text-left py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Prioridad</th>
                <th class="text-center py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Estado</th>
                <th class="text-right py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Disparos</th>
                <th class="text-center py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td class="py-4 px-6 font-medium text-gray-900 dark:text-white">Gas Price Alto</td>
                <td class="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">Gas &gt; 100 gwei</td>
                <td class="py-4 px-6">
                  <span class="bg-danger/10 text-danger px-2 py-1 rounded-full text-xs font-medium">Crítica</span>
                </td>
                <td class="py-4 px-6 text-center">
                  <span class="bg-success/10 text-success px-2 py-1 rounded-full text-xs font-medium">Activa</span>
                </td>
                <td class="py-4 px-6 text-right font-medium">127</td>
                <td class="py-4 px-6 text-center">
                  <div class="flex items-center justify-center space-x-2">
                    <button class="text-primary hover:text-secondary">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="text-warning hover:text-warning/80">
                      <i class="fas fa-pause"></i>
                    </button>
                    <button class="text-danger hover:text-danger/80">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>

              <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td class="py-4 px-6 font-medium text-gray-900 dark:text-white">Gran Oportunidad</td>
                <td class="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">Profit &gt; $500</td>
                <td class="py-4 px-6">
                  <span class="bg-success/10 text-success px-2 py-1 rounded-full text-xs font-medium">Alta</span>
                </td>
                <td class="py-4 px-6 text-center">
                  <span class="bg-success/10 text-success px-2 py-1 rounded-full text-xs font-medium">Activa</span>
                </td>
                <td class="py-4 px-6 text-right font-medium">43</td>
                <td class="py-4 px-6 text-center">
                  <div class="flex items-center justify-center space-x-2">
                    <button class="text-primary hover:text-secondary">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="text-warning hover:text-warning/80">
                      <i class="fas fa-pause"></i>
                    </button>
                    <button class="text-danger hover:text-danger/80">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>

              <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td class="py-4 px-6 font-medium text-gray-900 dark:text-white">Conexión Perdida</td>
                <td class="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">Latencia &gt; 1000ms</td>
                <td class="py-4 px-6">
                  <span class="bg-warning/10 text-warning px-2 py-1 rounded-full text-xs font-medium">Media</span>
                </td>
                <td class="py-4 px-6 text-center">
                  <span class="bg-success/10 text-success px-2 py-1 rounded-full text-xs font-medium">Activa</span>
                </td>
                <td class="py-4 px-6 text-right font-medium">8</td>
                <td class="py-4 px-6 text-center">
                  <div class="flex items-center justify-center space-x-2">
                    <button class="text-primary hover:text-secondary">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="text-warning hover:text-warning/80">
                      <i class="fas fa-pause"></i>
                    </button>
                    <button class="text-danger hover:text-danger/80">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}