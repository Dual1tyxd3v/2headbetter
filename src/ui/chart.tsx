import { ChartData } from '../types';
import { useAppContext } from '../hooks/useAppContext';
import { useEffect, MouseEvent } from 'react';
import styled from 'styled-components';
import { FaPencil } from 'react-icons/fa6';

const Title = styled.p`
  color: #000;
  font-weight: bold;
  padding: 1rem 0;
`;

const Head = styled.div`
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  background-color: #bdbde0;

  &:hover {
    background-color: #a3a3dd;
  }
`;

const ImageWrapper = styled.div`
  height: 50rem;
  text-align: center;
  position: relative;

  &:hover {
    p {
      display: block;
    }
  }
`;

const Image = styled.img`
  object-fit: cover;
  height: 100%;
`;

const Comment = styled.p`
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 1rem 2rem;
  display: none;
`;

const Button = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  background-color: transparent;
  cursor: pointer;
  color: #000;
  border-radius: 3px;
  border: 1px solid #000;
`;

export default function Chart({
  data,
  own,
}: {
  data: ChartData;
  own: boolean;
}) {
  const [timeframe, timeFrameData] = data;
  const { state, changeState } = useAppContext();

  useEffect(() => {
    if (timeFrameData && !state[timeframe]) {
      changeState(timeframe, true);
    }
  }, []);

  function clickHandler() {
    changeState(timeframe, !state[timeframe]);
  }

  function clickHandler2(e: MouseEvent) {
    e.stopPropagation();
    alert(2);
  }

  return (
    <div>
      <Head onClick={clickHandler}>
        <Title>{`${state[timeframe] ? '-' : '+'} ${timeframe}`} </Title>
        {own && (
          <Button onClick={clickHandler2}>
            <FaPencil />
          </Button>
        )}
      </Head>
      {state[timeframe] && (
        <ImageWrapper>
          {timeFrameData && (
            <>
              <Image src={timeFrameData.img} referrerPolicy="no-referrer" />
              {timeFrameData.comment && (
                <Comment>{timeFrameData.comment}</Comment>
              )}
            </>
          )}
        </ImageWrapper>
      )}
    </div>
  );
}
