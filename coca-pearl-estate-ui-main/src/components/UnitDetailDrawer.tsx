import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface UnitDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  unit: Unit | null;
}

interface Unit {
  id: string;
  name: string;
  status: 'available' | 'booked';
  // Add more unit details as needed for the form
  unitType?: string;
  size?: string;
  pricePerSqFt?: string;
  buyerName?: string;
  buyerEmail?: string;
  buyerPhone?: string;
  gstNumber?: string;
  municipalTax?: string;
  electricityTax?: string;
  paymentType?: string;
  paidAmount?: string;
  sellerName?: string;
  buildingName?: string;
}

const UnitDetailDrawer: React.FC<UnitDetailDrawerProps> = ({
  open,
  onClose,
  unit
}) => {

  if (!unit) return null;

  // Mock data for demonstration, replace with actual unit data
  const mockUnitDetails: Unit = {
    id: unit.id,
    name: unit.name,
    status: unit.status,
    unitType: 'Apartment',
    size: '1200',
    pricePerSqFt: '5000',
    buyerName: unit.status === 'booked' ? 'John Doe' : '',
    buyerEmail: unit.status === 'booked' ? 'john.doe@example.com' : '',
    buyerPhone: unit.status === 'booked' ? '123-456-7890' : '',
    gstNumber: unit.status === 'booked' ? 'GSTIN12345' : '',
    municipalTax: '50000',
    electricityTax: '10000',
    paymentType: unit.status === 'booked' ? 'bank-transfer' : '',
    paidAmount: unit.status === 'booked' ? '6000000' : '',
    sellerName: 'ABC Developers',
    buildingName: 'Pearl Residency',
  };

  const calculateCosts = () => {
    const baseCost = (parseFloat(mockUnitDetails.size || '0') || 0) * (parseFloat(mockUnitDetails.pricePerSqFt || '0') || 0);
    const municipalTax = parseFloat(mockUnitDetails.municipalTax || '0') || 0;
    const electricityTax = parseFloat(mockUnitDetails.electricityTax || '0') || 0;
    const totalCost = baseCost + municipalTax + electricityTax;
    const paidAmount = parseFloat(mockUnitDetails.paidAmount || '0') || 0;
    const pendingAmount = totalCost - paidAmount;

    return {
      baseCost,
      municipalTax,
      electricityTax,
      totalCost,
      paidAmount,
      pendingAmount,
    };
  };

  const calculations = calculateCosts();

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[75%] md:max-w-[75%] lg:max-w-[75%] bg-white max-h-screen overflow-y-auto rounded-l-lg transition-all duration-300 ease-in-out text-black"
      >
        <SheetHeader>
          <SheetTitle className="flex justify-between items-center">
            Unit {mockUnitDetails.name} Details
          </SheetTitle>
        </SheetHeader>

        <div className="p-4 space-y-6">
          {/* Seller and Building Details Section */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">General Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="buildingName" className="text-sm font-medium text-foreground">Building Name</Label>
                <Input id="buildingName" value={mockUnitDetails.buildingName} readOnly className="mt-1 bg-background border-accent/30" />
              </div>
              <div>
                <Label htmlFor="sellerName" className="text-sm font-medium text-foreground">Seller Name</Label>
                <Input id="sellerName" value={mockUnitDetails.sellerName} readOnly className="mt-1 bg-background border-accent/30" />
              </div>
            </div>
          </div>

          <Separator className="bg-accent/20" />
          {/* Unit Details Section */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Unit Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="unitType" className="text-sm font-medium text-foreground">Unit Type</Label>
                <Input id="unitType" value={mockUnitDetails.unitType} readOnly className="mt-1 bg-background border-accent/30" />
              </div>
              <div>
                <Label htmlFor="size" className="text-sm font-medium text-foreground">Size (Sq. Ft.)</Label>
                <Input id="size" value={mockUnitDetails.size} readOnly className="mt-1 bg-background border-accent/30" />
              </div>
              <div>
                <Label htmlFor="pricePerSqFt" className="text-sm font-medium text-foreground">Price per Sq. Ft. (₹)</Label>
                <Input id="pricePerSqFt" value={mockUnitDetails.pricePerSqFt} readOnly className="mt-1 bg-background border-accent/30" />
              </div>
            </div>
          </div>

          <Separator className="bg-accent/20" />

          {/* Buyer Information Section */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Buyer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="buyerName" className="text-sm font-medium text-foreground">Name</Label>
                <Input id="buyerName" value={mockUnitDetails.buyerName} readOnly className="mt-1 bg-background border-accent/30" />
              </div>
              <div>
                <Label htmlFor="buyerEmail" className="text-sm font-medium text-foreground">Email</Label>
                <Input id="buyerEmail" value={mockUnitDetails.buyerEmail} readOnly className="mt-1 bg-background border-accent/30" />
              </div>
              <div>
                <Label htmlFor="buyerPhone" className="text-sm font-medium text-foreground">Phone Number</Label>
                <Input id="buyerPhone" value={mockUnitDetails.buyerPhone} readOnly className="mt-1 bg-background border-accent/30" />
              </div>
              <div>
                <Label htmlFor="gstNumber" className="text-sm font-medium text-foreground">GST Number</Label>
                <Input id="gstNumber" value={mockUnitDetails.gstNumber} readOnly className="mt-1 bg-background border-accent/30" />
              </div>
            </div>
          </div>

          <Separator className="bg-accent/20" />

          {/* Taxes Section */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Taxes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="municipalTax" className="text-sm font-medium text-foreground">Municipal Corporation Tax (₹)</Label>
                <Input id="municipalTax" value={mockUnitDetails.municipalTax} readOnly className="mt-1 bg-background border-accent/30" />
              </div>
              <div>
                <Label htmlFor="electricityTax" className="text-sm font-medium text-foreground">Electricity Tax (₹)</Label>
                <Input id="electricityTax" value={mockUnitDetails.electricityTax} readOnly className="mt-1 bg-background border-accent/30" />
              </div>
            </div>
          </div>

          <Separator className="bg-accent/20" />

          {/* Payment Information Section */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Payment Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="paymentType" className="text-sm font-medium text-foreground">Payment Type</Label>
                <Select value={mockUnitDetails.paymentType} disabled>
                  <SelectTrigger className="mt-1 bg-background border-accent/30">
                    <SelectValue placeholder="Select payment type" />
                  </SelectTrigger>
                  <SelectContent className="bg-surface border-accent/20">
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="cheque">Cheque</SelectItem>
                    <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="paidAmount" className="text-sm font-medium text-foreground">Paid Amount (₹)</Label>
                <Input id="paidAmount" value={mockUnitDetails.paidAmount} readOnly className="mt-1 bg-background border-accent/30" />
              </div>
            </div>

            {/* Cost Summary */}
            <div className="mt-6 p-4 bg-surface-secondary rounded-lg border border-accent/20">
              <h4 className="font-medium text-foreground mb-3">Cost Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base Cost:</span>
                  <span className="text-foreground">₹{calculations.baseCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Municipal Tax:</span>
                  <span className="text-foreground">₹{calculations.municipalTax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Electricity Tax:</span>
                  <span className="text-foreground">₹{calculations.electricityTax.toLocaleString()}</span>
                </div>
                <Separator className="bg-accent/20" />
                <div className="flex justify-between font-medium">
                  <span className="text-foreground">Total Cost:</span>
                  <span className="text-accent text-lg">₹{calculations.totalCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Paid Amount:</span>
                  <span className="text-foreground">₹{calculations.paidAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-foreground">Pending Amount:</span>
                  <span className={calculations.pendingAmount > 0 ? "text-destructive" : "text-success"}>
                    ₹{calculations.pendingAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UnitDetailDrawer;