import { useEffect, useState } from 'react';
import StatusBadge, { Status } from '../../../../common/StatusBagde';
import api from '../../../../hooks/api';
import TaxDetailModal from './TaxDetailModal';
import { useLocation, useSearchParams } from 'react-router-dom';

interface InvoiceData {
  id: string;
  status: Status;
  number: string;
  title: string;
  date: string;
  center: string;
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
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [page] = useState(1);
  const size = 20;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/hq', {
          params: { page, size }
        });

        if (response.data.isSuccess) {
          const transformedData = response.data.result.responseList.map(
            (item: any) => ({
              id: item.ntsTaxId ? String(item.ntsTaxId) : '',
              title: item.title || '제목 없음',
              date: item.taxDate || '날짜 없음',
              center: item.csName || '센터 없음'
            })
          );

          setData(transformedData);

          const taxIdParam = searchParams.get('taxId');
          if (taxIdParam) {
            const itemToSelect = transformedData.find(
              (item: InvoiceData) => item.id === taxIdParam
            );
            if (itemToSelect) {
              setSelectedItem(itemToSelect);
              setIsModalOpen(true);
            }
          }
        } else {
          console.error('API 요청 실패:', response.data.message);
        }
      } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
      }
    };

    fetchData();
  }, [page]);

  const handleItemClick = (item: InvoiceData) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    setSearchParams({ taxId: item.id });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('taxId');
    setSearchParams(newSearchParams);
  };
  useEffect(() => {
    const taxIdParam = searchParams.get('taxId');
    if (taxIdParam && !isModalOpen) {
      const item = data.find((item) => item.id === taxIdParam);
      if (item) {
        setSelectedItem(item);
        setIsModalOpen(true);
      }
    }
  }, [location.pathname, data]);

  return (
    <div className="h-[602px] w-[960px] overflow-y-auto overflow-x-hidden custom-scrollbar ">
      {data.map((item, index) => (
        <div
          key={index}
          className="mx-[8px] flex w-[932px] h-[42px] items-center rounded-[12px] hover:bg-gray-100 font-sm-medium"
          onClick={() => handleItemClick(item)}
        >
          <div className="w-[92px] pl-5">
            <StatusBadge status={item.status} />
          </div>
          <div className="w-[92px] pl-5 text-sm font-medium text-gray-700">
            {item.number}
          </div>
          <div className="w-[358px] pl-5 text-sm font-medium text-gray-700">
            {item.title}
          </div>
          <div className="w-[170px] pl-5 text-sm font-medium text-gray-700">
            {item.date}
          </div>
          <div className="w-[200px] pl-5 text-sm font-medium text-gray-700">
            {item.center}
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
