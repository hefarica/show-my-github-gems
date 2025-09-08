interface LayoutProps {
  title: string
  activeSection: string
  children: any
}

export const Layout = ({ title, activeSection, children }: LayoutProps) => {
  const isActive = (section: string) => activeSection === section

  return (
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div class="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700">
        {/* Logo */}
        <div class="flex items-center justify-center h-20 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <i class="fas fa-chart-line text-white text-xl"></i>
            </div>
            <div>
              <h1 class="text-lg font-bold text-gray-900 dark:text-white">ArbitrageX</h1>
              <p class="text-xs text-gray-500 dark:text-gray-400">Supreme V3.0</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav class="mt-8">
          <div class="px-4 space-y-2">
            <a 
              href="/" 
              class={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive('dashboard') 
                  ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <i class="fas fa-home w-5 mr-3"></i>
              Dashboard
            </a>

            <a 
              href="/strategies" 
              class={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive('strategies') 
                  ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <i class="fas fa-cogs w-5 mr-3"></i>
              Estrategias
            </a>

            <a 
              href="/blockchains" 
              class={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive('blockchains') 
                  ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <i class="fas fa-network-wired w-5 mr-3"></i>
              Blockchains
            </a>

            <a 
              href="/analytics" 
              class={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive('analytics') 
                  ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <i class="fas fa-chart-bar w-5 mr-3"></i>
              Analíticas
            </a>

            <a 
              href="/alerts" 
              class={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive('alerts') 
                  ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <i class="fas fa-bell w-5 mr-3"></i>
              Alertas
              <span class="ml-auto bg-danger text-white text-xs px-2 py-1 rounded-full">3</span>
            </a>

            <a 
              href="/configuration" 
              class={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive('configuration') 
                  ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <i class="fas fa-sliders-h w-5 mr-3"></i>
              Configuración
            </a>
          </div>

          {/* System Status */}
          <div class="mt-8 mx-4 p-4 bg-success/10 border border-success/20 rounded-xl">
            <div class="flex items-center space-x-3 mb-2">
              <div class="w-3 h-3 bg-success rounded-full animate-pulse"></div>
              <span class="text-success font-medium text-sm">Sistema Online</span>
            </div>
            <p class="text-xs text-gray-600 dark:text-gray-400">
              MEV Engine activo<br/>
              12 blockchains conectadas
            </p>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div class="ml-64">
        {/* Top Header */}
        <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-8 py-4">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
              <p class="text-gray-500 dark:text-gray-400 mt-1">
                <i class="fas fa-clock mr-2"></i>
                <span id="current-time">Cargando...</span>
              </p>
            </div>

            <div class="flex items-center space-x-4">
              {/* Quick Actions */}
              <div class="flex items-center space-x-2">
                <button class="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg transition-colors">
                  <i class="fas fa-play mr-2"></i>
                  Iniciar Scan
                </button>
                <button class="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg transition-colors">
                  <i class="fas fa-pause mr-2"></i>
                  Pausar
                </button>
              </div>

              {/* Notifications */}
              <div class="relative">
                <button class="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                  <i class="fas fa-bell text-xl"></i>
                  <span class="absolute -top-1 -right-1 bg-danger text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">3</span>
                </button>
              </div>

              {/* User Menu */}
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <i class="fas fa-user text-white"></i>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">Admin</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Operador</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main class="p-8">
          {children}
        </main>
      </div>
    </div>
  )
}