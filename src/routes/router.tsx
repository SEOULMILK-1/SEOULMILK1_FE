import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginPage, CompoExample } from '../pages';

import HeadCustomer from '../pages/HQ/customer/HeadCustomer';
import Tax from '../pages/HQ/tax';
import AdminRootLayout from '../outlet/AdminRootLayout';
import DashBoard from '../pages/ADMIN/home/DashBoard';
import UserManage from '../pages/ADMIN/user/UserManage';
import HQRootLayout from '../outlet/HQRootLayout';
import CSRootLayout from '../outlet/CSRootLayout';
import CSTax from '../pages/CS/tax';

const router = createBrowserRouter([
  //관리자쪽 라우터 (ADMIN)
  {
    path: '/',
    element: <AdminRootLayout />,
    children: [
      { path: '/', element: <DashBoard /> },
      { path: '/user-manage', element: <UserManage /> },
      { path: 'example', element: <CompoExample /> }
    ]
  },

  //본사쪽 라우터 (HQ - 직원)
  {
    path: '/',
    element: <HQRootLayout />,
    children: [
      { path: '/head-customer', element: <HeadCustomer /> },
      { path: '/tax', element: <Tax /> }
    ]
  },
  //대리점쪽 라우터(CS)
  {
    path: '/',
    element: <CSRootLayout />,
    children: [{ path: '/CS-tax', element: <CSTax/> }]
  },
  { path: '/login', element: <LoginPage /> } //sidebar 필요없을때
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
