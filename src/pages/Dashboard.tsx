import React from 'react';
import { Building2, Home, Users, MapPin, TrendingUp, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useAuth } from '@/components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Mock data - replace with real API calls
  const dashboardData = {
    buildings: 24,
    units: { total: 156, available: 89, booked: 67 },
    sellers: 12,
    plots: 34,
    revenue: 2450000,
    recentSales: 8
  };

  const statsCards = [
    {
      title: 'Total Buildings',
      value: dashboardData.buildings,
      description: 'Active properties',
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Available Units',
      value: dashboardData.units.available,
      description: `${dashboardData.units.total} total units`,
      icon: Home,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Active Sellers',
      value: dashboardData.sellers,
      description: 'Registered sellers',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      showForRole: ['SUPER']
    },
    {
      title: 'Available Plots',
      value: dashboardData.plots,
      description: 'Land parcels',
      icon: MapPin,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      showForRole: ['SUPER']
    },
    {
      title: 'Monthly Revenue',
      value: `₹${(dashboardData.revenue / 100000).toFixed(1)}L`,
      description: 'This month',
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      showForRole: ['SUPER']
    },
    {
      title: 'Recent Sales',
      value: dashboardData.recentSales,
      description: 'Last 7 days',
      icon: TrendingUp,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ];

  const filteredStats = statsCards.filter(card => 
    !card.showForRole || card.showForRole.includes(user?.role || 'SELLER')
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your real estate portfolio.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStats.map((stat, index) => (
            <Card key={index} className="shadow-card hover:shadow-elevated transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-md ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates in your system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'New unit booking', details: 'Unit B-204 booked by John Doe', time: '2 hours ago' },
                  { action: 'Building added', details: 'Sunshine Towers added to inventory', time: '5 hours ago' },
                  { action: 'Seller registered', details: 'New seller: Sarah Johnson', time: '1 day ago' },
                  { action: 'Plot listing updated', details: 'Plot P-45 price modified', time: '2 days ago' }
                ].map((activity, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-sm text-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.details}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {(user?.role === 'SUPER' ? [
                  { label: 'Add Building', href: '/buildings' },
                  { label: 'Add Seller', href: '/sellers' },
                  { label: 'Create Plot', href: '/plots' },
                  { label: 'View Reports', href: '/reports' }
                ] : [
                  { label: 'My Units', href: '/units' },
                  { label: 'My Buildings', href: '/buildings' },
                  { label: 'View Bookings', href: '/units' },
                  { label: 'Dashboard', href: '/dashboard' }
                ]).map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => navigate(action.href)}
                    className="p-3 text-left justify-start h-auto hover:bg-accent hover:text-accent-foreground transition-colors text-sm font-medium"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;