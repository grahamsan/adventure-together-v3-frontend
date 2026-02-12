'use client';

import { useState, useEffect } from 'react';
import { fetchStats, exportStatsReport } from '@/features/admin/stats/api';
import { StatsData, StatsPeriod } from '@/features/admin/stats/types';
import { StatCard } from '@/components/admin-panel/dashboard/stats-card';
import { BarChart } from '@/components/admin-panel/dashboard/bar-chart';
import { LineChart } from '@/components/admin-panel/dashboard/line-chart';
import { Sparkles, Car, MessageSquare, AlertCircle, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {Loader} from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center bg-second-50">
        <Loader className='w-14 h-14 animate-spin text-brand-500'/>
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
      changeLabel: 'en un mois',
    },
    {
      id: 'trips',
      title: 'Trajets créés',
      icon: <Car className="w-5 h-5" />,
      value: stats.tripsCreated,
      change: stats.tripsChange,
      changeLabel: 'en un mois',
    },
    {
      id: 'comments',
      title: 'Commentaires postés',
      icon: <MessageSquare className="w-5 h-5" />,
      value: stats.commentsPosted,
      change: stats.commentsChange,
      changeLabel: 'en un mois',
    },
    {
      id: 'reports',
      title: 'Signalements listés',
      icon: <AlertCircle className="w-5 h-5" />,
      value: stats.reportsSubmitted,
      change: stats.reportsChange,
      changeLabel: 'en un mois',
    },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sticky top-5 bg-second-50 py-2">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tableau de bord des statistiques
          </h1>
          <p className="text-gray-600">
            Vue d'ensemble des performences de la plateforme.
          </p>
        </div>

        {/* Filtres et Export */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            {[
              { value: '30days', label: '30 derniers jours' },
              { value: '90days', label: '90 derniers jours' },
              { value: 'all', label: 'Tous confondus' },
            ].map((filter) => (
              <Button
                key={filter.value}
                variant="outline"
                size="sm"
                onClick={() => setPeriod(filter.value as StatsPeriod)}
                className={`
                  rounded-lg px-4 transition-all border
                  ${period === filter.value
                    ? 'bg-brand-800 text-white border-gray-900 hover:bg-brand-600 hover:text-white'
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
            className="bg-brand-500 hover:bg-brand-600 text-white rounded-lg px-4 py-2 flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            {exporting ? 'Export...' : 'Exporter'}
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
            title="Nouveaux Utilisateurs par Expériences"
            subtitle="Activité durant les 6 derniers mois"
            data={stats.newUsersVsExperiences}
          />
          
          <LineChart
            title="Trajets Créés (30 derniers jours)"
            subtitle="Suivi Hebdomadaire"
            data={stats.tripsCreatedWeekly}
          />
        </div>
      </div>
    </div>
  );
}
