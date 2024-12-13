import React from 'react';
import { Info } from 'lucide-react';

interface Location {
  id: number;
  title: string;
  description: string;
}

interface SidebarProps {
  selectedLocation: Location | null;
}

export const Sidebar: React.FC<SidebarProps> = ({ selectedLocation }) => {
  return (
    <div className="bg-slate-900 p-6 text-white h-full overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Interactive Career Map</h1>
        <p className="text-gray-300 mb-4">
          Explore my professional journey through this interactive map. Navigate using arrow keys
          or click on locations to learn more about each role.
        </p>
        
        <div className="bg-slate-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Info size={20} />
            How to Navigate
          </h2>
          <ul className="space-y-2 text-gray-300">
            <li>• Use arrow keys to move the green marker</li>
            <li>• Click on location pins or press SPACE when near them</li>
            <li>• Press SPACE again to hide location details</li>
          </ul>
        </div>
      </div>

      {selectedLocation && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">{selectedLocation.title}</h2>
          <div className="text-gray-300 space-y-2 whitespace-pre-line">
            {selectedLocation.description}
          </div>
        </div>
      )}
    </div>
  );
};