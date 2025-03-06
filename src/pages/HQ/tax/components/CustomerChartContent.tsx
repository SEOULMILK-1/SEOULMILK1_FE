import { useState } from 'react';
import StatusBadge, { Status } from '../../../../common/StatusBagde';
import TaxDetailModal from '../../../../common/TaxDetailModal';

const statuses: Status[] = ['승인됨', '지급완료', '반려됨'];

interface InvoiceData {
  status: Status;
  number: string;
  title: string;
  date: string;
  center: string;
}

const data: InvoiceData[] = Array.from({ length: 20 }, (_, index) => ({
  status: statuses[index % statuses.length],
  number: String(index + 1).padStart(2, '0'),
  title: `○○월 세금계산서 ${index + 1}`,
  date: '2025.02.28',
  center: '서울우유태평고객센터'
}));

const CustomerChartContent = () => {
  const [selectedItem, setSelectedItem] = useState<InvoiceData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemClick = (item: InvoiceData) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="h-[532px] w-[960px] overflow-y-auto overflow-x-hidden custom-scrollbar">
      {data.map((item, index) => (
        <div
          key={index}
          className="mx-[8px] flex w-[932px] h-[42px] items-center rounded-[12px] hover:bg-gray-100 font-sm-medium cursor-pointer"
          onClick={() => handleItemClick(item)}
        >
          <div className="w-[92px] pl-4">
            <StatusBadge status={item.status} />
          </div>
          <div className="w-[92px] pl-5 text-sm font-medium text-gray-700">
            {item.number}
          </div>
          <div className="w-[200px] pl-6 text-sm font-medium text-gray-700">
            {item.center}
          </div>
          <div className="w-[358px] pl-6 text-sm font-medium text-gray-700">
            {item.title}
          </div>
          <div className="w-[170px] pl-7 text-sm font-medium text-gray-700">
            {item.date}
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
