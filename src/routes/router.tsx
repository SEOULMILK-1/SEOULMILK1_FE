import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginPage, CompoExample } from '../pages';
import DashBoard from '../pages/home/DashBoard';
import RootLayout from '../outlet/RootLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '', element: <DashBoard /> },
      { path: 'example', element: <CompoExample /> }
    ]
  },
  { path: '/login', element: <LoginPage /> } //sidebar 필요없을때
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
