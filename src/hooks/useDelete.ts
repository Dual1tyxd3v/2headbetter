import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteData } from '../api/supabase';
import { DeleteData } from '../types';

export const useDelete = () => {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteFrame } = useMutation({
    mutationFn: ({ name, timeframe, img }: DeleteData) =>
      deleteData({ name, timeframe, img }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['ownData'],
      });
    },
    onError: (error: Error) => {
      console.log(error.message);
    },
  });

  return { isDeleting, deleteFrame };
};
