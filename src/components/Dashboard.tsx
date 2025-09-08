import { Layout } from './Layout'

export const Dashboard = () => {
  return (
    <Layout title="Dashboard Principal" activeSection="dashboard">
      {/* Header Stats */}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 dark:text-gray-400 text-sm font-medium">Ganancias Totales</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white" id="total-profit">$45,789.23</p>
              <p class="text-success text-sm mt-1">
                <i class="fas fa-arrow-up"></i> +12.5% este mes
              </p>
            </div>
            <div class="bg-success/10 p-3 rounded-lg">
              <i class="fas fa-dollar-sign text-success text-xl"></i>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 dark:text-gray-400 text-sm font-medium">Estrategias Activas</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white" id="active-strategies">8</p>
              <p class="text-primary text-sm mt-1">
                <i class="fas fa-chart-line"></i> de 13 disponibles
              </p>
            </div>
            <div class="bg-primary/10 p-3 rounded-lg">
              <i class="fas fa-cogs text-primary text-xl"></i>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 dark:text-gray-400 text-sm font-medium">Blockchains Conectadas</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white" id="connected-blockchains">12</p>
              <p class="text-success text-sm mt-1">
                <i class="fas fa-check-circle"></i> Todas operativas
              </p>
            </div>
            <div class="bg-warning/10 p-3 rounded-lg">
              <i class="fas fa-network-wired text-warning text-xl"></i>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 dark:text-gray-400 text-sm font-medium">Uptime Sistema</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white" id="system-uptime">99.97%</p>
              <p class="text-success text-sm mt-1">
                <i class="fas fa-server"></i> Sistema estable
              </p>
            </div>
            <div class="bg-success/10 p-3 rounded-lg">
              <i class="fas fa-heartbeat text-success text-xl animate-pulse"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Opportunities */}
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              <i class="fas fa-bolt text-warning mr-2"></i>
              Oportunidades en Tiempo Real
            </h3>
            <button class="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg transition-colors">
              <i class="fas fa-refresh mr-2"></i>Actualizar
            </button>
          </div>
          <div id="opportunities-list" class="space-y-4">
            {/* Opportunities will be loaded via JavaScript */}
            <div class="flex items-center justify-center py-8">
              <i class="fas fa-spinner fa-spin text-primary text-2xl mr-3"></i>
              <span class="text-gray-500">Cargando oportunidades...</span>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              <i class="fas fa-chart-pie text-success mr-2"></i>
              Rendimiento por Estrategia
            </h3>
            <select class="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2">
              <option>Últimas 24h</option>
              <option>Última semana</option>
              <option>Último mes</option>
            </select>
          </div>
          <canvas id="strategies-chart" width="400" height="200"></canvas>
        </div>
      </div>

      {/* Activity Feed */}
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">
            <i class="fas fa-history text-primary mr-2"></i>
            Actividad Reciente
          </h3>
          <div class="flex space-x-2">
            <button class="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg transition-colors">
              <i class="fas fa-filter mr-2"></i>Filtrar
            </button>
            <button class="bg-primary hover:bg-secondary text-white px-3 py-2 rounded-lg transition-colors">
              <i class="fas fa-download mr-2"></i>Exportar
            </button>
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-700">
                <th class="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Tiempo</th>
                <th class="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Estrategia</th>
                <th class="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Par</th>
                <th class="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Blockchain</th>
                <th class="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Ganancia</th>
                <th class="text-center py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Estado</th>
              </tr>
            </thead>
            <tbody id="activity-feed">
              {/* Activity items will be loaded via JavaScript */}
              <tr>
                <td colspan="6" class="text-center py-8 text-gray-500">
                  <i class="fas fa-spinner fa-spin mr-2"></i>
                  Cargando actividades recientes...
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}