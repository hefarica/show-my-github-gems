import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ArbitrageX Supreme V3.0 - Dashboard</title>
        
        {/* Tailwind CSS */}
        <script src="https://cdn.tailwindcss.com"></script>
        
        {/* Font Awesome Icons */}
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        
        {/* Chart.js for Analytics */}
        <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.min.js"></script>
        
        {/* Axios for API calls */}
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        
        {/* Day.js for date formatting */}
        <script src="https://cdn.jsdelivr.net/npm/dayjs@1.11.10/dayjs.min.js"></script>
        
        {/* Custom styles */}
        <link href="/static/style.css" rel="stylesheet" />
        
        {/* Tailwind Configuration */}
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    primary: '#3B82F6',
                    secondary: '#1E40AF',
                    success: '#10B981',
                    warning: '#F59E0B',
                    danger: '#EF4444',
                    dark: '#1F2937'
                  }
                }
              }
            }
          `
        }}></script>
      </head>
      <body class="bg-gray-50 dark:bg-gray-900 min-h-screen">
        {children}
        
        {/* Global JavaScript */}
        <script src="/static/app.js"></script>
      </body>
    </html>
  )
})
