import { useState } from 'react';
import { Unit } from './BuildingDetailDrawer';

interface UnitListProps {
  units: Unit[];
}

export const UnitList: React.FC<UnitListProps> = ({ units }) => {
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  return (
    <div className="space-y-3 overflow-y-auto max-h-[80vh] text-black">
      {units.map((unit) => (
        <div
          key={unit.id}
          className={`p-4 rounded-lg border border-black cursor-pointer transition-all hover:shadow-md hover:scale-[1.01] ${
            unit.status === 'booked' ? 'bg-white' : 'bg-white'
          }`} 
          onClick={() => setSelectedUnit(unit)}
        >
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg text-black">Unit {unit.name}</h3>
            <span
              className={`inline-block w-3 h-3 rounded-full ${
                unit.status === 'booked' ? 'bg-red-500' : 'bg-green-500'
              }`}
              title={unit.status}
            ></span>
          </div>
          <p className="text-sm mt-1 text-black">
            {unit.unitType} • {unit.size} • ₹{unit.pricePerSqFt?.toLocaleString()}/sq.ft.
          </p>
        </div>
      ))}

      {selectedUnit && (
        <div className="mt-4 p-5 rounded-lg bg-white border border-black text-black max-h-[70vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-xl text-black">Unit {selectedUnit.name} Details</h3>
            <button
              className="px-3 py-1 text-sm rounded bg-[#947C70] text-white hover:bg-[#806A60]"
              onClick={() => setSelectedUnit(null)}
            >
              Close
            </button>
          </div>

          <div className="space-y-2 text-sm text-black">
            <p><strong>Status:</strong> {selectedUnit.status === 'booked' ? 'Booked' : 'Available'}</p>
            <p><strong>Type:</strong> {selectedUnit.unitType}</p>
            <p><strong>Size:</strong> {selectedUnit.size}</p>
            <p><strong>Price per sq. ft.:</strong> ₹{selectedUnit.pricePerSqFt.toLocaleString()}</p>

            {selectedUnit.buyerName && (
              <div className="mt-4 pt-4 border-t border-black">
                <h4 className="font-semibold text-base mb-1">Buyer Information:</h4>
                <p><strong>Name:</strong> {selectedUnit.buyerName}</p>
                <p><strong>Email:</strong> {selectedUnit.buyerEmail}</p>
                <p><strong>Phone:</strong> {selectedUnit.buyerPhone}</p>
                {selectedUnit.gstNumber && (
                  <p><strong>GST No:</strong> {selectedUnit.gstNumber}</p>
                )}
              </div>
            )}

            {(selectedUnit.municipalTax || selectedUnit.electricityTax) && (
              <div className="mt-4 pt-4 border-t border-black">
                <h4 className="font-semibold text-base mb-1">Tax Information:</h4>
                <p><strong>Municipal Tax:</strong> ₹{selectedUnit.municipalTax}</p>
                <p><strong>Electricity Tax:</strong> ₹{selectedUnit.electricityTax}</p>
              </div>
            )}

            {(selectedUnit.paymentType || selectedUnit.paidAmount) && (
              <div className="mt-4 pt-4 border-t border-black">
                <h4 className="font-semibold text-base mb-1">Payment Details:</h4>
                <p><strong>Type:</strong> {selectedUnit.paymentType}</p>
                <p><strong>Paid:</strong> ₹{selectedUnit.paidAmount}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

