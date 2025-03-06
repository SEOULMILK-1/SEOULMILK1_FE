import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HeadCustomer from '../pages/HQ/customer/HeadCustomer';
import Tax from '../pages/HQ/tax';
import AdminRootLayout from '../outlet/AdminRootLayout';
import DashBoard from '../pages/ADMIN/home/DashBoard';
import UserManage from '../pages/ADMIN/user/UserManage';
import HQRootLayout from '../outlet/HQRootLayout';
import CSRootLayout from '../outlet/CSRootLayout';
import Step1 from '../pages/CS/uploadTax/Step1';
import Step2 from '../pages/CS/uploadTax/Step2';
import Step3 from '../pages/CS/uploadTax/Step3';
import LoginPage from '../pages/login';
import CSSignup from '../pages/CS/cssignup/CSSignup';
import HeadSignup from '../pages/HQ/signup/HeadSignup';
import Signup from '../pages/HQ/signup';
import Signup2 from '../pages/HQ/signup/components/Signup2';
import CsSignup2 from '../pages/CS/cssignup/components/CsSignup2';
import CSTax from '../pages/CS/tax';
import Payment from '../pages/HQ/payment/Payment';
import HQ_home from '../pages/HQ/home/HQDashBoard';
import { AdminBoard } from '../pages/ADMIN/board';
import { AdminTax } from '../pages/ADMIN/tax';
import { AdminPayment } from '../pages/ADMIN/payment';
import { CSHome } from '../pages/CS/home';

const router = createBrowserRouter([
  //관리자쪽 라우터 (ADMIN)
  {
    path: '/',
    element: <AdminRootLayout />,
    children: [
      { path: '/', element: <DashBoard /> },
      { path: '/user-manage', element: <UserManage /> },
      { path: '/admin-board', element: <AdminBoard /> },
      { path: '/admin-tax', element: <AdminTax /> },
      { path: '/admin-payment', element: <AdminPayment /> }
    ]
  },

  //본사쪽 라우터 (HQ - 직원)
  {
    path: '/',
    element: <HQRootLayout />,
    children: [
      { path: '/HQ-home', element: <HQ_home /> },
      { path: '/head-customer', element: <HeadCustomer /> },
      { path: '/tax', element: <Tax /> },
      { path: '/payment', element: <Payment /> }
    ]
  },
  //대리점쪽 라우터(CS)
  {
    path: '/',
    element: <CSRootLayout />,
    children: [
      { path: '/CS-home', element: <CSHome /> },
      { path: '/upload-tax/step1', element: <Step1 /> },
      { path: '/upload-tax/step2', element: <Step2 /> },
      { path: '/upload-tax/step3', element: <Step3 /> },
      { path: '/CS-tax', element: <CSTax /> }
    ]
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
