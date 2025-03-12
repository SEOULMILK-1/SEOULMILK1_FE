import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import WebRouter from './routes/WebRouter';
import MobileRouter from './routes/MobileRouter';
import { RouterProvider } from 'react-router-dom';

const App = () => {
  const [isMobileView, setIsMobileView] = useState<boolean | null>(null);

  useEffect(() => {
    const updateView = () => {
      setIsMobileView(isMobile);
    };

    updateView();
    window.addEventListener('resize', updateView); // 화면 크기 변경 감지

    return () => {
      window.removeEventListener('resize', updateView);
    };
  }, []);
  if (isMobileView === null) {
    return <p></p>;
  }

  return <RouterProvider router={isMobileView ? MobileRouter : WebRouter} />;
};

export default App;
