'use client';

import { ChartDataPoint } from '@/features/admin/stats/types';

interface BarChartProps {
  title: string;
  subtitle: string;
  data: ChartDataPoint[];
}

export function BarChart({ title, subtitle, data }: BarChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className="h-64 flex items-center justify-center text-gray-400">
          No data available
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
      
      <div className="h-64 flex items-end justify-between gap-4 pb-8">
        {data.map((item, index) => {
          const height = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
          const isHighlighted = index >= data.length - 2;
          
          return (
            <div key={item.label} className="flex-1 flex flex-col items-center gap-3 h-full">
              <div className="w-full flex items-end h-full relative">
                <div
                  className={`w-full rounded-t-xl transition-all duration-300 hover:opacity-80 ${
                    isHighlighted 
                      ? 'bg-gradient-to-t from-second-500 to-second-300' 
                      : 'bg-gradient-to-t from-second-100 to-second-50'
                  }`}
                  style={{ 
                    height: `${height}%`,
                    minHeight: height > 0 ? '8px' : '0'
                  }}
                />
              </div>
              <span className="text-xs font-medium text-gray-600 mt-2">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
