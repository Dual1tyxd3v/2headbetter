import { ColumnData } from '../types';

export const dataFilter = (data: ColumnData[], name: string) => {
  const ownData: ColumnData[] = [];
  const restData: ColumnData[] = [];
  data.forEach((row) => {
    if (row.name === name) {
      ownData.push(row);
    } else {
      restData.push(row);
    }
  });

  return { ownData, restData };
};
