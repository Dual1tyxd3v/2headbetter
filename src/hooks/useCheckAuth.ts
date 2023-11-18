import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from './useUser';

export const useCheckAuth = () => {
  const { isLoading, data: user } = useUser();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isLoading && user?.role !== 'authenticated') {
      navigate('/login');
      localStorage.removeItem('user');
    }
    if (!isLoading && user?.role === 'authenticated' && pathname === '/login') {
      navigate('/');
    }
  }, [isLoading, user, navigate, pathname]);

  return { isLoading, user };
};
