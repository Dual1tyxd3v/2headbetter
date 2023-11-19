import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadImage } from '../api/supabase';
import { UploadType } from '../types';

export const useUpload = () => {
  const queryClient = useQueryClient();

  const { mutate: uploadImg, isPending: isLoading } = useMutation({
    mutationFn: ({ file, comment, time, name, timeframe, data }: UploadType) =>
      uploadImage({ file, comment, time, name, timeframe, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['ownData']
      })
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });

  return { uploadImg, isLoading };
};
