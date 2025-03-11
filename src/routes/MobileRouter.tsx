import { createBrowserRouter } from 'react-router-dom';
import { EditTax } from '../pages/MOBILE/EditTax';
import { Checking } from '../pages/MOBILE/Checking';
import { Complete } from '../pages/MOBILE/Complete';
import { Login } from '../pages/MOBILE/Login';
import UploadTax from '../pages/MOBILE/UploadTax';
import Home from '../pages/MOBILE/Home';

const MobileRouter = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/uploadTax', element: <UploadTax /> },
  { path: '/editTax', element: <EditTax /> },
  { path: '/checking', element: <Checking /> },
  { path: '/complete', element: <Complete /> },
  { path: '/login', element: <Login /> }
]);

export default MobileRouter;
