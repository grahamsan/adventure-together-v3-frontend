import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function PeriodFilterWidget() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<Set<string>>(new Set());

  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  const daysOfWeek = [
    { key: 'dim', label: 'D' },
    { key: 'lun', label: 'L' },
    { key: 'mar', label: 'M' },
    { key: 'mer', label: 'M' },
    { key: 'jeu', label: 'J' },
    { key: 'ven', label: 'V' },
    { key: 'sam', label: 'S' }
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);

  const toggleDate = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${currentMonth.getMonth() + 1}-${day}`;
    const newSelected = new Set(selectedDates);
    if (newSelected.has(dateStr)) {
      newSelected.delete(dateStr);
    } else {
      newSelected.add(dateStr);
    }
    setSelectedDates(newSelected);
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  return (
    <Card className="p-4 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-sm">Filtrer par période</h3>
        </div>
        {selectedDates.size > 0 && (
          <button onClick={() => setSelectedDates(new Set())} className="text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="space-y-3">
        {/* Navigation mois */}
        <div className="flex items-center justify-between">
          <button onClick={previousMonth} className="p-1 hover:bg-gray-100 rounded">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-semibold">
            {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>
          <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Calendrier */}
        <div className="grid grid-cols-7 gap-1">
          {daysOfWeek.map(day => (
            <div key={day.key} className="text-center text-xs font-semibold text-gray-500 py-1">
              {day.label}
            </div>
          ))}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="h-8"></div>
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = `${currentMonth.getFullYear()}-${currentMonth.getMonth() + 1}-${day}`;
            const isSelected = selectedDates.has(dateStr);
            const isToday = new Date().toDateString() === new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toDateString();
            
            return (
              <button
                key={day}
                onClick={() => toggleDate(day)}
                className={`h-8 text-xs rounded-full transition-colors ${
                  isSelected 
                    ? 'bg-blue-500 text-white font-semibold' 
                    : isToday
                    ? 'bg-blue-100 text-blue-600 font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>

        {selectedDates.size > 0 && (
          <div className="text-xs text-purple-600 bg-purple-50 p-2 rounded">
            {selectedDates.size} date{selectedDates.size > 1 ? 's' : ''} sélectionnée{selectedDates.size > 1 ? 's' : ''}
          </div>
        )}
      </div>
    </Card>
  );
}
