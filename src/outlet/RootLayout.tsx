import Sidebar from '../common/Sidebar';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className="flex h-256 w-360 bg-gray-50 p-4">
      <Sidebar type="customer" />
      <main className="flex-1 bg-white w-[1148px] rounded-3xl ml-5">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
