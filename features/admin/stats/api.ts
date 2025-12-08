// stats-api.ts
import { StatsData, StatsPeriod } from './types';

export async function fetchStats(period: StatsPeriod = '30days'): Promise<StatsData> {
  return new Promise((resolve) =>
    setTimeout(() => {
      // Données simulées qui varient selon la période
      const multiplier = period === '30days' ? 1 : period === '90days' ? 2.5 : 5;
      
      resolve({
        experiencesCreated: Math.floor(1204 * multiplier),
        experiencesChange: 5.2,
        tripsCreated: Math.floor(876 * multiplier),
        tripsChange: 2.1,
        commentsPosted: Math.floor(3450 * multiplier),
        commentsChange: 8.0,
        reportsSubmitted: Math.floor(112 * multiplier),
        reportsChange: -1.5,
        newUsersVsExperiences: [
          { label: 'Jan', value: 65 },
          { label: 'Feb', value: 45 },
          { label: 'Mar', value: 70 },
          { label: 'Apr', value: 85 },
          { label: 'May', value: 120 },
          { label: 'Jun', value: 115 },
        ],
        tripsCreatedWeekly: [
          { label: 'Week 1', value: 45 },
          { label: 'Week 2', value: 52 },
          { label: 'Week 3', value: 38 },
          { label: 'Week 4', value: 65 },
        ],
      });
    }, 800)
  );
}

export async function exportStatsReport(period: StatsPeriod): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log(`Exporting stats report for period: ${period}`);
      // Simuler le téléchargement d'un fichier
      resolve();
    }, 1000)
  );
}