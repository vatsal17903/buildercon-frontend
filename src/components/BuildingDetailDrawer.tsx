import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Building } from '@/pages/Buildings'; // Ensure this export is correct

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useMediaQuery } from '../hooks/useMediaQuery';
import UnitDetailDrawer from './UnitDetailDrawer';

interface Wing {
  id: string;
  name: string;
  floors: Floor[];
}

export interface Unit {
  id: string;
  name: string;
  status: 'available' | 'booked';
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

interface Floor {
  id: string;
  name: string;
  units: Unit[];
}



// Mock data (replace with API integration)
const mockData: Wing[] = [
  {
    id: 'wing-a',
    name: 'Wing A',
    floors: [
      {
        id: 'floor-a1',
        name: 'Floor 1',
        units: [
          { id: 'unit-a101', name: 'Unit 101', status: 'available', unitType: 'Apartment', size: '1200', pricePerSqFt: '5000', sellerName: 'ABC Developers' },
          { id: 'unit-a102', name: 'Unit 102', status: 'booked', unitType: 'Apartment', size: '1500', pricePerSqFt: '5200', buyerName: 'John Doe', buyerEmail: 'john.doe@example.com', buyerPhone: '123-456-7890', gstNumber: 'GSTIN12345', municipalTax: '50000', electricityTax: '10000', paymentType: 'bank-transfer', paidAmount: '6000000', sellerName: 'ABC Developers' },
          { id: 'unit-a103', name: 'Unit 103', status: 'available', unitType: 'Apartment', size: '1300', pricePerSqFt: '5100', sellerName: 'ABC Developers' },
        ],
      },
      {
        id: 'floor-a2',
        name: 'Floor 2',
        units: [
          { id: 'unit-a201', name: 'Unit 201', status: 'available', unitType: 'Apartment', size: '1100', pricePerSqFt: '4900', sellerName: 'ABC Developers' },
          { id: 'unit-a202', name: 'Unit 202', status: 'available', unitType: 'Apartment', size: '1400', pricePerSqFt: '5300', sellerName: 'ABC Developers' },
        ],
      }
    ]
  },
  {
    id: 'wing-b',
    name: 'Wing B',
    floors: [
      {
        id: 'floor-b1',
        name: 'Floor 1',
        units: [
          { id: 'unit-b101', name: 'Unit 101', status: 'booked', unitType: 'Shop', size: '800', pricePerSqFt: '7000', buyerName: 'Jane Smith', buyerEmail: 'jane.smith@example.com', buyerPhone: '987-654-3210', gstNumber: 'GSTIN54321', municipalTax: '30000', electricityTax: '5000', paymentType: 'cash', paidAmount: '5000000', sellerName: 'XYZ Properties' },
          { id: 'unit-b102', name: 'Unit 102', status: 'available', unitType: 'Shop', size: '900', pricePerSqFt: '7200', sellerName: 'XYZ Properties' }
        ],
      }
    ]
  }
];

interface BuildingDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  building: Building | null;
}

const BuildingDetailDrawer: React.FC<BuildingDetailDrawerProps> = ({
  open,
  onClose,
  building
}) => {
  const [selectedWing, setSelectedWing] = useState<Wing | null>(null);
  const [expandedWingId, setExpandedWingId] = useState<string | null>(null);
  const [expandedFloorId, setExpandedFloorId] = useState<string | null>(null);
  const [isUnitDetailDrawerOpen, setIsUnitDetailDrawerOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (!open || !building) {
      setSelectedWing(null);
    }
  }, [open, building]);

  const handleUnitClick = (unit: Unit) => {
    setSelectedUnit({ ...unit, buildingName: building?.name });
    setIsUnitDetailDrawerOpen(true);
  };

  const handleCloseUnitDetailDrawer = () => {
    setIsUnitDetailDrawerOpen(false);
    setSelectedUnit(null);
  };

  if (!building) return null;

  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[75%] md:max-w-[75%] lg:max-w-[75%] bg-[#f4f0ec] max-h-screen overflow-y-auto rounded-l-lg transition-all duration-300 ease-in-out text-black"
      >
        <SheetHeader>
          <SheetTitle className="flex justify-between items-center">
            {building.name}
          </SheetTitle>
        </SheetHeader>

        <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Wings:</h3>
            <Accordion type="single" collapsible className="w-full" value={expandedWingId || undefined} onValueChange={setExpandedWingId}>
              {mockData.map((wing) => (
                <AccordionItem value={wing.id} key={wing.id}>
                  <AccordionTrigger className="text-lg font-medium py-3 px-4 bg-[#f4f0ec] rounded-md hover:bg-gray-200 transition-colors duration-200 ease-in-out">
                    {wing.name}
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4 px-4">
                    <h4 className="text-md font-semibold mb-2">Floors:</h4>
                    <Accordion type="single" collapsible className="w-full" value={expandedFloorId || undefined} onValueChange={setExpandedFloorId}>
                      {wing.floors.map((floor) => (
                        <AccordionItem value={floor.id} key={floor.id}>
                          <AccordionTrigger className="text-base font-medium py-2 px-3 hover:bg-gray-100 transition-colors duration-200 ease-in-out">
                            {floor.name}
                          </AccordionTrigger>
                          <AccordionContent className="pt-2 pb-2 pl-6">
                            <h5 className="text-sm font-semibold mb-2">Units:</h5>
                            <div className="grid grid-cols-1 gap-2">
                              {floor.units.map((unit) => (
                                <div
                                  key={unit.id}
                                  className={`cursor-pointer py-2 px-3 rounded-md transition-colors duration-200 ease-in-out border
                                    ${unit.status === 'available' ? 'bg-green-50 hover:bg-green-100 text-green-700 border-green-700' : 'bg-red-50 hover:bg-red-100 text-red-700 border-red-700'}
                                  `}
                                  onClick={() => handleUnitClick(unit)}
                                >
                                  {unit.name} ({unit.status})
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>


         </SheetContent>
      </Sheet>

      <UnitDetailDrawer
        open={isUnitDetailDrawerOpen}
        onClose={handleCloseUnitDetailDrawer}
        unit={selectedUnit}
      />
    </>
  );

};

export default BuildingDetailDrawer;
