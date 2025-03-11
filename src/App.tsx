import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import WebRouter from './routes/WebRouter';
import MobileRouter from './routes/MobileRouter';
import { RouterProvider } from 'react-router-dom';

const App = () => {
  const [isMobileView, setIsMobileView] = useState<boolean | null>(null);

  useEffect(() => {
    setIsMobileView(isMobile);
  }, []);

  if (isMobileView === null) {
    return <p>로딩 중...</p>;
  }

  return <RouterProvider router={isMobileView ? MobileRouter : WebRouter} />;
};

export default App;
