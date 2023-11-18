import { useEffect } from 'react';
import { useUser } from '../hooks/useUser';
import Spinner from './spinner';
import { useNavigate } from 'react-router-dom';

export default function Main() {
  const { isLoading, data: user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user?.role !== 'authenticated') {
      navigate('/login');
    }
  }, [isLoading, user, navigate]);

  if (isLoading) return <Spinner />;
  return (
    <div>
      Main page
      <p></p>
    </div>
  );
}
