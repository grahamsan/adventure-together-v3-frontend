// Auto-generated TypeScript types

export interface CreateExperienceDto {
  title: string;
  description: string;
  location: string;
  dateStart: string;
  dateEnd: string;
  type?: "road-trip" | "event";
  image?: string;
}

export interface ExperienceOwner {
  fullName: string;
  avatarUrl: any; // Using any as requested, though string | null would be stricter
}

export interface ExperienceStats {
  interests: number;
  comments: number;
  likes: number;
  trips: number;
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  owner: ExperienceOwner;
  stats: ExperienceStats;
}

export interface ExperienceResponse {
  data: Experience[];
  total: number;
  page: number;
  limit: number;
}
