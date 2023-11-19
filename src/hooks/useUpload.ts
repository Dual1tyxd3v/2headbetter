import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateData } from '../api/supabase';
import { UploadType } from '../types';

export const useUpload = () => {
  const queryClient = useQueryClient();

  const { mutate: uploadData, isPending: isLoading } = useMutation({
    mutationFn: ({ file, comment, time, name, timeframe, data }: UploadType) =>
      updateData({ file, comment, time, name, timeframe, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['ownData']
      })
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });

  return { uploadData, isLoading };
};
