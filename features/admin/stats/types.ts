// stats-types.ts
export type StatsPeriod = '30days' | '90days' | 'all';

export interface StatCard {
  id: string;
  title: string;
  icon: React.ReactNode;
  value: number;
  change: number;
  changeLabel: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface StatsData {
  experiencesCreated: number;
  experiencesChange: number;
  tripsCreated: number;
  tripsChange: number;
  commentsPosted: number;
  commentsChange: number;
  reportsSubmitted: number;
  reportsChange: number;
  newUsersVsExperiences: ChartDataPoint[];
  tripsCreatedWeekly: ChartDataPoint[];
}