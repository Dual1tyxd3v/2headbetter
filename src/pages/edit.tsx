import styled from 'styled-components';
import { useCheckAuth } from '../hooks/useCheckAuth';
import Spinner from './spinner';
import { TimeFrames, TimeframeData } from '../types';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { IoIosSave } from 'react-icons/io';
import { MdAutorenew } from 'react-icons/md';
import { ChangeEvent, DragEvent, useState } from 'react';
import { useUpload } from '../hooks/useUpload';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100vw;
  height: 100vh;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  width: 90vw;
  height: 90vh;
  background-color: #000;
  border-radius: 10px;
  overflow: hidden;
`;
const ImageWrapper = styled.div`
  height: 60vh;
  border-bottom: 2px solid #fff;
  text-align: center;
`;

const CloseModal = styled.button`
  position: fixed;
  top: 1rem;
  right: 1rem;
  background-color: transparent;
  color: #fff;
  width: 3rem;
  height: 3rem;
  cursor: pointer;

  & svg {
    width: 100%;
    height: 100%;
  }
`;

const CommentWrapper = styled.div`
  display: flex;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 30vh;
  background-color: #000;
  border-radius: 0 0 10px 10px;
  padding: 1rem;

  &:focus {
    outline: none;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  width: 8rem;
  justify-content: space-evenly;
  align-items: center;
`;

const Button = styled.button`
  background-color: transparent;
  cursor: pointer;
  width: 4rem;
  height: 4rem;

  & svg {
    width: 4rem;
    height: 4rem;
  }
`;

type EditProps = {
  data: TimeframeData | null;
  switchToggleMode: () => void;
  timeframe: TimeFrames;
};

export default function Edit({ data, switchToggleMode, timeframe }: EditProps) {
  const { isLoading, user } = useCheckAuth();
  const [comment, setComment] = useState(data?.comment || '');
  const [file, setFile] = useState<null | File>(null);
  const { isLoading: isUpdating, uploadImg } = useUpload();

  function textareaHandler(e: ChangeEvent) {
    const a = e.target as HTMLTextAreaElement;
    setComment(a.value);
  }

  function dndReset(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  function dropHandler(e: DragEvent) {
    dndReset(e);
    setFile(e.dataTransfer?.files[0]);
  }

  function saveImg() {
    if (!file) return;
    const time = new Date().getTime();
    uploadImg({ file, comment, time, timeframe, name: user?.email as string });
  }

  if (isLoading || isUpdating) return <Spinner />;
  return (
    <Wrapper>
      <CloseModal onClick={() => switchToggleMode()}>
        <IoCloseCircleSharp />
      </CloseModal>
      <Form>
        <ImageWrapper
          onDrop={dropHandler}
          onDragEnter={dndReset}
          onDragOver={dndReset}
        >
          {data?.img && <img src={data.img} alt="Изображение" />}
        </ImageWrapper>
        <CommentWrapper>
          <Textarea value={comment} onChange={textareaHandler} />
          <Buttons>
            <Button title="Сохранить" type="button" onClick={saveImg}>
              <IoIosSave />
            </Button>
            <Button
              type="button"
              title="Очистить"
              onClick={() => setComment('')}
            >
              <MdAutorenew />
            </Button>
          </Buttons>
        </CommentWrapper>
      </Form>
    </Wrapper>
  );
}
