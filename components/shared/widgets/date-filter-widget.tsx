import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { X } from "lucide-react";

export default function DateFilterWidget() {
  const [selectedDate, setSelectedDate] = useState<string>("");

  return (
    <Card className="p-4 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-sm">Filtrer par date</h3>
        </div>
        {selectedDate && (
          <button onClick={() => setSelectedDate("")} className="text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="space-y-2">
        <Input 
          type="date" 
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full text-sm"
        />
        {selectedDate && (
          <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
            Date sélectionnée : {new Date(selectedDate).toLocaleDateString('fr-FR')}
          </div>
        )}
      </div>
    </Card>
  );
}
