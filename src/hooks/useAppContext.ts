import { useContext } from 'react';
import { AppContext } from '../App';

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('Context must be used with provider');

  return context;
};