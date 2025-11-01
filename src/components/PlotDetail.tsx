import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

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

interface PlotDetailProps {
  plot: Plot;
}

const containerStyle = {
  width: '100%',
  height: '400px'
};

const PlotDetail: React.FC<PlotDetailProps> = ({ plot }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Plot Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Owner Name</h3>
              <p className="text-lg">{plot.ownerName}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Plot Size</h3>
              <p className="text-lg">{plot.size} sq.ft.</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Price</h3>
              <p className="text-lg">₹{plot.price}</p>
            </div>
          </div>
        </div>
        
        <div className="h-full">
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={plot.location}
              zoom={15}
            >
              <Marker position={plot.location} />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
};

export default PlotDetail;