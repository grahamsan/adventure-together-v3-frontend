import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Search, MapPin, X } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function LocationFilterWidget() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const mockLocations = [
    { id: 1, name: "Paris", type: "Ville", country: "France", icon: "🇫🇷" },
    { id: 2, name: "Cotonou", type: "Ville", country: "Bénin", icon: "🇧🇯" },
    { id: 3, name: "Tour Eiffel", type: "Monument", country: "France", icon: "🗼" },
    { id: 4, name: "Londres", type: "Ville", country: "Royaume-Uni", icon: "🇬🇧" },
    { id: 5, name: "Porto-Novo", type: "Ville", country: "Bénin", icon: "🇧🇯" },
    { id: 6, name: "Abomey", type: "Ville", country: "Bénin", icon: "🇧🇯" },
    { id: 7, name: "Statue de la Liberté", type: "Monument", country: "États-Unis", icon: "🗽" },
    { id: 8, name: "Tokyo", type: "Ville", country: "Japon", icon: "🇯🇵" },
  ];

  const filteredLocations = mockLocations.filter(loc => 
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleLocation = (locationName: string) => {
    if (selectedLocations.includes(locationName)) {
      setSelectedLocations(selectedLocations.filter(l => l !== locationName));
    } else {
      setSelectedLocations([...selectedLocations, locationName]);
    }
  };

  return (
    <Card className="p-4 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-green-600" />
          <h3 className="font-semibold text-sm">Filtrer par lieu</h3>
        </div>
        {selectedLocations.length > 0 && (
          <button onClick={() => setSelectedLocations([])} className="text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            type="text" 
            placeholder="Rechercher un lieu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 text-sm"
          />
        </div>

        <div className="space-y-2 max-h-[300px] overflow-y-auto scrollbar-thin">
          {filteredLocations.map((location) => {
            const isSelected = selectedLocations.includes(location.name);
            return (
              <button
                key={location.id}
                onClick={() => toggleLocation(location.name)}
                className={`w-full p-3 rounded-lg transition-all ${
                  isSelected 
                    ? 'bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-500' 
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{location.icon}</span>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-900">{location.name}</p>
                      <p className="text-xs text-gray-500">{location.type} • {location.country}</p>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {selectedLocations.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedLocations.map((loc) => (
              <span key={loc} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                {loc}
              </span>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
