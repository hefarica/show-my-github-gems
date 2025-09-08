import { Layout } from './Layout'

export const ConfigurationView = () => {
  return (
    <Layout title="Configuración del Sistema" activeSection="configuration">
      {/* Configuration Sections */}
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* General Settings */}
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center mb-6">
            <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
              <i class="fas fa-cog text-primary"></i>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Configuración General</h3>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Modo de Operación
              </label>
              <select class="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2">
                <option>Automático</option>
                <option>Manual</option>
                <option>Simulación</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Intervalo de Scan (segundos)
              </label>
              <input 
                type="number" 
                value="5" 
                min="1" 
                max="60"
                class="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Límite de Gas (gwei)
              </label>
              <input 
                type="number" 
                value="50" 
                min="1" 
                max="500"
                class="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2"
              />
            </div>

            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Dark Mode</span>
              <button class="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-primary transition-colors focus:outline-none">
                <span class="inline-block h-4 w-4 transform rounded-full bg-white transition dark:translate-x-6"></span>
              </button>
            </div>

            <button class="w-full bg-primary hover:bg-secondary text-white py-2 rounded-lg transition-colors">
              <i class="fas fa-save mr-2"></i>Guardar Configuración
            </button>
          </div>
        </div>

        {/* MEV Settings */}
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center mb-6">
            <div class="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center mr-3">
              <i class="fas fa-bolt text-success"></i>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Configuración MEV</h3>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Beneficio Mínimo (USD)
              </label>
              <input 
                type="number" 
                value="10" 
                min="1" 
                step="0.1"
                class="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Slippage Máximo (%)
              </label>
              <input 
                type="number" 
                value="0.5" 
                min="0.1" 
                max="5" 
                step="0.1"
                class="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Timeout de Transacción (seg)
              </label>
              <input 
                type="number" 
                value="30" 
                min="10" 
                max="300"
                class="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2"
              />
            </div>

            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Flash Loans</span>
              <button class="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors focus:outline-none">
                <span class="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition"></span>
              </button>
            </div>

            <button class="w-full bg-success hover:bg-success/80 text-white py-2 rounded-lg transition-colors">
              <i class="fas fa-save mr-2"></i>Guardar MEV Config
            </button>
          </div>
        </div>

        {/* Risk Management */}
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center mb-6">
            <div class="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center mr-3">
              <i class="fas fa-shield-alt text-warning"></i>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Gestión de Riesgos</h3>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Capital Máximo por Trade (ETH)
              </label>
              <input 
                type="number" 
                value="1.0" 
                min="0.1" 
                step="0.1"
                class="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Máximo Trades/Hora
              </label>
              <input 
                type="number" 
                value="100" 
                min="1" 
                max="1000"
                class="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Stop Loss (%)
              </label>
              <input 
                type="number" 
                value="2.0" 
                min="0.5" 
                max="10" 
                step="0.1"
                class="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2"
              />
            </div>

            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Auto-Pause on Loss</span>
              <button class="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors focus:outline-none">
                <span class="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition"></span>
              </button>
            </div>

            <button class="w-full bg-warning hover:bg-warning/80 text-white py-2 rounded-lg transition-colors">
              <i class="fas fa-save mr-2"></i>Guardar Risk Config
            </button>
          </div>
        </div>
      </div>

      {/* API Configuration */}
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              <i class="fas fa-key text-primary mr-2"></i>
              Configuración de APIs
            </h3>
            <button class="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg transition-colors">
              <i class="fas fa-test mr-2"></i>Probar APIs
            </button>
          </div>

          <div class="space-y-6">
            <div>
              <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">RPC Endpoints</h4>
              <div class="space-y-3">
                <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">Ethereum</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">https://eth-mainnet.g.alchemy.com/v2/...</p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="w-3 h-3 bg-success rounded-full"></span>
                    <button class="text-primary hover:text-secondary">
                      <i class="fas fa-edit"></i>
                    </button>
                  </div>
                </div>

                <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">Polygon</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">https://polygon-rpc.com</p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="w-3 h-3 bg-success rounded-full"></span>
                    <button class="text-primary hover:text-secondary">
                      <i class="fas fa-edit"></i>
                    </button>
                  </div>
                </div>

                <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">Solana</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">https://api.mainnet-beta.solana.com</p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="w-3 h-3 bg-success rounded-full"></span>
                    <button class="text-primary hover:text-secondary">
                      <i class="fas fa-edit"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">External APIs</h4>
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600 dark:text-gray-400">CoinGecko API</span>
                  <span class="text-success text-sm"><i class="fas fa-check-circle"></i> Configurado</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600 dark:text-gray-400">1inch API</span>
                  <span class="text-success text-sm"><i class="fas fa-check-circle"></i> Configurado</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Jupiter API</span>
                  <span class="text-success text-sm"><i class="fas fa-check-circle"></i> Configurado</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              <i class="fas fa-bell text-warning mr-2"></i>
              Configuración de Notificaciones
            </h3>
          </div>

          <div class="space-y-6">
            <div>
              <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Canales de Notificación</h4>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <i class="fab fa-discord text-purple-600 mr-3"></i>
                    <span class="text-sm font-medium">Discord</span>
                  </div>
                  <button class="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors focus:outline-none">
                    <span class="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition"></span>
                  </button>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <i class="fab fa-telegram text-blue-500 mr-3"></i>
                    <span class="text-sm font-medium">Telegram</span>
                  </div>
                  <button class="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors focus:outline-none">
                    <span class="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition"></span>
                  </button>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <i class="fas fa-envelope text-gray-600 mr-3"></i>
                    <span class="text-sm font-medium">Email</span>
                  </div>
                  <button class="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none">
                    <span class="inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                  </button>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <i class="fab fa-slack text-green-600 mr-3"></i>
                    <span class="text-sm font-medium">Slack</span>
                  </div>
                  <button class="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none">
                    <span class="inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Tipos de Alertas</h4>
              <div class="space-y-3">
                <label class="flex items-center">
                  <input type="checkbox" checked class="rounded border-gray-300 text-primary focus:ring-primary" />
                  <span class="ml-3 text-sm text-gray-700 dark:text-gray-300">Oportunidades de arbitraje</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" checked class="rounded border-gray-300 text-primary focus:ring-primary" />
                  <span class="ml-3 text-sm text-gray-700 dark:text-gray-300">Trades ejecutados</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" class="rounded border-gray-300 text-primary focus:ring-primary" />
                  <span class="ml-3 text-sm text-gray-700 dark:text-gray-300">Errores del sistema</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" class="rounded border-gray-300 text-primary focus:ring-primary" />
                  <span class="ml-3 text-sm text-gray-700 dark:text-gray-300">Cambios de configuración</span>
                </label>
              </div>
            </div>

            <button class="w-full bg-warning hover:bg-warning/80 text-white py-2 rounded-lg transition-colors">
              <i class="fas fa-save mr-2"></i>Guardar Notificaciones
            </button>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">
            <i class="fas fa-lock text-danger mr-2"></i>
            Configuración de Seguridad
          </h3>
          <span class="bg-success/10 text-success px-3 py-1 rounded-full text-sm font-medium">
            <i class="fas fa-shield-check mr-1"></i>Seguro
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div class="flex items-center justify-between mb-3">
              <h4 class="font-medium text-gray-900 dark:text-white">Private Keys</h4>
              <span class="text-success"><i class="fas fa-check-circle"></i></span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Todas las claves están encriptadas y seguras</p>
            <button class="mt-2 text-primary hover:text-secondary text-sm">
              <i class="fas fa-key mr-1"></i>Gestionar claves
            </button>
          </div>

          <div class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div class="flex items-center justify-between mb-3">
              <h4 class="font-medium text-gray-900 dark:text-white">2FA</h4>
              <span class="text-warning"><i class="fas fa-exclamation-triangle"></i></span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Autenticación de dos factores no configurada</p>
            <button class="mt-2 text-primary hover:text-secondary text-sm">
              <i class="fas fa-mobile-alt mr-1"></i>Configurar 2FA
            </button>
          </div>

          <div class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div class="flex items-center justify-between mb-3">
              <h4 class="font-medium text-gray-900 dark:text-white">API Limits</h4>
              <span class="text-success"><i class="fas fa-check-circle"></i></span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Rate limiting activo para todas las APIs</p>
            <button class="mt-2 text-primary hover:text-secondary text-sm">
              <i class="fas fa-chart-bar mr-1"></i>Ver límites
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}