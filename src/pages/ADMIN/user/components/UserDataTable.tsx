import { useEffect, useState } from 'react';
import UserSideModal from './UserSideModal';
import ChartPagination from '../../../../common/ChartPagination';
import UserDataTableHeader from './UserDataTableHeader';
import PlusIcon from '../../../../../public/Icon/PlusIcon';
import api from '../../../../hooks/api';

interface User {
  userId: number;
  employeeId: number;
  name: string;
  phone: string;
  role: 'ADMIN';
  csName: string;
  createdAt: string;
  isAssigned: string;
}

const UserDataTable = () => {
  const [data, setData] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem('accesstoken');
        console.log('accesstoken', token);

        const response = await api.get('/admin/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('data', response.data);
        setData(response.data.result.responseList);
      } catch (error) {
        console.error('연결에러', error);
      }
    };
    getData();
  }, []);

  const openModal = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const deleteUser = (userId: number) => {
    setData((prevData) => prevData.filter((user) => user.userId !== userId));
  };

  return (
    <div className="mt-4 flex h-[778px] w-[960px] flex-col items-start rounded-3xl border border-solid border-gray-300 bg-white">
      <UserDataTableHeader />

      <div className="flex-grow mx-2 overflow-y-scroll">
        {data.map((row, index) => (
          <div
            key={index}
            className="flex w-[932px] h-[42px] items-center hover:bg-gray-100 rounded-xl cursor-pointer"
            onClick={() => openModal(row)}
          >
            {/* status */}
            <div
              className={`w-[92px] pl-5 font-sm-medium ${
                row.isAssigned === '미등록'
                  ? 'text-warning-600'
                  : 'text-gray-800'
              }`}
            >
              {row.isAssigned}
            </div>

            <div className="w-[190px] pl-5 gap-5 text-gray-800 font-sm-medium">
              {row.csName}
            </div>
            <div className="w-[120px] pl-5 ml-1 text-gray-800 font-sm-medium">
              {row.name}
            </div>
            <div className="w-[200px] pl-5 text-gray-800 font-sm-medium text-left">
              {row.phone}
            </div>
            <div className="w-[170px] pl-5 ml-1 text-gray-800 font-sm-medium">
              {row.createdAt}
            </div>
            <div className="w-[140px] px-5 py-2 items-center">
              {row.isAssigned === '미등록' && (
                <button
                  className="flex w-[85px] h-[26px] gap-1 pl-2 pr-3 items-center justify-center rounded-lg bg-[#E6F1F7] text-[#2C72FF] font-xs-regular"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('등록하기');
                  }}
                >
                  <PlusIcon />
                  등록하기
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <ChartPagination />

      {isModalOpen && selectedUser && (
        <UserSideModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={selectedUser}
          role="admin"
          onDelete={() => deleteUser(selectedUser.userId)}
        />
      )}
    </div>
  );
};

export default UserDataTable;
