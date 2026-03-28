export type ReportStatus = "new" | "processed";

export type AdminReportEntityType =
  | "experience"
  | "trip"
  | "user"
  | "place"
  | "comment";

export interface AdminReportRow {
  id: string;
  date: string;
  reportedEntity: string;
  reportedBy: string;
  reason: string;
  status: ReportStatus;
  entityType: AdminReportEntityType;
  /** ID de l’entité signalée (utilisateur, trajet, etc.) */
  entityId: string;
}
