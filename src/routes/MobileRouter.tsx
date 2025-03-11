import { createBrowserRouter } from 'react-router-dom';
import { Step2 } from '../pages/MOBILE/uploadTax/Step2';
import { Checking } from '../pages/MOBILE/uploadTax/Checking';
import { Complete } from '../pages/MOBILE/uploadTax/Complete';
import { Login } from '../pages/MOBILE/Login';
import Step1 from '../pages/MOBILE/uploadTax/Step1';
import Home from '../pages/MOBILE/Home';

const MobileRouter = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/uploadTax/step1', element: <Step1 /> },
  { path: '/uploadTax/step2', element: <Step2 /> },
  { path: '/checking', element: <Checking /> },
  { path: '/complete', element: <Complete /> },
  { path: '/login', element: <Login /> }
]);

export default MobileRouter;
