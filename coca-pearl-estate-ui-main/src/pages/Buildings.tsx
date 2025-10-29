import React, { useState } from 'react';
import { Plus, Building2, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Progress } from '@/components/ui/progress';
import { DashboardLayout } from '@/components/DashboardLayout';
import { AddBuildingModal } from '@/components/AddBuildingModal';
import BuildingDetailDrawer from "@/components/BuildingDetailDrawer";

export interface Building {
  id: string;
  name: string;
  wings: number;
  floors: number;
  unitsPerFloor: number;
  totalUnits: number;
  bookedUnits: number;
  availableUnits: number;
}

const Buildings: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [buildingToDelete, setBuildingToDelete] = useState<string | null>(null);
  const [buildings, setBuildings] = useState<Building[]>([
    {
      id: '1',
      name: 'Sunshine Towers',
      wings: 2,
      floors: 5,
      unitsPerFloor: 4,
      totalUnits: 40,
      bookedUnits: 24,
      availableUnits: 16
    },
    {
      id: '2', 
      name: 'Green Valley Apartments',
      wings: 3,
      floors: 8,
      unitsPerFloor: 6,
      totalUnits: 144,
      bookedUnits: 89,
      availableUnits: 55
    }
  ]);

  const handleAddBuilding = (buildingData: {
    name: string;
    wings: number;
    floors: number;
    unitsPerFloor: number;
  }) => {
    const totalUnits = buildingData.wings * buildingData.floors * buildingData.unitsPerFloor;
    const newBuilding: Building = {
      id: Date.now().toString(),
      ...buildingData,
      totalUnits,
      bookedUnits: 0,
      availableUnits: totalUnits
    };
    
    setBuildings([...buildings, newBuilding]);
    setShowAddModal(false);
  };

  const handleDeleteBuilding = (buildingId: string) => {
    setBuildingToDelete(buildingId);
    setShowDeleteAlert(true);
  };

  const confirmDeleteBuilding = () => {
    if (buildingToDelete) {
      setBuildings(buildings.filter(b => b.id !== buildingToDelete));
      setBuildingToDelete(null);
    }
    setShowDeleteAlert(false);
  };

  const handleBuildingClick = (buildingId: string) => {
    const building = buildings.find(b => b.id === buildingId);
    if (building) {
      setSelectedBuilding(building);
      setShowDrawer(true);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Builder Management Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your buildings and units</p>
          </div>
          <Button 
            onClick={() => setShowAddModal(true)}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Building
          </Button>
        </div>

        {/* Buildings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buildings.map((building) => {
            const occupancyRate = (building.bookedUnits / building.totalUnits) * 100;
            
            return (
              <Card 
                key={building.id}
                className="cursor-pointer hover:shadow-elevated transition-all duration-200 hover:scale-105 bg-surface border-accent/20"
                onClick={() => handleBuildingClick(building.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-foreground">
                      {building.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent card click event
                            handleDeleteBuilding(building.id);
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      <Building2 className="w-5 h-5 text-accent" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Wings</p>
                      <p className="font-medium text-foreground">{building.wings}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Floors</p>
                      <p className="font-medium text-foreground">{building.floors}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Units</p>
                      <p className="font-medium text-foreground">{building.totalUnits}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Available</p>
                      <p className="font-medium text-success">{building.availableUnits}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Occupancy</span>
                      <span className="font-medium text-foreground">
                        {building.bookedUnits}/{building.totalUnits} ({occupancyRate.toFixed(1)}%)
                      </span>
                    </div>
                    <Progress 
                      value={occupancyRate} 
                      className="h-2 bg-surface-secondary"
                    />
                    <div className="flex justify-between text-xs">
                      <span className="text-success">Available: {building.availableUnits}</span>
                      <span className="text-destructive">Booked: {building.bookedUnits}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {buildings.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No buildings yet</h3>
            <p className="text-muted-foreground mb-4">Get started by adding your first building</p>
            <Button 
              onClick={() => setShowAddModal(true)}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Building
            </Button>
          </div>
        )}
      </div>

      <AddBuildingModal 
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddBuilding}
      />

      <BuildingDetailDrawer
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        building={selectedBuilding}
      />

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the building
              and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteBuilding}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default Buildings;