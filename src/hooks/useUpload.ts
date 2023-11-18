import { useMutation } from '@tanstack/react-query';
import { uploadImage } from '../api/supabase';
import { UploadType } from '../types';

export const useUpload = () => {
  // const queryClient = useQueryClient();

  const { mutate: uploadImg, isPending: isLoading } = useMutation({
    mutationFn: ({ file, comment, time, name, timeframe }: UploadType) =>
      uploadImage({ file, comment, time, name, timeframe }),
    onSuccess: () => {
      console.log('Uploaded');
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });

  return { uploadImg, isLoading };
};
