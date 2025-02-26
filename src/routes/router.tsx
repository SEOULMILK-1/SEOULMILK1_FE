import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginPage, CompoExample } from '../pages';
import DashBoard from '../pages/home/DashBoard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashBoard />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/example',
    element: <CompoExample /> //개발용
  }
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
