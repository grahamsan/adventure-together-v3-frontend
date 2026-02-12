// Auto-generated TypeScript types

export interface CreateReportDto {

  entityType: 'Expérience' | 'Trajet' | 'Utilisateur' | 'Lieu' | 'Commentaire';

  entityId: string;

  motif: string;
}

export interface UpdateReportStatusDto {

  status: 'Nouveau' | 'Traité';
}

