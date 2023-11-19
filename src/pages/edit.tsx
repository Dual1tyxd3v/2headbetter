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
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
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

const Span = styled.span`
  color: red;
  font-weight: bold;
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
  transition: all .2s;

  & svg {
    width: 4rem;
    height: 4rem;
  }

  &:hover {
    transform: scale(1.1);
    color: green;
  }
`;

const FileInputContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 3rem;
  transform: translateY(-50%);
`;

const FileLabel = styled.label`
  background-color: orange;
  border-radius: 10px;
  display: block;
  max-width: 15rem;
  text-align: center;
  padding: 1rem 2rem;
  cursor: pointer;
  color: #000;
  font-weight: bold;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.1);
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

  function inputHandler(e: ChangeEvent) {
    const fileName = (e.target as HTMLInputElement).files?.[0];
    fileName && setFile(fileName);
  }

  function saveData() {
    const time = new Date().getTime();
    uploadImg(
      { file, comment, time, timeframe, name: user?.email as string, data },
      { onSuccess: () => switchToggleMode() }
    );
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
          <FileInputContainer>
            <FileLabel htmlFor="file_input">
              Выберите или перетащите файл
            </FileLabel>
            <input
              onChange={inputHandler}
              style={{ display: 'none' }}
              type="file"
              id="file_input"
            />
          </FileInputContainer>
          {data?.img && !file && <img src={data.img} alt="Изображение" />}
          {file && (
            <p>
              Будет загружен файл <Span>{file.name}</Span>
            </p>
          )}
        </ImageWrapper>
        <CommentWrapper>
          <Textarea value={comment} onChange={textareaHandler} />
          <Buttons>
            <Button title="Сохранить" type="button" onClick={saveData}>
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
