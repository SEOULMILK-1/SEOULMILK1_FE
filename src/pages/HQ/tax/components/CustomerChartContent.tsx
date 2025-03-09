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

const CustomerChartContent = () => {
  const [data, setData] = useState<InvoiceData[]>([]);
  const [selectedItem, setSelectedItem] = useState<InvoiceData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accesstoken');
        const response = await api.get('/hq/search/tax', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('1111', response.data.result.responseList);
        setData(response.data.result.responseList);
      } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
      }
    };

    fetchData();
  }, [page]);

  const handleItemClick = (item: InvoiceData) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };
  return (
    <div className="h-[602px] w-[960px] overflow-y-auto overflow-x-hidden custom-scrollbar cursor-pointer ">
      {data.map((item, index) => (
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
          <div className="w-[170px] pl-7 text-sm font-medium text-gray-700">
            {item.taxDate}
          </div>
        </div>
      ))}
      <TaxDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedItem={selectedItem}
      />
    </div>
  );
};

export default CustomerChartContent;
