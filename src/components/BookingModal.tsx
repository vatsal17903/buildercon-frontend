import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  open,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    // Unit Details
    unitType: '',
    size: '',
    pricePerSqFt: '',
    
    // Buyer Information
    buyerName: '',
    buyerEmail: '',
    buyerPhone: '',
    gstNumber: '',
    
    // Taxes
    municipalTax: '',
    electricityTax: '',
    
    // Payment Info
    paymentType: '',
    paidAmount: ''
  });

  const [calculations, setCalculations] = useState({
    totalCost: 0,
    pendingAmount: 0
  });

  // Calculate totals when relevant fields change
  useEffect(() => {
    const size = parseFloat(formData.size) || 0;
    const pricePerSqFt = parseFloat(formData.pricePerSqFt) || 0;
    const municipalTax = parseFloat(formData.municipalTax) || 0;
    const electricityTax = parseFloat(formData.electricityTax) || 0;
    const paidAmount = parseFloat(formData.paidAmount) || 0;

    const baseCost = size * pricePerSqFt;
    const totalCost = baseCost + municipalTax + electricityTax;
    const pendingAmount = totalCost - paidAmount;

    setCalculations({
      totalCost,
      pendingAmount: Math.max(0, pendingAmount)
    });
  }, [formData.size, formData.pricePerSqFt, formData.municipalTax, formData.electricityTax, formData.paidAmount]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.buyerName.trim() || !formData.unitType || !formData.size || !formData.pricePerSqFt) {
      return;
    }

    onSubmit({
      ...formData,
      calculations
    });

    // Reset form
    setFormData({
      unitType: '',
      size: '',
      pricePerSqFt: '',
      buyerName: '',
      buyerEmail: '',
      buyerPhone: '',
      gstNumber: '',
      municipalTax: '',
      electricityTax: '',
      paymentType: '',
      paidAmount: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };



  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-accent/50 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Book Unit
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Unit Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="unitType" className="text-sm font-medium text-foreground">
                  Unit Type
                </Label>
                <Select value={formData.unitType} onValueChange={(value) => handleInputChange('unitType', value)}>
                  <SelectTrigger className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500">
                    <SelectValue placeholder="Select unit type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-accent/50">
                    <SelectItem value="1BHK">1BHK</SelectItem>
                    <SelectItem value="2BHK">2BHK</SelectItem>
                    <SelectItem value="3BHK">3BHK</SelectItem>
                    <SelectItem value="Shop">Shop</SelectItem>
                    <SelectItem value="Office">Office</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="size" className="text-sm font-medium text-foreground">
                  Size (sq. ft.)
                </Label>
                <Input
                  id="size"
                  type="number"
                  value={formData.size}
                  onChange={(e) => handleInputChange('size', e.target.value)}
                  placeholder="Enter size"
                  className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <Label htmlFor="pricePerSqFt" className="text-sm font-medium text-foreground">
                  Price per sq. ft. (₹)
                </Label>
                <Input
                  id="pricePerSqFt"
                  type="number"
                  value={formData.pricePerSqFt}
                  onChange={(e) => handleInputChange('pricePerSqFt', e.target.value)}
                  placeholder="Enter price per sq. ft."
                  className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500"
                  required
                />
              </div>
            </div>

          <Separator className="bg-accent/20" />

          {/* Buyer Information Section */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Buyer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="buyerName" className="text-sm font-medium text-foreground">
                  Name
                </Label>
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
                <Label htmlFor="buyerEmail" className="text-sm font-medium text-foreground">
                  Email
                </Label>
                <Input
                  id="buyerEmail"
                  type="email"
                  value={formData.buyerEmail}
                  onChange={(e) => handleInputChange('buyerEmail', e.target.value)}
                  placeholder="Enter email"
                  className="mt-1 bg-background border-accent/30 focus:border-accent"
                />
              </div>

              <div>
                <Label htmlFor="buyerPhone" className="text-sm font-medium text-foreground">
                  Phone Number
                </Label>
                <Input
                  id="buyerPhone"
                  value={formData.buyerPhone}
                  onChange={(e) => handleInputChange('buyerPhone', e.target.value)}
                  placeholder="Enter phone number"
                  className="mt-1 bg-background border-accent/30 focus:border-accent"
                />
              </div>

              <div>
                <Label htmlFor="gstNumber" className="text-sm font-medium text-foreground">
                  GST Number
                </Label>
                <Input
                  id="gstNumber"
                  value={formData.gstNumber}
                  onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                  placeholder="Enter GST number (optional)"
                  className="mt-1 bg-background border-accent/30 focus:border-accent"
                />
              </div>
            </div>
          </div>

          <Separator className="bg-accent/20" />

          {/* Taxes Section */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Taxes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="municipalTax" className="text-sm font-medium text-foreground">
                  Municipal Corporation Tax (₹)
                </Label>
                <Input
                  id="municipalTax"
                  type="number"
                  value={formData.municipalTax}
                  onChange={(e) => handleInputChange('municipalTax', e.target.value)}
                  placeholder="Enter municipal tax"
                  className="mt-1 bg-background border-accent/30 focus:border-accent"
                />
              </div>

              <div>
                <Label htmlFor="electricityTax" className="text-sm font-medium text-foreground">
                  Electricity Tax (₹)
                </Label>
                <Input
                  id="electricityTax"
                  type="number"
                  value={formData.electricityTax}
                  onChange={(e) => handleInputChange('electricityTax', e.target.value)}
                  placeholder="Enter electricity tax"
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
                <Label htmlFor="paymentType" className="text-sm font-medium text-foreground">
                  Payment Type
                </Label>
                <Select value={formData.paymentType} onValueChange={(value) => handleInputChange('paymentType', value)}>
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
                <Label htmlFor="paidAmount" className="text-sm font-medium text-foreground">
                  Paid Amount (₹)
                </Label>
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
                  <span className="text-foreground">
                    ₹{((parseFloat(formData.size) || 0) * (parseFloat(formData.pricePerSqFt) || 0)).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Municipal Tax:</span>
                  <span className="text-foreground">₹{(parseFloat(formData.municipalTax) || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Electricity Tax:</span>
                  <span className="text-foreground">₹{(parseFloat(formData.electricityTax) || 0).toLocaleString()}</span>
                </div>
                <Separator className="bg-accent/20" />
                <div className="flex justify-between font-medium">
                  <span className="text-foreground">Total Cost:</span>
                  <span className="text-accent text-lg">₹{calculations.totalCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Paid Amount:</span>
                  <span className="text-foreground">₹{(parseFloat(formData.paidAmount) || 0).toLocaleString()}</span>
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
              disabled={!formData.buyerName.trim() || !formData.unitType || !formData.size || !formData.pricePerSqFt}
            >
              Book Unit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};