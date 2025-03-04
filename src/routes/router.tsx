import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HeadCustomer from '../pages/HQ/customer/HeadCustomer';
import Tax from '../pages/HQ/tax';
import AdminRootLayout from '../outlet/AdminRootLayout';
import { CS_home } from '../pages/CS/home';
import DashBoard from '../pages/ADMIN/home/DashBoard';
import UserManage from '../pages/ADMIN/user/UserManage';
import HQRootLayout from '../outlet/HQRootLayout';
import CSRootLayout from '../outlet/CSRootLayout';
import Step1 from '../pages/CS/UploadTax/Step1';
import Step2 from '../pages/CS/UploadTax/Step2';
import Step3 from '../pages/CS/UploadTax/Step3';
import LoginPage from '../pages/login';

const router = createBrowserRouter([
  //관리자쪽 라우터 (ADMIN)
  {
    path: '/',
    element: <AdminRootLayout />,
    children: [
      { path: '/', element: <DashBoard /> },
      { path: '/user-manage', element: <UserManage /> },
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
    children: [
      { path: '/CS-home', element: <CS_home /> },
      { path: '/upload-tax/step1', element: <Step1 /> },
      { path: '/upload-tax/step2', element: <Step2 /> },
      { path: '/upload-tax/step3', element: <Step3 /> }
    ]
  },
  { path: '/login', element: <LoginPage /> } //sidebar 필요없을때
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
