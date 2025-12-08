// report-types.ts
export type ReportStatus = 'new' | 'processed';
export type ReportFilterType = 'all' | 'experience' | 'trip' | 'user';

export interface Report {
  id: string;
  date: string;
  reportedEntity: string;
  reportedBy: string;
  reason: string;
  status: ReportStatus;
  entityType: 'experience' | 'trip' | 'user';
}

export interface ReportFilters {
  search: string;
  filterType: ReportFilterType;
}