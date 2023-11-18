import { ReactElement } from 'react';
import styled from 'styled-components';

const WrapperLayout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Wrapper({ children }: { children: ReactElement }) {
  return <WrapperLayout>{children}</WrapperLayout>;
}
