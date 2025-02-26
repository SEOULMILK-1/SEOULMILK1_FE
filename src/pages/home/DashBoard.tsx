import React from 'react';
import Sidebar from '../../common/Sidebar';

const DashBoard = () => {
  return (
    <div className="flex h-256 w-360 bg-gray-50 p-4">
      <Sidebar />
      <main className="flex-1 bg-white w-[1148px] rounded-3xl ml-5"></main>
    </div>
  );
};

export default DashBoard;
