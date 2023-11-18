import Spinner from './spinner';
import { useCheckAuth } from '../hooks/useCheckAuth';

export default function Main() {
  const { isLoading } = useCheckAuth();

  if (isLoading) return <Spinner />;
  return (
    <div>
      Main page
      <p></p>
    </div>
  );
}
