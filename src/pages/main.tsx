import Spinner from './spinner';
import { useCheckAuth } from '../hooks/useCheckAuth';
import { useGetOwnData } from '../hooks/useGetOwnData';
import Column from '../ui/column';
import styled from 'styled-components';
import { dataFilter } from '../services/utils';

const Container = styled.main`
  display: flex;
  width: 98vw;
  margin: 0 auto;
  min-height: 100vh;
  justify-content: space-evenly;
  background-color: #ccc;
`;

export default function Main() {
  const { isLoading, user } = useCheckAuth();
  const { isLoading: isOwnLoading, data } = useGetOwnData();

  if (isLoading || isOwnLoading) return <Spinner />;
  if (!data || !user) return null;

  const owner = user.email as string;
  const { ownData, restData } = dataFilter(data, owner);
  return (
    <Container>
      {ownData && <Column data={ownData[0]} own />}
      {restData && restData.map((row) => <Column key={row.name} data={row} />)}
    </Container>
  );
}
