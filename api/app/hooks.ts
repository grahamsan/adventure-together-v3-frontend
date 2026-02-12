// Auto-generated hooks
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import {
  appControllerGetHello
} from './api';

// Query Hooks

export const useAppControllerGetHello = () => {
  return useQuery({
    queryKey: queryKeys.app.lists(),
    queryFn: appControllerGetHello,
  });
};


// Mutation Hooks

