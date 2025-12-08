'use client';

import { useState, useEffect } from 'react';
import { fetchStats, exportStatsReport } from '@/features/admin/stats/api';
import { StatsData, StatsPeriod } from '@/features/admin/stats/types';
import { StatCard } from '@/components/admin-panel/dashboard/stats-card';
import { BarChart } from '@/components/admin-panel/dashboard/bar-chart';
import { LineChart } from '@/components/admin-panel/dashboard/line-chart';
import { Download, Sparkles, Car, MessageSquare, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function StatsPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<StatsPeriod>('30days');
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    loadStats();
  }, [period]);

  const loadStats = async () => {
    setLoading(true);
    const data = await fetchStats(period);
    setStats(data);
    setLoading(false);
  };

  const handleExport = async () => {
    setExporting(true);
    await exportStatsReport(period);
    setExporting(false);
  };

  if (loading || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  const statCards = [
    {
      id: 'experiences',
      title: 'Expériences créées',
      icon: <Sparkles className="w-5 h-5" />,
      value: stats.experiencesCreated,
      change: stats.experiencesChange,
      changeLabel: 'vs last month',
    },
    {
      id: 'trips',
      title: 'Trajets créés',
      icon: <Car className="w-5 h-5" />,
      value: stats.tripsCreated,
      change: stats.tripsChange,
      changeLabel: 'vs last month',
    },
    {
      id: 'comments',
      title: 'Commentaires postés',
      icon: <MessageSquare className="w-5 h-5" />,
      value: stats.commentsPosted,
      change: stats.commentsChange,
      changeLabel: 'vs last month',
    },
    {
      id: 'reports',
      title: 'Signalements listés',
      icon: <AlertCircle className="w-5 h-5" />,
      value: stats.reportsSubmitted,
      change: stats.reportsChange,
      changeLabel: 'vs last month',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tableau de bord des statistiques
          </h1>
          <p className="text-gray-600">
            An overview of platform health and user activity.
          </p>
        </div>

        {/* Filtres et Export */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            {[
              { value: '30days', label: 'Last 30 Days' },
              { value: '90days', label: 'Last 90 Days' },
              { value: 'all', label: 'All Time' },
            ].map((filter) => (
              <Button
                key={filter.value}
                variant="outline"
                size="sm"
                onClick={() => setPeriod(filter.value as StatsPeriod)}
                className={`
                  rounded-lg px-4 transition-all border
                  ${period === filter.value
                    ? 'bg-gray-900 text-white border-gray-900 hover:bg-gray-800 hover:text-white'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }
                `}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          <Button
            onClick={handleExport}
            disabled={exporting}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            {exporting ? 'Exporting...' : 'Export Report'}
          </Button>
        </div>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card) => (
            <StatCard key={card.id} {...card} />
          ))}
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BarChart
            title="New Users vs. New Experiences"
            subtitle="Activity over the last 6 months."
            data={stats.newUsersVsExperiences}
          />
          
          <LineChart
            title="Trips Created (Last 30 Days)"
            subtitle="Weekly trend of created trips."
            data={stats.tripsCreatedWeekly}
          />
        </div>
      </div>
    </div>
  );
}
