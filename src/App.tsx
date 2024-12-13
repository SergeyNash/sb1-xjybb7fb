import React, { useState } from 'react';
import { Map } from './components/Map';
import { Sidebar } from './components/Sidebar';

interface Location {
  id: number;
  title: string;
  description: string;
}

function App() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  return (
    <div className="flex h-screen bg-slate-950">
      <div className="w-1/3 border-r border-slate-700">
        <Sidebar selectedLocation={selectedLocation} />
      </div>
      <div className="w-2/3 p-6">
        <Map 
          onLocationSelect={setSelectedLocation}
          selectedLocation={selectedLocation}
        />
      </div>
    </div>
  );
}

export default App;