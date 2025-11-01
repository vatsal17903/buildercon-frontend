import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronDown, ChevronUp, PlusCircle, Home, BarChart3 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface Unit {
  id: string;
  unitNumber: string;
  status: 'available' | 'booked' | 'reserved';
  type?: string;
  buyerName?: string;
}

interface Floor {
  id: string;
  floorNumber: number;
  totalUnits: number;
  bookedUnits: number;
  units: Unit[];
}

const mockFloors: Floor[] = [
  {
    id: '1',
    floorNumber: 1,
    totalUnits: 8,
    bookedUnits: 6,
    units: [
      { id: '1', unitNumber: '101', status: 'booked', type: '2BHK', buyerName: 'John Doe' },
      { id: '2', unitNumber: '102', status: 'booked', type: '1BHK', buyerName: 'Jane Smith' },
      { id: '3', unitNumber: '103', status: 'available' },
      { id: '4', unitNumber: '104', status: 'booked', type: '2BHK', buyerName: 'Mike Johnson' },
      { id: '5', unitNumber: '105', status: 'reserved' },
      { id: '6', unitNumber: '106', status: 'booked', type: '1BHK', buyerName: 'Sarah Wilson' },
      { id: '7', unitNumber: '107', status: 'booked', type: '2BHK', buyerName: 'Tom Brown' },
      { id: '8', unitNumber: '108', status: 'booked', type: '1BHK', buyerName: 'Lisa Davis' },
    ]
  },
  {
    id: '2',
    floorNumber: 2,
    totalUnits: 8,
    bookedUnits: 4,
    units: [
      { id: '9', unitNumber: '201', status: 'booked', type: '2BHK', buyerName: 'Alex Chen' },
      { id: '10', unitNumber: '202', status: 'available' },
      { id: '11', unitNumber: '203', status: 'available' },
      { id: '12', unitNumber: '204', status: 'booked', type: '2BHK', buyerName: 'Emma Wilson' },
      { id: '13', unitNumber: '205', status: 'available' },
      { id: '14', unitNumber: '206', status: 'booked', type: '1BHK', buyerName: 'David Lee' },
      { id: '15', unitNumber: '207', status: 'available' },
      { id: '16', unitNumber: '208', status: 'booked', type: '1BHK', buyerName: 'Maria Garcia' },
    ]
  },
  {
    id: '3',
    floorNumber: 3,
    totalUnits: 8,
    bookedUnits: 2,
    units: [
      { id: '17', unitNumber: '301', status: 'available' },
      { id: '18', unitNumber: '302', status: 'available' },
      { id: '19', unitNumber: '303', status: 'booked', type: '2BHK', buyerName: 'Robert Kim' },
      { id: '20', unitNumber: '304', status: 'available' },
      { id: '21', unitNumber: '305', status: 'available' },
      { id: '22', unitNumber: '306', status: 'available' },
      { id: '23', unitNumber: '307', status: 'booked', type: '1BHK', buyerName: 'Jennifer Liu' },
      { id: '24', unitNumber: '308', status: 'available' },
    ]
  }
];

const FloorCard: React.FC<{ floor: Floor; isExpanded: boolean; onToggle: () => void }> = ({
  floor,
  isExpanded,
  onToggle
}) => {
  const bookedPercentage = (floor.bookedUnits / floor.totalUnits) * 100;
  const availableUnits = floor.totalUnits - floor.bookedUnits;

  const pieData = [
    { name: 'Booked', value: floor.bookedUnits, color: 'hsl(var(--destructive))' },
    { name: 'Available', value: availableUnits, color: 'hsl(var(--success))' }
  ];

  const getUnitStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-success text-success-foreground';
      case 'booked': return 'bg-destructive text-destructive-foreground';
      case 'reserved': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Floor {floor.floorNumber}
            </CardTitle>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>Total: {floor.totalUnits}</span>
              <span>Booked: {floor.bookedUnits}</span>
              <span>Available: {availableUnits}</span>
            </div>
          </div>
          <Button variant="ghost" onClick={onToggle}>
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-2">
              <span>Occupancy</span>
              <span>{bookedPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={bookedPercentage} className="h-2" />
          </div>
          
          <div className="w-24 h-24">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={20}
                  outerRadius={40}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {floor.units.map((unit) => (
              <Card key={unit.id} className="p-3">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{unit.unitNumber}</span>
                    <Badge className={getUnitStatusColor(unit.status)} variant="secondary">
                      {unit.status}
                    </Badge>
                  </div>
                  {unit.type && (
                    <span className="text-sm text-muted-foreground">{unit.type}</span>
                  )}
                  {unit.buyerName && (
                    <span className="text-xs text-muted-foreground">{unit.buyerName}</span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default function Floors() {
  const [expandedFloors, setExpandedFloors] = useState<Set<string>>(new Set());

  const toggleFloor = (floorId: string) => {
    const newExpanded = new Set(expandedFloors);
    if (newExpanded.has(floorId)) {
      newExpanded.delete(floorId);
    } else {
      newExpanded.add(floorId);
    }
    setExpandedFloors(newExpanded);
  };

  const totalUnits = mockFloors.reduce((sum, floor) => sum + floor.totalUnits, 0);
  const totalBooked = mockFloors.reduce((sum, floor) => sum + floor.bookedUnits, 0);
  const overallOccupancy = (totalBooked / totalUnits) * 100;

  const chartData = mockFloors.map(floor => ({
    floor: `Floor ${floor.floorNumber}`,
    total: floor.totalUnits,
    booked: floor.bookedUnits,
    available: floor.totalUnits - floor.bookedUnits
  }));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Floors Management</h1>
            <p className="text-muted-foreground">Manage and monitor floor-wise unit distribution</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <PlusCircle className="h-4 w-4 mr-2" />
            Generate Units
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Floors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockFloors.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Units</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUnits}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Booked Units</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{totalBooked}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Occupancy Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{overallOccupancy.toFixed(1)}%</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="floors" className="space-y-4">
          <TabsList>
            <TabsTrigger value="floors">Floor Details</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="floors" className="space-y-4">
            {mockFloors.map((floor) => (
              <FloorCard
                key={floor.id}
                floor={floor}
                isExpanded={expandedFloors.has(floor.id)}
                onToggle={() => toggleFloor(floor.id)}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Floor-wise Unit Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="floor" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="booked" stackId="a" fill="hsl(var(--destructive))" name="Booked" />
                      <Bar dataKey="available" stackId="a" fill="hsl(var(--success))" name="Available" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}