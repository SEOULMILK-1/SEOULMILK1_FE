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
  approvalNo: string;
  supplier: string;
  recipient: string;
  dateFormatted: string;
  amount: string;
}

const data: InvoiceData[] = Array.from({ length: 20 }, (_, index) => ({
  status: statuses[index % statuses.length],
  number: String(index + 1).padStart(2, '0'),
  title: `○○월 세금계산서 ${index + 1}`,
  date: '2025.02.28',
  center: '서울우유태평고객센터',
  approvalNo: `APPROVAL-${index + 1}`,
  supplier: `Supplier ${index + 1}`,
  recipient: `Recipient ${index + 1}`,
  dateFormatted: '2025-02-28',
  amount: `${(index + 1) * 1000}원`
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
