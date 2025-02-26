import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginPage, CompoExample } from '../pages';

const router = createBrowserRouter([
  {
    path: '/',
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
