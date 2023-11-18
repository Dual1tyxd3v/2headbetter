import { useQuery } from '@tanstack/react-query';
import { getUser } from '../api/supabase';

export const useUser = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  return { isLoading, data };
};
