import { ChartData } from '../types';
import { useAppContext } from '../hooks/useAppContext';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Controls from './controls';
import Edit from '../pages/edit';

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

export default function Chart({
  data,
  own,
}: {
  data: ChartData;
  own: boolean;
}) {
  const [timeframe, timeFrameData] = data;
  const { state, changeState } = useAppContext();
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (timeFrameData && !state[timeframe]) {
      changeState(timeframe, true);
    }
  }, []);

  function clickHandler() {
    changeState(timeframe, !state[timeframe]);
  }

  const switchToggleMode = useCallback(
    () => setIsEditMode((prev) => !prev),
    []
  );

  return (
    <div>
      {isEditMode && (
        <Edit switchToggleMode={switchToggleMode} data={timeFrameData} timeframe={timeframe} />
      )}
      <Head onClick={clickHandler}>
        <Title>{`${state[timeframe] ? '-' : '+'} ${timeframe}`} </Title>
        {own && <Controls switchToggleMode={switchToggleMode} />}
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
