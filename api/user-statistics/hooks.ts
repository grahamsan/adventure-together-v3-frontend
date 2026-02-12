// Auto-generated hooks
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import {
  usersStatsControllerGetStats
} from './api';

// Query Hooks

export const useUsersStatsControllerGetStats = (params?: { period?: string }) => {
  return useQuery({
    queryKey: queryKeys.userStatistics.list(params),
    queryFn: () => usersStatsControllerGetStats(params),
  });
};


// Mutation Hooks

