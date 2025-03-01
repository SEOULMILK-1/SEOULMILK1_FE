import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginPage, CompoExample } from '../pages';
import DashBoard from '../pages/home/DashBoard';
import RootLayout from '../outlet/RootLayout';
import HeadCustomer from '../pages/head/customer/HeadCustomer';
import Tax from '../pages/head/tax';
import AdminRootLayout from '../outlet/AdminRootLayout';
import { CS_home } from '../pages/CS/home';

const router = createBrowserRouter([
  //관리자쪽 라우터 (ADMIN)
  {
    path: '/',
    element: <AdminRootLayout />,
    children: [
      { path: '/', element: <DashBoard /> },
      { path: 'example', element: <CompoExample /> }
    ]
  },

  //본사쪽 라우터 (HQ - 직원)
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/head-customer', element: <HeadCustomer /> },
      { path: '/tax', element: <Tax /> }
    ]
  },
  //대리점쪽 라우터(CS)
  {
    path: '/',
    element: <RootLayout />,
    children: [{ path: '/CS-home', element: <CS_home /> }]
  },
  { path: '/login', element: <LoginPage /> } //sidebar 필요없을때
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
