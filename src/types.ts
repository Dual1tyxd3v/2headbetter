export type LoginForm = {
  email: string;
  pass: string;
};

export type ColumnData = {
  name: string;
  created_at: string;
  id: number;
  m1: TimeframeData;
  m5: TimeframeData;
  m15: TimeframeData;
  h1: TimeframeData;
  h4: TimeframeData;
  d: TimeframeData;
};

export type TimeframeData = {
  img: string;
  time: string;
  comment: string;
};

export type TimeFrames = 'm1' | 'm5' | 'm15' | 'h1' | 'h4' | 'd';

export type ChartData = [TimeFrames, null] | [TimeFrames, TimeframeData];

export type ContextState = {
  state: {
    m1: boolean;
    m5: boolean;
    m15: boolean;
    h1: boolean;
    h4: boolean;
    d: boolean;
  };
  changeState: (t: TimeFrames, v: boolean) => void;
};

export type UploadType = {
  file: File | null;
  comment: string;
  time: number;
  timeframe: TimeFrames;
  name: string;
  data: TimeframeData | null;
}
