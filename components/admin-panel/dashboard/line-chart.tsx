'use client';

import { ChartDataPoint } from '@/features/admin/stats/types';

interface LineChartProps {
  title: string;
  subtitle: string;
  data: ChartDataPoint[];
}

export function LineChart({ title, subtitle, data }: LineChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;
  
  // Calculer les points du path SVG
  const width = 600;
  const height = 200;
  const padding = 20;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  
  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * chartWidth + padding;
    const normalizedValue = range === 0 ? 0.5 : (item.value - minValue) / range;
    const y = height - (normalizedValue * chartHeight + padding);
    return { x, y, value: item.value };
  });
  
  // Créer le path de la ligne
  const linePath = points
    .map((point, index) => {
      if (index === 0) return `M ${point.x},${point.y}`;
      return `L ${point.x},${point.y}`;
    })
    .join(' ');
  
  // Créer le path pour l'aire sous la courbe
  const areaPath = 
    linePath + 
    ` L ${points[points.length - 1].x},${height - padding}` +
    ` L ${padding},${height - padding}` +
    ' Z';
  
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
      
      <div className="relative">
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Aire sous la courbe */}
          <path
            d={areaPath}
            fill="url(#gradient)"
            opacity="0.2"
          />
          
          {/* Ligne */}
          <path
            d={linePath}
            stroke="#3B82F6"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Points */}
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="5"
              fill="white"
              stroke="#3B82F6"
              strokeWidth="3"
              className="hover:r-7 transition-all cursor-pointer"
            />
          ))}
          
          {/* Gradient pour l'aire */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Labels */}
        <div className="flex justify-between mt-4 px-2">
          {data.map((item, index) => (
            <span key={index} className="text-xs font-medium text-gray-600">
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
