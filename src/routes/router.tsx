import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginPage, CompoExample } from '../pages';
import DashBoard from '../pages/home/DashBoard';
import RootLayout from '../outlet/RootLayout';
import HeadCustomer from '../pages/head/customer/HeadCustomer';
import AdminRootLayout from '../outlet/AdminRootLayout';

const router = createBrowserRouter([
  //관리자쪽 라우터 (관리자)
  {
    path: '/',
    element: <AdminRootLayout />,
    children: [
      { path: '/', element: <DashBoard /> },
      { path: 'example', element: <CompoExample /> }
    ]
  },

  //본사쪽 라우터 (고객)
  {
    path: '/',
    element: <RootLayout />,
    children: [{ path: '/head-customer', element: <HeadCustomer /> }]
  },
  { path: '/login', element: <LoginPage /> } //sidebar 필요없을때
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
