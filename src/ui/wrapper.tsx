import { ReactElement } from 'react';
import styled from 'styled-components';

const WrapperLayout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--color-main-bg);
  z-index: 2;
`;

export default function Wrapper({ children }: { children: ReactElement }) {
  return <WrapperLayout>{children}</WrapperLayout>;
}
