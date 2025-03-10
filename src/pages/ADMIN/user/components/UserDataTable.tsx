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

interface UserDataTableProps {
  searchTerm: string;
}

const UserDataTable = ({ searchTerm }: UserDataTableProps) => {
  const [data, setData] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [displayData, setDisplayData] = useState<User[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem('accesstoken');

        const response = await api.get('/admin/user?page=0&size=110', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setData(response.data.result.responseList);
        setFilteredData(response.data.result.responseList);
        setTotalItems(response.data.result.totalElements);
      } catch (error) {
        console.error('유저데이터 연결에 에러가 발생했습니다.', error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (!searchTerm || searchTerm.trim() === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter((user) => {
        const csNameLower = user.csName ? user.csName.toLowerCase() : '';
        const nameLower = user.name ? user.name.toLowerCase() : '';
        const searchTermLower = searchTerm.toLowerCase();

        return (
          csNameLower.includes(searchTermLower) ||
          nameLower.includes(searchTermLower)
        );
      });
      setFilteredData(filtered);
      setTotalItems(filtered.length);
    }
  }, [searchTerm, data]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, filteredData.length);
    setDisplayData(filteredData.slice(startIndex, endIndex));
  }, [filteredData, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const openModal = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const deleteUser = (userId: number) => {
    setData((prevData) => {
      const updatedData = prevData.filter((user) => user.userId !== userId);
      setFilteredData(updatedData);
      return updatedData;
    });
  };

  const handleApproveUser = async (userId: number) => {
    try {
      const token = localStorage.getItem('accesstoken');
      const response = await api.post(`/admin/approve/${userId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setData((prevData) => {
          const updatedData = prevData.map((user) =>
            user.userId === userId ? { ...user, isAssigned: '등록' } : user
          );
          setFilteredData(updatedData);
          return updatedData;
        });
      }
    } catch (error) {
      console.error('등록에 실패했습니다', error);
    }
  };

  return (
    <div className="mt-4 flex h-[778px] w-[960px] flex-col items-start rounded-3xl border border-solid border-gray-300 bg-white">
      <UserDataTableHeader />

      <div className="flex-grow mx-2 overflow-y-scroll custom-scrollbar">
        {displayData.map((row, index) => (
          <div
            key={index}
            className="flex w-[932px] h-[42px] items-center hover:bg-gray-100 rounded-xl cursor-pointer"
            onClick={() => openModal(row)}
          >
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
            <div className="w-[200px] pl-5 text-gray-800 font-sm-medium tabular-nums">
              {row.phone}
            </div>
            <div className="w-[170px] pl-5 ml-1 text-gray-800 font-sm-medium tabular-nums">
              {row.createdAt}
            </div>
            <div className="w-[140px] px-5 py-2 items-center">
              {row.isAssigned === '미등록' && (
                <button
                  className="flex w-[85px] h-[26px] gap-1 pl-2 pr-3 items-center justify-center rounded-lg bg-[#E6F1F7] text-[#2C72FF] font-xs-regular"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApproveUser(row.userId);
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

      <ChartPagination
        totalItems={totalItems}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />

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
