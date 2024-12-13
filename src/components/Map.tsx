import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

interface Location {
  id: number;
  x: number;
  y: number;
  title: string;
  description: string;
}

const locations: Location[] = [
  {
    id: 1,
    x: 20,
    y: 20,
    title: "Software Engineer at TechCorp",
    description: `Led development of cloud-based solutions using React and Node.js.
    • Implemented real-time data synchronization features
    • Reduced system latency by 40% through optimization
    • Mentored junior developers and conducted code reviews
    • Architected scalable microservices infrastructure
    • Collaborated with cross-functional teams to deliver features`
  },
  {
    id: 2,
    x: 80,
    y: 20,
    title: "Senior Developer at InnoSoft",
    description: `Spearheaded digital transformation initiatives and modernized legacy systems.
    • Managed a team of 5 developers
    • Introduced automated testing, improving code coverage to 90%
    • Developed CI/CD pipelines using GitHub Actions
    • Implemented agile methodologies and sprint planning
    • Reduced deployment time by 60% through automation`
  },
  {
    id: 3,
    x: 50,
    y: 50,
    title: "Tech Lead at FutureTech",
    description: `Directed technical strategy and architecture for enterprise applications.
    • Led migration to microservices architecture
    • Implemented OAuth2 authentication system
    • Optimized database queries, improving performance by 50%
    • Conducted technical interviews and grew team from 3 to 10
    • Established coding standards and best practices`
  },
  {
    id: 4,
    x: 20,
    y: 80,
    title: "Full Stack Developer at WebPro",
    description: `Developed and maintained e-commerce platforms serving millions of users.
    • Built responsive web applications using modern frameworks
    • Integrated payment processing systems
    • Implemented real-time analytics dashboard
    • Optimized front-end performance and SEO
    • Developed RESTful APIs and documentation`
  },
  {
    id: 5,
    x: 80,
    y: 80,
    title: "Solutions Architect at CloudTech",
    description: `Designed and implemented cloud-native solutions for enterprise clients.
    • Architected serverless applications on AWS
    • Implemented disaster recovery solutions
    • Reduced infrastructure costs by 30%
    • Led technical discovery workshops with clients
    • Developed cloud migration strategies`
  }
];

interface MapProps {
  onLocationSelect: (location: Location | null) => void;
  selectedLocation: Location | null;
}

export const Map: React.FC<MapProps> = ({ onLocationSelect, selectedLocation }) => {
  const [playerPos, setPlayerPos] = useState({ x: 50, y: 50 });
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        const location = locations.find(loc => 
          Math.abs(loc.x - playerPos.x) < 5 && 
          Math.abs(loc.y - playerPos.y) < 5
        );
        onLocationSelect(location || null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const step = 2;
      switch (e.key) {
        case 'ArrowUp':
          setPlayerPos(prev => ({ ...prev, y: Math.max(0, prev.y - step) }));
          break;
        case 'ArrowDown':
          setPlayerPos(prev => ({ ...prev, y: Math.min(100, prev.y + step) }));
          break;
        case 'ArrowLeft':
          setPlayerPos(prev => ({ ...prev, x: Math.max(0, prev.x - step) }));
          break;
        case 'ArrowRight':
          setPlayerPos(prev => ({ ...prev, x: Math.min(100, prev.x + step) }));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keypress', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [playerPos, onLocationSelect]);

  return (
    <div className="relative w-full h-full bg-slate-800 rounded-lg overflow-hidden">
      {/* Roads */}
      <div className="absolute w-1 h-full left-[20%] bg-gray-600" />
      <div className="absolute w-1 h-full left-[80%] bg-gray-600" />
      <div className="absolute w-full h-1 top-[20%] bg-gray-600" />
      <div className="absolute w-full h-1 top-[50%] bg-gray-600" />
      <div className="absolute w-full h-1 top-[80%] bg-gray-600" />

      {/* Locations */}
      {locations.map((loc) => (
        <div
          key={loc.id}
          className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
            selectedLocation?.id === loc.id ? 'text-yellow-400' : 'text-white'
          }`}
          style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
          onClick={() => onLocationSelect(loc)}
        >
          <MapPin size={24} />
        </div>
      ))}

      {/* Player */}
      <div
        className="absolute w-4 h-4 bg-green-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100"
        style={{ left: `${playerPos.x}%`, top: `${playerPos.y}%` }}
      />
    </div>
  );
};