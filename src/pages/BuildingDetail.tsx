import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Home, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { DashboardLayout } from '@/components/DashboardLayout';
import { BookingModal } from '@/components/BookingModal';

interface Unit {
  id: string;
  number: string;
  wing: string;
  floor: number;
  status: 'AVAILABLE' | 'BOOKED';
  type?: string;
  size?: number;
  price?: number;
  buyer?: {
    name: string;
    email: string;
    phone: string;
  };
}

const BuildingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [openFloors, setOpenFloors] = useState<Set<number>>(new Set());

  // Mock building data - replace with API call
  const building = {
    id: id || '1',
    name: 'Sunshine Towers',
    address: '123 Main Street, City Center',
    wings: 2,
    floors: 5,
    unitsPerFloor: 4,
    totalUnits: 40,
    bookedUnits: 24,
    availableUnits: 16
  };

  // Generate mock units data
  const [units, setUnits] = useState<Unit[]>(() => {
    const generatedUnits: Unit[] = [];
    const wingLabels = ['A', 'B', 'C', 'D'];
    
    for (let w = 0; w < building.wings; w++) {
      for (let f = 1; f <= building.floors; f++) {
        for (let u = 1; u <= building.unitsPerFloor; u++) {
          const unitNumber = `${wingLabels[w]}${f}${u.toString().padStart(2, '0')}`;
          const isBooked = Math.random() > 0.6; // Random booking status
          
          generatedUnits.push({
            id: `${w}-${f}-${u}`,
            number: unitNumber,
            wing: wingLabels[w],
            floor: f,
            status: isBooked ? 'BOOKED' : 'AVAILABLE',
            type: isBooked ? ['1BHK', '2BHK', '3BHK'][Math.floor(Math.random() * 3)] : undefined,
            size: isBooked ? 800 + Math.floor(Math.random() * 800) : undefined,
            price: isBooked ? 4000 + Math.floor(Math.random() * 2000) : undefined,
            buyer: isBooked ? {
              name: ['John Doe', 'Jane Smith', 'Mike Johnson'][Math.floor(Math.random() * 3)],
              email: 'buyer@example.com',
              phone: '+91 9876543210'
            } : undefined
          });
        }
      }
    }
    
    return generatedUnits;
  });

  const getWingUnits = (wing: string) => {
    return units.filter(unit => unit.wing === wing);
  };

  const getFloorUnits = (wing: string, floor: number) => {
    return units.filter(unit => unit.wing === wing && unit.floor === floor);
  };

  const handleUnitClick = (unit: Unit) => {
    if (unit.status === 'AVAILABLE') {
      setSelectedUnit(unit);
      setShowBookingModal(true);
    }
  };

  const handleBookUnit = (bookingData: any) => {
    if (!selectedUnit) return;

    const updatedUnits = units.map(unit => 
      unit.id === selectedUnit.id 
        ? {
            ...unit,
            status: 'BOOKED' as const,
            type: bookingData.unitType, // Assuming unitType is passed from bookingData
            size: bookingData.size, // Assuming size is passed from bookingData
            price: bookingData.pricePerSqFt, // Assuming pricePerSqFt is passed from bookingData
            buyer: {
              name: bookingData.buyerName,
              email: bookingData.buyerEmail,
              phone: bookingData.buyerPhone
            }
          }
        : unit
    );

    setUnits(updatedUnits);
    setShowBookingModal(false);
    setSelectedUnit(null);
  };

  const wingLabels = Array.from(new Set(units.map(unit => unit.wing))).sort();

  const toggleFloor = (floorNumber: number) => {
    setOpenFloors(prev => {
      const newSet = new Set(prev);
      if (newSet.has(floorNumber)) {
        newSet.delete(floorNumber);
      } else {
        newSet.add(floorNumber);
      }
      return newSet;
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate('/buildings')}
              className="border-accent/30 hover:bg-surface-secondary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Buildings
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{building.name}</h1>
              <p className="text-muted-foreground flex items-center mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                {building.address}
              </p>
            </div>
          </div>
        </div>

        {/* Building Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-surface border-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Units</p>
                  <p className="text-2xl font-bold text-foreground">{building.totalUnits}</p>
                </div>
                <Home className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface border-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Available</p>
                  <p className="text-2xl font-bold text-success">{building.availableUnits}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface border-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Booked</p>
                  <p className="text-2xl font-bold text-destructive">{building.bookedUnits}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface border-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Occupancy</p>
                  <p className="text-2xl font-bold text-accent">
                    {((building.bookedUnits / building.totalUnits) * 100).toFixed(1)}%
                  </p>
                </div>
                <Users className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Floors and Units Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Floors & Units</h2>
          {Array.from({ length: building.floors }, (_, floorIndex) => {
            const floor = building.floors - floorIndex; // Top floor first
            const isFloorOpen = openFloors.has(floor);
            return (
              <Card key={floor} className="bg-surface border-accent/20">
                <CardHeader 
                  className="flex flex-row items-center justify-between space-y-0 pb-2 cursor-pointer"
                  onClick={() => toggleFloor(floor)}
                >
                  <CardTitle className="text-lg font-medium">Floor {floor}</CardTitle>
                  <Button variant="ghost" size="icon">
                    {isFloorOpen ? <ArrowLeft className="w-4 h-4 rotate-90" /> : <ArrowLeft className="w-4 h-4 -rotate-90" />}
                  </Button>
                </CardHeader>
                {isFloorOpen && (
                  <CardContent>
                    <Tabs defaultValue={wingLabels[0]} className="space-y-4">
                      <TabsList className="grid w-full grid-cols-2 md:w-auto">
                        {wingLabels.map(wing => (
                          <TabsTrigger key={wing} value={wing}>Wing {wing}</TabsTrigger>
                        ))}
                      </TabsList>
                      {wingLabels.map(wing => {
                        const floorUnits = getFloorUnits(wing, floor);
                        return (
                          <TabsContent key={wing} value={wing} className="space-y-4">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                              {floorUnits.map(unit => (
                                <Button
                                  key={unit.id}
                                  className={`h-24 w-full flex flex-col items-center justify-center text-center ${unit.status === 'AVAILABLE' ? 'text-success' : 'text-destructive'}`}
                                  onClick={() => handleUnitClick(unit)}
                                  disabled={unit.status === 'BOOKED'}
                                >
                                  <Home className="w-6 h-6 mb-1" />
                                  <span className="font-semibold">Unit {unit.number}</span>
                                  <span className="text-xs">{unit.status === 'BOOKED' ? 'Booked' : 'Available'}</span>
                                </Button>
                              ))}
                            </div>
                          </TabsContent>
                        );
                      })}
                    </Tabs>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      <BookingModal
        open={showBookingModal}
        onClose={() => {
          setShowBookingModal(false);
          setSelectedUnit(null);
        }}
        onSubmit={handleBookUnit}
      />
    </DashboardLayout>
  );
};

export default BuildingDetail;