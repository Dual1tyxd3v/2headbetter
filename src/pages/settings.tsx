import { useCheckAuth } from '../hooks/useCheckAuth';
import Spinner from './spinner';

export default function Settings() {
  const { isLoading } = useCheckAuth();

  if (isLoading) return <Spinner />;
  return <div>settings page</div>;
}
