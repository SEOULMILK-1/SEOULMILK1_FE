import { useEffect, useState } from 'react';
import StatusBadge, { Status } from '../../../../common/StatusBagde';
import TaxDetailModal from '../../../../common/TaxDetailModal';
import api from '../../../../hooks/api';

interface InvoiceData {
  status: Status;
  ntsTaxId: string;
  title: string;
  taxDate: string;
  team: string;
  approvalNo: string;
  supplier: string;
  recipient: string;
  dateFormatted: string;
  amount: string;
}

interface CustomerChartContentProps {
  selectedStatus: string;
  startDate: string | null;
  endDate: string | null;
  currentPage: number;
  pageSize: number;
  onTotalItemsChange: (totalItems: number) => void;
}

const CustomerChartContent = ({
  selectedStatus,
  startDate,
  endDate,
  currentPage,
  pageSize,
  onTotalItemsChange
}: CustomerChartContentProps) => {
  const [data, setData] = useState<InvoiceData[]>([]);
  const [selectedItem, setSelectedItem] = useState<InvoiceData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accesstoken');
        const response = await api.get('/hq/search/tax', {
          params: {
            page: currentPage - 1,
            size: pageSize
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // console.log('1111', response.data);
        // console.log('222', response.data.result.totalElements);
        setData(response.data.result.responseList);
        onTotalItemsChange(response.data.result.totalElements);
      } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
      }
    };

    fetchData();
  }, [currentPage, pageSize, onTotalItemsChange]);

  useEffect(() => {
    const hasFilters = Boolean(selectedStatus || startDate || endDate);
    setIsFiltering(hasFilters);
  }, [selectedStatus, startDate, endDate]);

  const handleItemClick = (item: InvoiceData) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const parseDate = (dateString: string): Date => {
    if (!dateString) return new Date(0);
    const [year, month, day] = dateString.split('.').map(Number);
    return new Date(year, month - 1, day);
  };

  const filteredData = isFiltering
    ? data.filter((item) => {
        if (selectedStatus && item.status !== selectedStatus) {
          return false;
        }

        if (startDate || endDate) {
          const itemDate = parseDate(item.taxDate);

          if (startDate && itemDate < parseDate(startDate)) {
            return false;
          }

          if (endDate && itemDate > parseDate(endDate)) {
            return false;
          }
        }

        return true;
      })
    : data;

  return (
    <div className="h-[538px] w-[960px] overflow-y-scroll custom-scrollbar cursor-pointer">
      {filteredData.length > 0 ? (
        filteredData.map((item, index) => (
          <div
            key={index}
            className="mx-[8px] flex w-[932px] h-[42px] items-center rounded-[12px] hover:bg-gray-100 font-sm-medium"
            onClick={() => handleItemClick(item)}
          >
            <div className="w-[92px] pl-5">
              <StatusBadge status={item.status} />
            </div>
            <div className="w-[92px] pl-6 text-sm font-medium text-gray-700">
              {item.ntsTaxId}
            </div>
            <div className="w-[200px] pl-6 text-sm font-medium text-gray-700">
              {item.team}
            </div>
            <div className="w-[358px] pl-6 text-sm font-medium text-gray-700 ">
              {item.title}
            </div>
            <div className="w-[170px] pl-7 text-sm font-medium text-gray-700 tabular-nums">
              {item.taxDate}
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center h-full text-gray-500">
          {isFiltering ? '결과가 없습니다.' : '로그인 후 이용해주세요'}
        </div>
      )}
      <TaxDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedItem={selectedItem}
      />
    </div>
  );
};

export default CustomerChartContent;
