import { useQuery } from '@tanstack/react-query';
import { getData } from '../api/supabase';

export const useGetOwnData = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['ownData'],
    queryFn: getData,
  });

  return { isLoading, data };
};
