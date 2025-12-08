// report-api.ts
import { Report } from './types';

export async function fetchReports(): Promise<Report[]> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        {
          id: 'RPT-001',
          date: '2024-10-26',
          reportedEntity: 'Trip to Paris',
          reportedBy: 'John Doe',
          reason: 'Contenu de spam dans la description...',
          status: 'new',
          entityType: 'trip',
        },
        {
          id: 'RPT-002',
          date: '2024-10-25',
          reportedEntity: 'Jane Smith',
          reportedBy: 'Emily White',
          reason: 'Comportement inapproprié dans les m...',
          status: 'new',
          entityType: 'user',
        },
        {
          id: 'RPT-003',
          date: '2024-10-24',
          reportedEntity: 'Mountain Hike',
          reportedBy: 'Chris Green',
          reason: 'Informations trompeuses sur la difficulté...',
          status: 'processed',
          entityType: 'experience',
        },
        {
          id: 'RPT-004',
          date: '2024-10-23',
          reportedEntity: 'Beach Party Experience',
          reportedBy: 'Sarah Johnson',
          reason: 'Photos inappropriées dans la galerie...',
          status: 'new',
          entityType: 'experience',
        },
        {
          id: 'RPT-005',
          date: '2024-10-22',
          reportedEntity: 'Rome Adventure',
          reportedBy: 'Mike Wilson',
          reason: 'Prix non conforme à la description...',
          status: 'processed',
          entityType: 'trip',
        },
      ]);
    }, 600)
  );
}

export async function banUser(reportId: string): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log(`User banned for report: ${reportId}`);
      resolve();
    }, 500)
  );
}

export async function deleteExperience(reportId: string): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log(`Experience deleted for report: ${reportId}`);
      resolve();
    }, 500)
  );
}

export async function deleteTrip(reportId: string): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log(`Trip deleted for report: ${reportId}`);
      resolve();
    }, 500)
  );
}

export async function ignoreReport(reportId: string): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log(`Report ignored: ${reportId}`);
      resolve();
    }, 300)
  );
}