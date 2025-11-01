import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, Search, Filter, DollarSign, Home, Users, TrendingUp, Calendar, Phone, Mail } from 'lucide-react';

interface Unit {
  id: string;
  unitNumber: string;
  floor: number;
  wing: string;
  type: string;
  size: number;
  pricePerSqFt: number;
  status: 'available' | 'booked' | 'reserved';
  buyerName?: string;
  buyerEmail?: string;
  buyerPhone?: string;
  bookingDate?: string;
  totalAmount?: number;
  paidAmount?: number;
  pendingAmount?: number;
}

interface Payment {
  id: string;
  unitNumber: string;
  buyerName: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'overdue' | 'paid';
}

const mockUnits: Unit[] = [
  {
    id: '1',
    unitNumber: '101',
    floor: 1,
    wing: 'A',
    type: '2BHK',
    size: 1200,
    pricePerSqFt: 3500,
    status: 'booked',
    buyerName: 'John Doe',
    buyerEmail: 'john@email.com',
    buyerPhone: '+1234567890',
    bookingDate: '2024-01-15',
    totalAmount: 4200000,
    paidAmount: 2100000,
    pendingAmount: 2100000
  },
  {
    id: '2',
    unitNumber: '102',
    floor: 1,
    wing: 'A',
    type: '1BHK',
    size: 800,
    pricePerSqFt: 3200,
    status: 'booked',
    buyerName: 'Jane Smith',
    buyerEmail: 'jane@email.com',
    buyerPhone: '+1234567891',
    bookingDate: '2024-01-20',
    totalAmount: 2560000,
    paidAmount: 1280000,
    pendingAmount: 1280000
  },
  {
    id: '3',
    unitNumber: '103',
    floor: 1,
    wing: 'A',
    type: '2BHK',
    size: 1200,
    pricePerSqFt: 3500,
    status: 'available'
  },
  {
    id: '4',
    unitNumber: '201',
    floor: 2,
    wing: 'A',
    type: '3BHK',
    size: 1500,
    pricePerSqFt: 3800,
    status: 'reserved'
  },
  {
    id: '5',
    unitNumber: '202',
    floor: 2,
    wing: 'A',
    type: '2BHK',
    size: 1200,
    pricePerSqFt: 3500,
    status: 'available'
  }
];

const mockPayments: Payment[] = [
  {
    id: '1',
    unitNumber: '101',
    buyerName: 'John Doe',
    amount: 1050000,
    dueDate: '2024-07-15',
    status: 'pending'
  },
  {
    id: '2',
    unitNumber: '102',
    buyerName: 'Jane Smith',
    amount: 640000,
    dueDate: '2024-07-10',
    status: 'overdue'
  }
];

const UnitCard: React.FC<{ unit: Unit }> = ({ unit }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-success text-success-foreground';
      case 'booked': return 'bg-destructive text-destructive-foreground';
      case 'reserved': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const totalValue = unit.size * unit.pricePerSqFt;

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{unit.unitNumber}</CardTitle>
          <Badge className={getStatusColor(unit.status)} variant="secondary">
            {unit.status}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          Wing {unit.wing} • Floor {unit.floor} • {unit.type}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-muted-foreground">Size:</span>
            <div className="font-medium">{unit.size} sq ft</div>
          </div>
          <div>
            <span className="text-muted-foreground">Rate:</span>
            <div className="font-medium">₹{unit.pricePerSqFt.toLocaleString()}/sq ft</div>
          </div>
        </div>
        
        <div className="text-sm">
          <span className="text-muted-foreground">Total Value:</span>
          <div className="font-semibold text-primary">₹{totalValue.toLocaleString()}</div>
        </div>

        {unit.status === 'booked' && unit.buyerName && (
          <div className="pt-2 border-t">
            <div className="text-sm font-medium text-foreground">{unit.buyerName}</div>
            <div className="text-xs text-muted-foreground">
              Paid: ₹{unit.paidAmount?.toLocaleString()} | 
              Pending: ₹{unit.pendingAmount?.toLocaleString()}
            </div>
          </div>
        )}
        
        <Button variant="outline" size="sm" className="w-full">
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default function Units() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredUnits = mockUnits.filter(unit => {
    const matchesSearch = unit.unitNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         unit.buyerName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || unit.status === statusFilter;
    const matchesType = typeFilter === 'all' || unit.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalUnits = mockUnits.length;
  const bookedUnits = mockUnits.filter(u => u.status === 'booked').length;
  const availableUnits = mockUnits.filter(u => u.status === 'available').length;
  const totalRevenue = mockUnits
    .filter(u => u.status === 'booked')
    .reduce((sum, u) => sum + (u.paidAmount || 0), 0);

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'overdue': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Units Management</h1>
            <p className="text-muted-foreground">Monitor and manage all property units</p>
          </div>
        </div>

        {/* Stats Header */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Home className="h-4 w-4" />
                Total Units
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUnits}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                Booked Units
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{bookedUnits}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Available Units
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{availableUnits}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">₹{totalRevenue.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="units" className="space-y-4">
          <TabsList>
            <TabsTrigger value="units">All Units</TabsTrigger>
            <TabsTrigger value="bookings">Booking History</TabsTrigger>
            <TabsTrigger value="payments">Pending Payments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="units" className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search units or buyers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="booked">Booked</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="1BHK">1BHK</SelectItem>
                  <SelectItem value="2BHK">2BHK</SelectItem>
                  <SelectItem value="3BHK">3BHK</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Units Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUnits.map((unit) => (
                <UnitCard key={unit.id} unit={unit} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Booking History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUnits.filter(u => u.status === 'booked').map((unit) => (
                    <div key={unit.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="font-medium">{unit.unitNumber}</div>
                          <div className="text-sm text-muted-foreground">
                            {unit.type} • {unit.size} sq ft
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">{unit.buyerName}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {unit.buyerEmail}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {unit.buyerPhone}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₹{unit.totalAmount?.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">
                          Booked on {unit.bookingDate}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Pending Payments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{payment.unitNumber}</div>
                        <div className="text-sm text-muted-foreground">{payment.buyerName}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₹{payment.amount.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Due: {payment.dueDate}</div>
                      </div>
                      <Badge className={getPaymentStatusColor(payment.status)} variant="secondary">
                        {payment.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}