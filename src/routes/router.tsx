import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginPage, CompoExample } from '../pages';
import DashBoard from '../pages/home/DashBoard';
import RootLayout from '../outlet/RootLayout';
import HeadCustomer from '../pages/head/customer/HeadCustomer';
import Tax from '../pages/head/tax';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <DashBoard /> },
      { path: '/head-customer', element: <HeadCustomer /> },
      { path: '/tax', element: <Tax /> },
      { path: 'example', element: <CompoExample /> }
    ]
  },
  { path: '/login', element: <LoginPage /> } //sidebar 필요없을때
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
