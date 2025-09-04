import { BarChart3, TrendingUp, Wallet, Settings, Bell, Activity, Zap, Shield, PieChart, History, Network, Target, DollarSign } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
const mainNavItems = [{
  title: "Dashboard",
  url: "/",
  icon: BarChart3
}, {
  title: "Opportunities",
  url: "/opportunities",
  icon: Target
}, {
  title: "Executions",
  url: "/executions",
  icon: Zap
}, {
  title: "Portfolio",
  url: "/portfolio",
  icon: Wallet
}, {
  title: "Analytics",
  url: "/analytics",
  icon: PieChart
}];
const tradingItems = [{
  title: "Live Trading",
  url: "/trading",
  icon: TrendingUp
}, {
  title: "Risk Management",
  url: "/risk",
  icon: Shield
}, {
  title: "Alerts",
  url: "/alerts",
  icon: Bell
}, {
  title: "History",
  url: "/history",
  icon: History
}];
const systemItems = [{
  title: "Networks",
  url: "/networks",
  icon: Network
}, {
  title: "Monitoring",
  url: "/monitoring",
  icon: Activity
}, {
  title: "Settings",
  url: "/settings",
  icon: Settings
}];
export function AppSidebar() {
  const {
    open
  } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({
    isActive
  }: {
    isActive: boolean;
  }) => isActive ? "bg-primary text-primary-foreground font-medium" : "hover:bg-accent/50";
  return <Sidebar collapsible="icon">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {open && <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-profit flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-profit-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">ArbitrageX</h1>
              <p className="text-xs text-sidebar-foreground/60">Supreme Trading</p>
            </div>
          </div>}
        <SidebarTrigger className="ml-auto" />
      </div>

      <SidebarContent className="p-2 rounded-sm">
        {/* Main Navigation */}
        <SidebarGroup>
          <div className="mb-3">
            <div className="relative bg-gradient-to-r from-white/5 via-primary/60 to-primary hover:from-white/8 hover:via-primary/80 hover:to-primary-hover rounded-lg p-3 flex items-center justify-between cursor-pointer transition-all duration-300 group shadow-lg hover:shadow-xl backdrop-blur-md border border-white/20">
              <div className="absolute inset-0 bg-gradient-to-r from-white/3 to-white/12 rounded-lg backdrop-blur-lg"></div>
              <div className="relative flex items-center gap-2 z-10">
                <BarChart3 className="h-5 w-5 text-primary-foreground drop-shadow-sm" />
                {open && <span className="text-primary-foreground font-semibold text-sm drop-shadow-sm">MENU PRINCIPAL</span>}
              </div>
              {open && <div className="relative text-primary-foreground/80 group-hover:text-primary-foreground transition-colors z-10 drop-shadow-sm">›</div>}
            </div>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map(item => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Trading Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 font-medium">
            Trading
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tradingItems.map(item => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* System Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 font-medium">
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map(item => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Status Indicator */}
        {open && <div className="mt-auto p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-profit animate-pulse"></div>
              <span className="text-sidebar-foreground/60">System Online</span>
            </div>
            <div className="text-xs text-sidebar-foreground/40 mt-1">
              5 chains connected
            </div>
          </div>}
      </SidebarContent>
    </Sidebar>;
}