// Auto-generated query keys
// Central place to define all query keys

export const queryKeys = {
  // App
  app: {
    all: ["app"] as const,
    lists: () => [...queryKeys.app.all, "list"] as const,
    list: (filters?: any) => [...queryKeys.app.lists(), filters] as const,
    details: () => [...queryKeys.app.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.app.details(), id] as const,
  },
  // Users
  users: {
    all: ["users"] as const,
    lists: () => [...queryKeys.users.all, "list"] as const,
    list: (filters?: any) => [...queryKeys.users.lists(), filters] as const,
    details: () => [...queryKeys.users.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
  },
  // Auth
  auth: {
    all: ["auth"] as const,
    lists: () => [...queryKeys.auth.all, "list"] as const,
    list: (filters?: any) => [...queryKeys.auth.lists(), filters] as const,
    details: () => [...queryKeys.auth.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.auth.details(), id] as const,
  },
  // Mail
  mail: {
    all: ["mail"] as const,
    lists: () => [...queryKeys.mail.all, "list"] as const,
    list: (filters?: any) => [...queryKeys.mail.lists(), filters] as const,
    details: () => [...queryKeys.mail.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.mail.details(), id] as const,
  },
  // Experiences
  experiences: {
    all: ["experiences"] as const,
    lists: () => [...queryKeys.experiences.all, "list"] as const,
    list: (filters?: any) => [...queryKeys.experiences.lists(), filters] as const,
    details: () => [...queryKeys.experiences.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.experiences.details(), id] as const,
  },
  // Trips
  trips: {
    all: ["trips"] as const,
    lists: () => [...queryKeys.trips.all, "list"] as const,
    list: (filters?: any) => [...queryKeys.trips.lists(), filters] as const,
    details: () => [...queryKeys.trips.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.trips.details(), id] as const,
  },
  // Conversations
  conversations: {
    all: ["conversations"] as const,
    lists: () => [...queryKeys.conversations.all, "list"] as const,
    list: (filters?: any) => [...queryKeys.conversations.lists(), filters] as const,
    details: () => [...queryKeys.conversations.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.conversations.details(), id] as const,
  },
  // Admin
  admin: {
    all: ["admin"] as const,
    lists: () => [...queryKeys.admin.all, "list"] as const,
    list: (filters?: any) => [...queryKeys.admin.lists(), filters] as const,
    details: () => [...queryKeys.admin.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.admin.details(), id] as const,
  },
  // Reports
  reports: {
    all: ["reports"] as const,
    lists: () => [...queryKeys.reports.all, "list"] as const,
    list: (filters?: any) => [...queryKeys.reports.lists(), filters] as const,
    details: () => [...queryKeys.reports.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.reports.details(), id] as const,
  },
  // Vehicles
  vehicles: {
    all: ["vehicles"] as const,
    lists: () => [...queryKeys.vehicles.all, "list"] as const,
    list: (filters?: any) => [...queryKeys.vehicles.lists(), filters] as const,
    details: () => [...queryKeys.vehicles.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.vehicles.details(), id] as const,
  },
  // Places
  places: {
    all: ["places"] as const,
    lists: () => [...queryKeys.places.all, "list"] as const,
    list: (filters?: any) => [...queryKeys.places.lists(), filters] as const,
    details: () => [...queryKeys.places.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.places.details(), id] as const,
  },
  // User Statistics
  userStatistics: {
    all: ["userStatistics"] as const,
    lists: () => [...queryKeys.userStatistics.all, "list"] as const,
    list: (filters?: any) => [...queryKeys.userStatistics.lists(), filters] as const,
    details: () => [...queryKeys.userStatistics.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.userStatistics.details(), id] as const,
  },
  // Comments
  comments: {
    all: ["comments"] as const,
    lists: () => [...queryKeys.comments.all, "list"] as const,
    list: (filters?: any) => [...queryKeys.comments.lists(), filters] as const,
    details: () => [...queryKeys.comments.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.comments.details(), id] as const,
  },
  // Upload
  upload: {
    all: ["upload"] as const,
    lists: () => [...queryKeys.upload.all, "list"] as const,
    list: (filters?: any) => [...queryKeys.upload.lists(), filters] as const,
    details: () => [...queryKeys.upload.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.upload.details(), id] as const,
  },
};
