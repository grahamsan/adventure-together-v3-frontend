'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  icon: React.ReactNode;
  value: number;
  change: number;
  changeLabel: string;
}

export function StatCard({ title, icon, value, change, changeLabel }: StatCardProps) {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
          {icon}
        </div>
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      </div>
      
      <div className="space-y-2">
        <p className="text-4xl font-bold text-gray-900">
          {value.toLocaleString()}
        </p>
        
        <div className="flex items-center gap-1.5">
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-green-600" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-600" />
          )}
          <span className={`text-sm font-semibold ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {isPositive ? '+' : ''}{change}%
          </span>
          <span className="text-sm text-gray-500">{changeLabel}</span>
        </div>
      </div>
    </div>
  );
}
