import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginPage, CompoExample } from '../pages';

import HeadCustomer from '../pages/HQ/customer/HeadCustomer';
import Tax from '../pages/HQ/tax';
import AdminRootLayout from '../outlet/AdminRootLayout';
import DashBoard from '../pages/ADMIN/home/DashBoard';
import UserManage from '../pages/ADMIN/user/UserManage';
import HQRootLayout from '../outlet/HQRootLayout';
import CSRootLayout from '../outlet/CSRootLayout';
import CSSignup from '../pages/CS/cssignup/CSSignup';
import HeadSignup from '../pages/HQ/signup/HeadSignup';
import Signup from '../pages/HQ/signup';
import Signup2 from '../pages/HQ/signup/components/Signup2';
import CsSignup2 from '../pages/CS/cssignup/components/CsSignup2';
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
    children: [{ path: '/CS-tax', element: <CSTax /> }]
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <Signup /> },
  { path: '/head/signup', element: <HeadSignup /> },
  { path: '/head/signup2', element: <Signup2 /> },
  { path: '/cs/signup', element: <CSSignup /> },
  { path: '/cs/signup2', element: <CsSignup2 /> }
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
