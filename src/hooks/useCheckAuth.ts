import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './useUser';

export const useCheckAuth = () => {
  const { isLoading, data: user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user?.role !== 'authenticated') {
      navigate('/login');
    }
  }, [isLoading, user, navigate]);

  return { isLoading };
};
