import { FaPencil, FaTrashCan } from 'react-icons/fa6';
import styled from 'styled-components';
import { MouseEvent } from 'react';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  background-color: transparent;
  cursor: pointer;
  color: #000;
  border-radius: 3px;
  border: 1px solid #000;

  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

type ControlsProps = {
  switchToggleMode: () => void;
  deleteHandle: () => void;
};

export default function Controls({
  switchToggleMode,
  deleteHandle,
}: ControlsProps) {
  function editHandler(e: MouseEvent) {
    e.stopPropagation();
    switchToggleMode();
  }

  function deleteHandler(e: MouseEvent) {
    e.stopPropagation();
    deleteHandle();
  }
  return (
    <Wrapper>
      <Button onClick={deleteHandler}>
        <FaTrashCan />
      </Button>
      <Button onClick={editHandler}>
        <FaPencil />
      </Button>
    </Wrapper>
  );
}
