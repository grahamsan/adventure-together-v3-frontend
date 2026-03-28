import { reportsControllerFindAll, reportsControllerUpdateStatus } from "@/api/reports/api";
import { adminControllerUpdateStatus } from "@/api/admin/api";
import type { AdminReportRow, AdminReportEntityType } from "./types";

function mapEntityType(t: string): AdminReportEntityType {
  const m: Record<string, AdminReportEntityType> = {
    Expérience: "experience",
    Trajet: "trip",
    Utilisateur: "user",
    Lieu: "place",
    Commentaire: "comment",
  };
  return m[t] ?? "experience";
}

function mapReport(r: Record<string, unknown>): AdminReportRow {
  const reporter = r.reporter as
    | {
        firstName?: string;
        lastName?: string;
        email?: string;
      }
    | undefined;
  const reportedBy =
    [reporter?.firstName, reporter?.lastName].filter(Boolean).join(" ").trim() ||
    reporter?.email ||
    "—";
  const status = r.status === "Traité" ? "processed" : "new";
  const created = r.createdAt ? new Date(r.createdAt as string) : null;
  const entityTypeRaw = String(r.entityType ?? "");
  const entityId = String(r.entityId ?? "");

  return {
    id: String(r.id),
    date: created ? created.toLocaleDateString("fr-FR") : "—",
    reportedEntity: `${entityTypeRaw} · ${entityId.slice(0, 8)}…`,
    reportedBy,
    reason: String(r.motif ?? ""),
    status,
    entityType: mapEntityType(entityTypeRaw),
    entityId,
  };
}

export async function fetchReports(): Promise<AdminReportRow[]> {
  const data = await reportsControllerFindAll();
  const list = Array.isArray(data) ? data : [];
  return list.map((row) => mapReport(row as Record<string, unknown>));
}

export async function markReportProcessed(reportId: string): Promise<void> {
  await reportsControllerUpdateStatus(reportId, { status: "Traité" });
}

/** Suspend le compte utilisateur signalé (route admin utilisateur). */
export async function suspendReportedUser(userId: string): Promise<void> {
  await adminControllerUpdateStatus(userId, { status: "suspended" });
}
