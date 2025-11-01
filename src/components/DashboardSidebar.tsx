import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Building2,
  Home,
  Layers,
  MapPin,
  Users,
  BarChart3,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { cn } from '@utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/AuthContext';

const navigationItems = [
  { title: 'Dashboard', url: '/dashboard', icon: BarChart3, roles: ['SUPER', 'SELLER'] },
  { title: 'Buildings', url: '/buildings', icon: Building2, roles: ['SUPER', 'SELLER'] },
  
  { title: 'Plots', url: '/plots', icon: MapPin, roles: ['SUPER'] },
  { title: 'Sellers', url: '/sellers', icon: Users, roles: ['SUPER'] },
];

interface DashboardSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  className?: string;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ collapsed, onToggle }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  const filteredItems = navigationItems.filter(item => 
    item.roles.includes(user?.role || 'SELLER')
  );

  const isActive = (path: string) => currentPath === path;
  
  const getNavClasses = (path: string) => cn(
    'flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors',
    'hover:bg-sidebar-accent hover:text-primary',
    isActive(path) 
      ? 'bg-sidebar-accent text-primary font-medium' 
      : 'text-sidebar-text'
  );

  return (
    <div className={cn(
      'flex flex-col h-full bg-sidebar-bg border-r border-dashboard-border transition-all duration-300',
      collapsed ? 'w-16' : 'w-64'
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-dashboard-border">
        {!collapsed ? (
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="relative animate-scale-in">
              <img 
                src="/buildercon_logo.png" 
                alt="BuilderCon Logo" 
                className="h-8 w-8 object-contain animate-[fadeInScale_0.8s_ease-out]"
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>
            <h1 className="text-lg font-semibold text-sidebar-text animate-[slideInRight_0.6s_ease-out]">BuilderCon</h1>
          </div>
        ) : (
          <div className="animate-scale-in">
            <img 
              src="/buildercon_logo.png" 
              alt="BuilderCon" 
              className="h-6 w-6 object-contain mx-auto"
              style={{
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                mixBlendMode: 'multiply'
              }}
            />
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-sidebar-accent transition-all duration-200 hover:scale-105"
        >
          <div className="flex flex-col gap-1 w-4 h-4 items-center justify-center">
            <div className={cn(
              "h-0.5 bg-sidebar-text transition-all duration-300",
              collapsed ? "w-4 rotate-0" : "w-3"
            )}></div>
            <div className={cn(
              "h-0.5 bg-sidebar-text transition-all duration-300",
              collapsed ? "w-4" : "w-4"
            )}></div>
            <div className={cn(
              "h-0.5 bg-sidebar-text transition-all duration-300",
              collapsed ? "w-4 rotate-0" : "w-3"
            )}></div>
          </div>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {filteredItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            className={getNavClasses(item.url)}
          >
            <item.icon className={cn('h-4 w-4', collapsed && 'mx-auto')} />
            {!collapsed && <span>{item.title}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User Info & Logout */}
      <div className="p-3 border-t border-dashboard-border">
        {!collapsed && user && (
          <div className="mb-3 p-2 rounded-md bg-sidebar-accent/10">
            <p className="text-xs text-sidebar-text opacity-75">Logged in as</p>
            <p className="text-sm font-medium text-sidebar-text">{user.username}</p>
            <p className="text-xs text-sidebar-accent">{user.role}</p>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className={cn(
            'text-sidebar-text hover:bg-destructive hover:text-destructive-foreground',
            collapsed ? 'w-full justify-center' : 'w-full justify-start gap-2'
          )}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
};