// Auto-generated hooks
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import {
  uploadControllerUploadSingle,
  uploadControllerUploadMultiple
} from './api';

// Query Hooks


// Mutation Hooks

export const useUploadControllerUploadSingle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {

  file?: string;
}) => uploadControllerUploadSingle(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.upload.all });
    },
  });
};

export const useUploadControllerUploadMultiple = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {

  files?: string[];
}) => uploadControllerUploadMultiple(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.upload.all });
    },
  });
};

