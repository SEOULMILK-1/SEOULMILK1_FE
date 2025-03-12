import { createBrowserRouter } from 'react-router-dom';

import Step1Mobile from '../pages/MOBILE/uploadTax/Step1Mobile';
import Home from '../pages/MOBILE/Home';
import Step2Mobile from '../pages/MOBILE/uploadTax/Step2Mobile';
import LoginPage from '../pages/login';
import Step3Mobile from '../pages/MOBILE/uploadTax/Step3Mobile';
import Complete from '../pages/MOBILE/uploadTax/Complete';

const MobileRouter = createBrowserRouter([
  { path: '/', element: <LoginPage /> },
  { path: '/uploadTax/step1', element: <Step1Mobile /> },
  { path: '/uploadTax/step2', element: <Step2Mobile /> },
  { path: '/uploadTax/step3/checking', element: <Step3Mobile /> },
  { path: '/complete', element: <Complete /> },
  { path: '/Home', element: <Home /> }
]);

export default MobileRouter;
