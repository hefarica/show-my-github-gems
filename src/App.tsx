import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* Placeholder routes for the sidebar navigation */}
            <Route path="/opportunities" element={<div className="p-6"><h1 className="text-2xl font-bold">Opportunities</h1><p>Coming soon...</p></div>} />
            <Route path="/executions" element={<div className="p-6"><h1 className="text-2xl font-bold">Executions</h1><p>Coming soon...</p></div>} />
            <Route path="/portfolio" element={<div className="p-6"><h1 className="text-2xl font-bold">Portfolio</h1><p>Coming soon...</p></div>} />
            <Route path="/analytics" element={<div className="p-6"><h1 className="text-2xl font-bold">Analytics</h1><p>Coming soon...</p></div>} />
            <Route path="/trading" element={<div className="p-6"><h1 className="text-2xl font-bold">Live Trading</h1><p>Coming soon...</p></div>} />
            <Route path="/risk" element={<div className="p-6"><h1 className="text-2xl font-bold">Risk Management</h1><p>Coming soon...</p></div>} />
            <Route path="/alerts" element={<div className="p-6"><h1 className="text-2xl font-bold">Alerts</h1><p>Coming soon...</p></div>} />
            <Route path="/history" element={<div className="p-6"><h1 className="text-2xl font-bold">History</h1><p>Coming soon...</p></div>} />
            <Route path="/networks" element={<div className="p-6"><h1 className="text-2xl font-bold">Networks</h1><p>Coming soon...</p></div>} />
            <Route path="/monitoring" element={<div className="p-6"><h1 className="text-2xl font-bold">Monitoring</h1><p>Coming soon...</p></div>} />
            <Route path="/settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings</h1><p>Coming soon...</p></div>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;