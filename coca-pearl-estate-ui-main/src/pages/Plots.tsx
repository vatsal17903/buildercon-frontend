import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlusCircle, MapPin, Compass, DollarSign, Square, Eye } from 'lucide-react';
import PlotDetailDrawer from '@/components/PlotDetailDrawer';

interface Plot {
  id: string;
  plotNumber: string;
  area: number;
  price: string;
  facing: 'North' | 'South' | 'East' | 'West' | 'North-East' | 'North-West' | 'South-East' | 'South-West';
  status: 'available' | 'booked' | 'reserved';
  ownerName: string; // Changed from 'owner' to 'ownerName' for consistency with UnitDetailDrawer
  dimensions?: string;
  amenities?: string[];
  location: {
    lat: number;
    lng: number;
  };
  size: string; // Added size property
}

const mockPlots: Plot[] = [
  {
    id: '1',
    plotNumber: 'P001',
    area: 1200,
    price: '2400000',
    facing: 'North',
    status: 'available',
    ownerName: '',
    dimensions: '30x40',
    amenities: ['Water Connection', 'Electricity', 'Road Access'],
    location: { lat: 28.7041, lng: 77.1025 }, // Example location (Delhi, India)
    size: '1200 sq ft'
  },
  {
    id: '2',
    plotNumber: 'P002',
    area: 1500,
    price: '3000000',
    facing: 'East',
    status: 'booked',
    ownerName: 'Rajesh Kumar',
    dimensions: '30x50',
    amenities: ['Water Connection', 'Electricity', 'Road Access', 'Corner Plot'],
    location: { lat: 28.7050, lng: 77.1030 },
    size: '1500 sq ft'
  },
  {
    id: '3',
    plotNumber: 'P003',
    area: 1000,
    price: '2000000',
    facing: 'South',
    status: 'reserved',
    ownerName: '',
    dimensions: '25x40',
    amenities: ['Water Connection', 'Electricity'],
    location: { lat: 28.7060, lng: 77.1040 },
    size: '1000 sq ft'
  },
  {
    id: '4',
    plotNumber: 'P004',
    area: 1800,
    price: '3600000',
    facing: 'West',
    status: 'available',
    ownerName: '',
    dimensions: '36x50',
    amenities: ['Water Connection', 'Electricity', 'Road Access'],
    location: { lat: 28.7070, lng: 77.1050 },
    size: '1800 sq ft'
  },
  {
    id: '5',
    plotNumber: 'P005',
    area: 1300,
    price: '2600000',
    facing: 'North-East',
    status: 'available',
    ownerName: '',
    dimensions: '26x50',
    amenities: ['Water Connection', 'Electricity', 'Road Access'],
    location: { lat: 28.7080, lng: 77.1060 },
    size: '1300 sq ft'
  },
  {
    id: '6',
    plotNumber: 'P006',
    area: 900,
    price: '1800000',
    facing: 'South-West',
    status: 'booked',
    ownerName: 'Priya Sharma',
    dimensions: '30x30',
    amenities: ['Water Connection', 'Electricity'],
    location: { lat: 28.7090, lng: 77.1070 },
    size: '900 sq ft'
  }
];

const PlotCard: React.FC<{ plot: Plot; onViewDetails: (plot: Plot) => void }> = ({ plot, onViewDetails }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-success text-success-foreground';
      case 'booked': return 'bg-destructive text-destructive-foreground';
      case 'reserved': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return '🟢';
      case 'booked': return '🔴';
      case 'reserved': return '🟡';
      default: return '⚪';
    }
  };

  const pricePerSqFt = parseFloat(plot.price) / plot.area;

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <span className="text-xl">{getStatusIcon(plot.status)}</span>
            {plot.plotNumber}
          </CardTitle>
          <Badge className={getStatusColor(plot.status)} variant="secondary">
            {plot.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-muted-foreground flex items-center gap-1">
              <Square className="h-3 w-3" />
              Area:
            </span>
            <div className="font-medium">{plot.area} sq ft</div>
          </div>
          <div>
            <span className="text-muted-foreground flex items-center gap-1">
              <Compass className="h-3 w-3" />
              Facing:
            </span>
            <div className="font-medium">{plot.facing}</div>
          </div>
        </div>
        
        <div className="text-sm">
          <span className="text-muted-foreground">Dimensions:</span>
          <div className="font-medium">{plot.dimensions}</div>
        </div>
        
        <div className="space-y-1">
          <div className="text-sm">
            <span className="text-muted-foreground">Price:</span>
            <div className="font-semibold text-primary">₹{parseFloat(plot.price).toLocaleString()}</div>
          </div>
          <div className="text-xs text-muted-foreground">
            ₹{Math.round(pricePerSqFt).toLocaleString()}/sq ft
          </div>
        </div>

        {plot.ownerName && (
          <div className="pt-2 border-t">
            <div className="text-sm">
              <span className="text-muted-foreground">Owner:</span>
              <div className="font-medium">{plot.ownerName}</div>
            </div>
          </div>
        )}

        {plot.amenities && plot.amenities.length > 0 && (
          <div className="pt-2">
            <div className="text-xs text-muted-foreground mb-1">Amenities:</div>
            <div className="flex flex-wrap gap-1">
              {plot.amenities.slice(0, 2).map((amenity, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {amenity}
                </Badge>
              ))}
              {plot.amenities.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{plot.amenities.length - 2} more
                </Badge>
              )}
            </div>
          </div>
        )}
        
        <Button variant="outline" size="sm" className="w-full" onClick={() => onViewDetails(plot)}>
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

const AddPlotModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    plotNumber: '',
    area: '',
    price: '',
    facing: '',
    status: 'available',
    owner: '',
    dimensions: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding plot:', formData);
    setOpen(false);
    setFormData({
      plotNumber: '',
      area: '',
      price: '',
      facing: '',
      status: 'available',
      owner: '',
      dimensions: ''
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New Plot
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white border-accent/50 shadow-lg">
        <DialogHeader>
          <DialogTitle>Add New Plot</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="plotNumber">Plot Number</Label>
              <Input
                id="plotNumber"
                value={formData.plotNumber}
                onChange={(e) => setFormData({ ...formData, plotNumber: e.target.value })}
                placeholder="P001"
                required
                className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="area">Area (sq ft)</Label>
              <Input
                id="area"
                type="number"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                placeholder="1200"
                required
                className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="2400000"
                required
                className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="dimensions">Dimensions</Label>
              <Input
                id="dimensions"
                value={formData.dimensions}
                onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                placeholder="30x40"
                className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="facing">Facing</Label>
              <Select value={formData.facing} onValueChange={(value) => setFormData({ ...formData, facing: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select facing" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="North">North</SelectItem>
                  <SelectItem value="South">South</SelectItem>
                  <SelectItem value="East">East</SelectItem>
                  <SelectItem value="West">West</SelectItem>
                  <SelectItem value="North-East">North-East</SelectItem>
                  <SelectItem value="North-West">North-West</SelectItem>
                  <SelectItem value="South-East">South-East</SelectItem>
                  <SelectItem value="South-West">South-West</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
                  <SelectItem value="booked">Booked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {formData.status === 'booked' && (
            <div>
              <Label htmlFor="owner">Owner Name</Label>
              <Input
                id="owner"
                value={formData.owner}
                onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                placeholder="Enter owner name"
              />
            </div>
          )}
          
          <div className="flex gap-2 pt-4">
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
              Add Plot
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default function Plots() {
  const [isPlotDetailDrawerOpen, setIsPlotDetailDrawerOpen] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);

  const handleViewDetails = (plot: Plot) => {
    setSelectedPlot(plot);
    setIsPlotDetailDrawerOpen(true);
  };

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [facingFilter, setFacingFilter] = useState<string>('all');

  const filteredPlots = mockPlots.filter(plot => {
    const matchesStatus = statusFilter === 'all' || plot.status === statusFilter;
    const matchesFacing = facingFilter === 'all' || plot.facing === facingFilter;
    
    return matchesStatus && matchesFacing;
  });

  const totalPlots = mockPlots.length;
  const availablePlots = mockPlots.filter(p => p.status === 'available').length;
  const bookedPlots = mockPlots.filter(p => p.status === 'booked').length;
  const reservedPlots = mockPlots.filter(p => p.status === 'reserved').length;
  const totalValue = mockPlots.reduce((sum, p) => sum + parseFloat(p.price), 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Plots Management</h1>
            <p className="text-muted-foreground">Manage and monitor all property plots</p>
          </div>
          <AddPlotModal />
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Total Plots
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPlots}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                🟢 Available
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{availablePlots}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                🔴 Booked
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{bookedPlots}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                🟡 Reserved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{reservedPlots}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Total Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-primary">₹{(totalValue / 10000000).toFixed(1)}Cr</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="available">🟢 Available</SelectItem>
              <SelectItem value="booked">🔴 Booked</SelectItem>
              <SelectItem value="reserved">🟡 Reserved</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={facingFilter} onValueChange={setFacingFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter by facing" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Facing</SelectItem>
              <SelectItem value="North">North</SelectItem>
              <SelectItem value="South">South</SelectItem>
              <SelectItem value="East">East</SelectItem>
              <SelectItem value="West">West</SelectItem>
              <SelectItem value="North-East">North-East</SelectItem>
              <SelectItem value="North-West">North-West</SelectItem>
              <SelectItem value="South-East">South-East</SelectItem>
              <SelectItem value="South-West">South-West</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Plots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlots.map((plot) => (
            <PlotCard key={plot.id} plot={plot} onViewDetails={handleViewDetails} />
          ))}
        </div>

        {filteredPlots.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center">
              <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No plots found</h3>
              <p className="text-sm text-muted-foreground">Try adjusting your filters or add a new plot.</p>
            </CardContent>
          </Card>
        )}

        {/* Optional Map Section Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Plot Location Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Map integration can be added here</p>
                <p className="text-sm text-muted-foreground">Leaflet or Google Maps integration</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedPlot && (
        <PlotDetailDrawer
          plot={selectedPlot}
          open={isPlotDetailDrawerOpen}
          onClose={() => setIsPlotDetailDrawerOpen(false)}
        />
      )}
    </DashboardLayout>
  );
}