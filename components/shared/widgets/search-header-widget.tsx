import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";

export default function SearchHeaderWidget() {
  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-white via-white to-blue-100 border-none shadow-lg">
      <div className="relative p-4 h-[140px] flex flex-col justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-4 right-6 animate-pulse-slow">
            <Search className="w-12 h-12 text-blue-500 drop-shadow-lg" />
            <div className="absolute inset-0 w-12 h-12 bg-blue-300 rounded-full blur-xl opacity-40 animate-ping-slow"></div>
          </div>
          {/* Cercles décoratifs */}
          <div className="absolute top-8 left-8 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float"></div>
          <div className="absolute bottom-6 right-16 w-16 h-16 bg-blue-300 rounded-full opacity-15 animate-float-delayed"></div>
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Rechercher
          </h2>
          <p className="text-sm text-gray-600">
            Trouvez l'événement parfait pour vous
          </p>
        </div>
      </div>
    </Card>
  );
}
