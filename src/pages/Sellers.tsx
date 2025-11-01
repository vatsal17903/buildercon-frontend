import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { PlusCircle, Edit, Trash2, Eye, RotateCcw, Users, Mail, Phone, Search } from 'lucide-react';
import { useAuth } from '@/components/AuthContext';

interface Seller {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  username: string;
  role: 'SUPER' | 'SELLER';
  unitsAssigned: number;
  unitsSold: number;
  totalRevenue: number;
  joinDate: string;
  status: 'active' | 'inactive';
}

const mockSellers: Seller[] = [
  {
    id: '1',
    fullName: 'John Smith',
    email: 'john.smith@company.com',
    phone: '+1234567890',
    username: 'jsmith',
    role: 'SELLER',
    unitsAssigned: 15,
    unitsSold: 8,
    totalRevenue: 12500000,
    joinDate: '2024-01-15',
    status: 'active'
  },
  {
    id: '2',
    fullName: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    phone: '+1234567891',
    username: 'sarahj',
    role: 'SELLER',
    unitsAssigned: 12,
    unitsSold: 10,
    totalRevenue: 18200000,
    joinDate: '2024-02-01',
    status: 'active'
  },
  {
    id: '3',
    fullName: 'Michael Brown',
    email: 'mike.brown@company.com',
    phone: '+1234567892',
    username: 'mbrown',
    role: 'SELLER',
    unitsAssigned: 20,
    unitsSold: 5,
    totalRevenue: 7800000,
    joinDate: '2024-03-10',
    status: 'inactive'
  },
  {
    id: '4',
    fullName: 'Admin User',
    email: 'admin@company.com',
    phone: '+1234567893',
    username: 'admin',
    role: 'SUPER',
    unitsAssigned: 0,
    unitsSold: 0,
    totalRevenue: 0,
    joinDate: '2024-01-01',
    status: 'active'
  }
];

const SellerCard: React.FC<{ seller: Seller; onEdit: () => void; onDelete: () => void; onViewUnits: () => void; onResetPassword: () => void }> = ({
  seller,
  onEdit,
  onDelete,
  onViewUnits,
  onResetPassword
}) => {
  const { user } = useAuth();
  const isSuper = user?.role === 'SUPER';
  
  const getRoleColor = (role: string) => {
    return role === 'SUPER' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground';
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground';
  };

  const conversionRate = seller.unitsAssigned > 0 ? (seller.unitsSold / seller.unitsAssigned * 100) : 0;

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{seller.fullName}</CardTitle>
          <div className="flex gap-2">
            <Badge className={getRoleColor(seller.role)} variant="secondary">
              {seller.role}
            </Badge>
            <Badge className={getStatusColor(seller.status)} variant="secondary">
              {seller.status}
            </Badge>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">@{seller.username}</div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{seller.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{seller.phone}</span>
          </div>
        </div>

        {seller.role === 'SELLER' && (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Assigned:</span>
                <div className="font-medium">{seller.unitsAssigned}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Sold:</span>
                <div className="font-medium text-success">{seller.unitsSold}</div>
              </div>
            </div>
            
            <div className="text-sm">
              <span className="text-muted-foreground">Conversion Rate:</span>
              <div className="font-medium text-primary">{conversionRate.toFixed(1)}%</div>
            </div>
            
            <div className="text-sm">
              <span className="text-muted-foreground">Revenue:</span>
              <div className="font-semibold text-primary">₹{seller.totalRevenue.toLocaleString()}</div>
            </div>
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          Joined: {new Date(seller.joinDate).toLocaleDateString()}
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={onViewUnits}>
            <Eye className="h-3 w-3 mr-1" />
            View Units
          </Button>
          
          {isSuper && (
            <>
              <Button variant="outline" size="sm" onClick={onEdit}>
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </Button>
              
              <Button variant="outline" size="sm" onClick={onResetPassword}>
                <RotateCcw className="h-3 w-3 mr-1" />
                Reset
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Seller</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete {seller.fullName}? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete} className="bg-destructive hover:bg-destructive/90">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const AddSellerModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    username: '',
    role: 'SELLER' as 'SUPER' | 'SELLER'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding seller:', formData);
    setOpen(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      username: '',
      role: 'SELLER'
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New Seller
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white border-accent/50 shadow-lg">
        <DialogHeader>
          <DialogTitle>Add New Seller</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="John Smith"
              required
              className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500"
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@company.com"
              required
              className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500"
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1234567890"
              required
              className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500"
            />
          </div>
          
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="jsmith"
              required
              className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500"
            />
          </div>
          
          <div>
            <Label htmlFor="role">Role</Label>
            <Select value={formData.role} onValueChange={(value: 'SUPER' | 'SELLER') => setFormData({ ...formData, role: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SELLER">Seller</SelectItem>
                <SelectItem value="SUPER">Super Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-accent/30 text-foreground hover:bg-surface-secondary"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-accent hover:bg-primary text-white"
            >
              Add Seller
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default function Sellers() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const isSuper = user?.role === 'SUPER';

  if (!isSuper) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <Card className="p-8 text-center">
            <CardContent>
              <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">Access Restricted</h2>
              <p className="text-muted-foreground">Only Super Admins can access the Sellers page.</p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  const filteredSellers = mockSellers.filter(seller => {
    const matchesSearch = seller.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seller.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seller.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || seller.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || seller.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalSellers = mockSellers.length;
  const activeSellers = mockSellers.filter(s => s.status === 'active').length;
  const totalRevenue = mockSellers.reduce((sum, s) => sum + s.totalRevenue, 0);
  const totalUnitsSold = mockSellers.reduce((sum, s) => sum + s.unitsSold, 0);

  const handleEdit = (seller: Seller) => {
    console.log('Edit seller:', seller);
  };

  const handleDelete = (seller: Seller) => {
    console.log('Delete seller:', seller);
  };

  const handleViewUnits = (seller: Seller) => {
    console.log('View units for seller:', seller);
  };

  const handleResetPassword = (seller: Seller) => {
    console.log('Reset password for seller:', seller);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Sellers Management</h1>
            <p className="text-muted-foreground">Manage sales team and their performance</p>
          </div>
          <AddSellerModal />
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                Total Sellers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSellers}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Sellers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{activeSellers}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Units Sold
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{totalUnitsSold}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">₹{(totalRevenue / 10000000).toFixed(1)}Cr</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search sellers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="SUPER">Super Admin</SelectItem>
              <SelectItem value="SELLER">Seller</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sellers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSellers.map((seller) => (
            <SellerCard
              key={seller.id}
              seller={seller}
              onEdit={() => handleEdit(seller)}
              onDelete={() => handleDelete(seller)}
              onViewUnits={() => handleViewUnits(seller)}
              onResetPassword={() => handleResetPassword(seller)}
            />
          ))}
        </div>

        {filteredSellers.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No sellers found</h3>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}