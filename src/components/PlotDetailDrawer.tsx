import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import PlotDetail from './PlotDetail';

interface Plot {
  id: string;
  ownerName: string;
  size: string;
  price: string;
  location: {
    lat: number;
    lng: number;
  };
}

interface PlotDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  plot: Plot | null;
}

const PlotDetailDrawer: React.FC<PlotDetailDrawerProps> = ({
  open,
  onClose,
  plot
}) => {

  if (!plot) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[75%] md:max-w-[75%] lg:max-w-[75%] bg-[#f4f0ec] max-h-screen overflow-y-auto rounded-l-lg transition-all duration-300 ease-in-out text-black"
      >
        <SheetHeader>
          <SheetTitle className="flex justify-between items-center">
            Plot Details

          </SheetTitle>
        </SheetHeader>

        <div className="p-4 space-y-6">
          <PlotDetail plot={plot} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PlotDetailDrawer;