import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

export default function ParticipantsFilterWidget() {
  const [minParticipants, setMinParticipants] = useState<number>(0);
  const [maxParticipants, setMaxParticipants] = useState<number>(100);

  const participantRanges = [
    { label: "Petit groupe (1-10)", min: 1, max: 10 },
    { label: "Groupe moyen (11-30)", min: 11, max: 30 },
    { label: "Grand groupe (31-50)", min: 31, max: 50 },
    { label: "Très grand groupe (50+)", min: 51, max: 1000 },
  ];

  const selectRange = (min: number, max: number) => {
    setMinParticipants(min);
    setMaxParticipants(max);
  };

  const resetFilter = () => {
    setMinParticipants(0);
    setMaxParticipants(100);
  };

  return (
    <Card className="p-4 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-orange-600" />
          <h3 className="font-semibold text-sm">Filtrer par participants</h3>
        </div>
        {(minParticipants > 0 || maxParticipants < 100) && (
          <button onClick={resetFilter} className="text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-600 mb-1 block">Minimum</label>
            <Input 
              type="number" 
              value={minParticipants}
              onChange={(e) => setMinParticipants(Number(e.target.value))}
              min={0}
              className="text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600 mb-1 block">Maximum</label>
            <Input 
              type="number" 
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(Number(e.target.value))}
              min={0}
              className="text-sm"
            />
          </div>
        </div>

        <div className="space-y-2">
          {participantRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => selectRange(range.min, range.max)}
              className={`w-full p-2 rounded-lg text-left text-sm transition-colors ${
                minParticipants === range.min && maxParticipants === range.max
                  ? 'bg-orange-100 text-orange-700 font-semibold'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>

        {(minParticipants > 0 || maxParticipants < 100) && (
          <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded">
            {minParticipants} à {maxParticipants === 1000 ? '50+' : maxParticipants} participants
          </div>
        )}
      </div>
    </Card>
  );
}
