import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface AddBuildingModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    wings: number;
    floors: number;
    unitsPerFloor: number;
  }) => void;
}

export const AddBuildingModal: React.FC<AddBuildingModalProps> = ({
  open,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    name: '',
    wings: 1,
    floors: 1,
    unitsPerFloor: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      return;
    }

    onSubmit(formData);
    setFormData({
      name: '',
      wings: 1,
      floors: 1,
      unitsPerFloor: 1
    });
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const totalUnits = formData.wings * formData.floors * formData.unitsPerFloor;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white border-accent/50 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Add New Building
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-foreground">
                Building Name
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter building name"
                className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="wings" className="text-sm font-medium text-foreground">
                  Number of Wings
                </Label>
                <Input
                  id="wings"
                  type="number"
                  min="1"
                  value={formData.wings}
                  onChange={(e) => handleInputChange('wings', parseInt(e.target.value) || 1)}
                  className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <Label htmlFor="floors" className="text-sm font-medium text-foreground">
                  Number of Floors
                </Label>
                <Input
                  id="floors"
                  type="number"
                  min="1"
                  value={formData.floors}
                  onChange={(e) => handleInputChange('floors', parseInt(e.target.value) || 1)}
                  className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="unitsPerFloor" className="text-sm font-medium text-foreground">
                Units Per Floor
              </Label>
              <Input
                id="unitsPerFloor"
                type="number"
                min="1"
                value={formData.unitsPerFloor}
                onChange={(e) => handleInputChange('unitsPerFloor', parseInt(e.target.value) || 1)}
                className="mt-1 bg-background border-accent/30 focus:border-accent"
                required
              />
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-muted-foreground">Total Units</p>
              <p className="text-2xl font-bold text-accent">{totalUnits}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {formData.wings} wings × {formData.floors} floors × {formData.unitsPerFloor} units
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-accent/30 text-foreground hover:bg-surface-secondary"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-accent hover:bg-primary text-white"
              disabled={!formData.name.trim()}
            >
              Create Building
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};