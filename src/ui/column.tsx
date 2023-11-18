import styled, { css } from 'styled-components';
import { ChartData, ColumnData } from '../types';
import Chart from './chart';

const Container = styled.div`
  background-color: var(--color-main-bg);
  width: 48.8vw;
`;

type TitleProps = {
  own: string;
};

const Title = styled.h3<TitleProps>`
  color: #000;
  text-transform: capitalize;
  text-align: center;
  padding: 1rem;

  ${(props) =>
    props.own === 'true'
      ? css`
          background-color: green;
        `
      : css`
          background-color: #a72828;
        `}
`;

export default function Column({
  data,
  own = false,
}: {
  data: ColumnData;
  own?: boolean;
}) {
  const { name } = data;
  const chartsData = Object.entries(data).slice(3);

  return (
    <Container>
      <Title own={own.toString()}>{name.slice(0, name.indexOf('@'))}</Title>
      {chartsData.map((chartData) => (
        <Chart own={own} key={`${name}_${chartData[0]}`} data={chartData as ChartData} />
      ))}
    </Container>
  );
}
