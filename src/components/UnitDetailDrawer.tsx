import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface UnitDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  unit: Unit | null;
  onBookUnit?: (unitId: string, bookingData: any) => void;
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
  unit,
  onBookUnit
}) => {
  const [formData, setFormData] = useState({
    buyerName: '',
    buyerEmail: '',
    buyerPhone: '',
    gstNumber: '',
    municipalTax: '50000',
    electricityTax: '10000',
    paymentType: '',
    paidAmount: '',
    bookingDate: '',
    agreementDate: '',
    possessionDate: '',
    registrationDate: ''
  });

  // Update form data when unit changes
  React.useEffect(() => {
    if (unit) {
      setFormData({
        buyerName: (unit as any).buyerName || '',
        buyerEmail: (unit as any).buyerEmail || '',
        buyerPhone: (unit as any).buyerPhone || '',
        gstNumber: (unit as any).gstNumber || '',
        municipalTax: (unit as any).municipalTax || '50000',
        electricityTax: (unit as any).electricityTax || '10000',
        paymentType: (unit as any).paymentType || '',
        paidAmount: (unit as any).paidAmount?.toString() || '',
        bookingDate: (unit as any).bookingDate || '',
        agreementDate: (unit as any).agreementDate || '',
        possessionDate: (unit as any).possessionDate || '',
        registrationDate: (unit as any).registrationDate || ''
      });
    }
  }, [unit]);

  if (!unit) return null;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields for booking
    if (!formData.buyerName || !formData.buyerEmail || !formData.buyerPhone) {
      toast.error('Please fill in all required buyer information fields');
      return;
    }
    
    if (!formData.paidAmount || parseFloat(formData.paidAmount) <= 0) {
      toast.error('Please enter a valid paid amount');
      return;
    }
    
    // Prepare booking data
    const bookingData = {
      buyerName: formData.buyerName,
      buyerEmail: formData.buyerEmail,
      buyerPhone: formData.buyerPhone,
      gstNumber: formData.gstNumber,
      bookingDate: formData.bookingDate || new Date().toISOString().split('T')[0],
      agreementDate: formData.agreementDate,
      possessionDate: formData.possessionDate,
      registrationDate: formData.registrationDate,
      municipalTax: formData.municipalTax,
      electricityTax: formData.electricityTax,
      paymentType: formData.paymentType,
      paidAmount: formData.paidAmount,
      status: 'booked'
    };
    
    // Call the callback function to update unit status
    if (onBookUnit) {
      onBookUnit(unit.id, bookingData);
    }
  };

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
    const municipalTax = parseFloat(formData.municipalTax || '0') || 0;
    const electricityTax = parseFloat(formData.electricityTax || '0') || 0;
    const totalCost = baseCost + municipalTax + electricityTax;
    const paidAmount = parseFloat(formData.paidAmount || '0') || 0;
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

        <form onSubmit={handleSubmit}>
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
            <h3 className="text-lg font-medium text-foreground mb-4">
              {unit.status === 'booked' ? 'Customer Information' : 'Buyer Information'}
            </h3>
            {unit.status === 'booked' ? (
              // Display customer info for booked units (read-only)
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Customer Name</Label>
                    <p className="text-foreground font-semibold mt-1">{formData.buyerName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Email Address</Label>
                    <p className="text-foreground font-semibold mt-1">{formData.buyerEmail}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Phone Number</Label>
                    <p className="text-foreground font-semibold mt-1">{formData.buyerPhone}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">GST Number</Label>
                    <p className="text-foreground font-semibold mt-1">{formData.gstNumber || 'N/A'}</p>
                  </div>
                </div>
                
                {/* Booking Timeline */}
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Booking Timeline
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Booked on:</span>
                      <span className="font-medium text-foreground">{formData.bookingDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Agreement:</span>
                      <span className="font-medium text-foreground">{formData.agreementDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Possession:</span>
                      <span className="font-medium text-foreground">{formData.possessionDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Registered:</span>
                      <span className="font-medium text-foreground">{formData.registrationDate}</span>
                    </div>
                  </div>
                </div>
                
                {/* Booking Status Badge */}
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Status:</span>
                    <Badge className="bg-destructive text-destructive-foreground">
                      Unit Booked
                    </Badge>
                  </div>
                </div>
              </div>
            ) : (
              // Editable form for available units
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="buyerName" className="text-sm font-medium text-foreground">Name <span className="text-destructive">*</span></Label>
                  <Input 
                    id="buyerName" 
                    value={formData.buyerName} 
                    onChange={(e) => handleInputChange('buyerName', e.target.value)}
                    placeholder="Enter buyer name"
                    className="mt-1 bg-background border-accent/30 focus:border-accent" 
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="buyerEmail" className="text-sm font-medium text-foreground">Email <span className="text-destructive">*</span></Label>
                  <Input 
                    id="buyerEmail" 
                    type="email"
                    value={formData.buyerEmail} 
                    onChange={(e) => handleInputChange('buyerEmail', e.target.value)}
                    placeholder="Enter email address"
                    className="mt-1 bg-background border-accent/30 focus:border-accent" 
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="buyerPhone" className="text-sm font-medium text-foreground">Phone Number <span className="text-destructive">*</span></Label>
                  <Input 
                    id="buyerPhone" 
                    value={formData.buyerPhone} 
                    onChange={(e) => handleInputChange('buyerPhone', e.target.value)}
                    placeholder="Enter phone number"
                    className="mt-1 bg-background border-accent/30 focus:border-accent" 
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="gstNumber" className="text-sm font-medium text-foreground">GST Number</Label>
                  <Input 
                    id="gstNumber" 
                    value={formData.gstNumber} 
                    onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                    placeholder="Enter GST number (optional)"
                    className="mt-1 bg-background border-accent/30 focus:border-accent" 
                  />
                </div>
              </div>
            )}
          </div>

          {/* Booking Details Section - Only show for available units */}
          {unit.status === 'available' && (
            <>
              <Separator className="bg-accent/20" />
              
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4">Booking Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bookingDate" className="text-sm font-medium text-foreground">Booking Date</Label>
                    <Input 
                      id="bookingDate" 
                      type="date"
                      value={formData.bookingDate} 
                      onChange={(e) => handleInputChange('bookingDate', e.target.value)}
                      className="mt-1 bg-background border-accent/30 focus:border-accent" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="agreementDate" className="text-sm font-medium text-foreground">Agreement Date</Label>
                    <Input 
                      id="agreementDate" 
                      type="date"
                      value={formData.agreementDate} 
                      onChange={(e) => handleInputChange('agreementDate', e.target.value)}
                      className="mt-1 bg-background border-accent/30 focus:border-accent" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="possessionDate" className="text-sm font-medium text-foreground">Expected Possession Date</Label>
                    <Input 
                      id="possessionDate" 
                      type="date"
                      value={formData.possessionDate} 
                      onChange={(e) => handleInputChange('possessionDate', e.target.value)}
                      className="mt-1 bg-background border-accent/30 focus:border-accent" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="registrationDate" className="text-sm font-medium text-foreground">Registration Date</Label>
                    <Input 
                      id="registrationDate" 
                      type="date"
                      value={formData.registrationDate} 
                      onChange={(e) => handleInputChange('registrationDate', e.target.value)}
                      className="mt-1 bg-background border-accent/30 focus:border-accent" 
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          <Separator className="bg-accent/20" />

          {/* Taxes Section */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Taxes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="municipalTax" className="text-sm font-medium text-foreground">Municipal Corporation Tax (₹)</Label>
                <Input 
                  id="municipalTax" 
                  type="number"
                  value={formData.municipalTax} 
                  onChange={(e) => handleInputChange('municipalTax', e.target.value)}
                  className="mt-1 bg-background border-accent/30 focus:border-accent" 
                />
              </div>
              <div>
                <Label htmlFor="electricityTax" className="text-sm font-medium text-foreground">Electricity Tax (₹)</Label>
                <Input 
                  id="electricityTax" 
                  type="number"
                  value={formData.electricityTax} 
                  onChange={(e) => handleInputChange('electricityTax', e.target.value)}
                  className="mt-1 bg-background border-accent/30 focus:border-accent" 
                />
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
                <Select value={formData.paymentType} onValueChange={(value) => handleInputChange('paymentType', value)}>
                  <SelectTrigger className="mt-1 bg-background border-accent/30 focus:border-accent">
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
                <Input 
                  id="paidAmount" 
                  type="number"
                  value={formData.paidAmount} 
                  onChange={(e) => handleInputChange('paidAmount', e.target.value)}
                  placeholder="Enter paid amount"
                  className="mt-1 bg-background border-accent/30 focus:border-accent" 
                />
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

          {/* Submit Button - Only show for available units */}
          {unit.status === 'available' && (
            <div className="flex justify-end gap-3 pt-4 border-t border-accent/20">
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
              >
                Submit Unit Details
              </Button>
            </div>
          )}

          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default UnitDetailDrawer;