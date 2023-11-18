import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Main from './pages/main';
import Login from './pages/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createContext, useState } from 'react';
import { ContextState, TimeFrames } from './types';

export const AppContext = createContext<null | ContextState>(null);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  const [state, setState] = useState({
    m1: false,
    m5: false,
    m15: false,
    h1: false,
    h4: false,
    d: false,
  });

  const changeState = (t: TimeFrames, v: boolean) =>
    setState((prev) => ({ ...prev, [t]: v }));

  return (
    <AppContext.Provider value={{ state, changeState }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </AppContext.Provider>
  );
}

export default App;
