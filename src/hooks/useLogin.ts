import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../api/supabase';
import { LoginForm } from '../types';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending: isLoading, mutate: auth } = useMutation({
    mutationFn: ({ email, pass }: LoginForm) => login({ email, pass }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);
      navigate('/', { replace: true });
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  return { auth, isLoading };
};
