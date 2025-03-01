import { useState } from 'react';

interface Customer {
  center: string;
  name: string;
  phone: string;
  email: string;
}

const dataList1: Customer[] = [
  {
    center: '서울우유태평고객센터',
    name: '김구름',
    phone: '010-1234-5678',
    email: 'cloudKim@gmail.com'
  },
  {
    center: '서울우유협동조합',
    name: '김구름',
    phone: '010-1234-5678',
    email: 'cloudKim@gmail.com'
  }
];

const CustomerChartContent = () => {
  const [selectedList, setSelectedList] = useState<number | null>(null);

  // 임시
  const displayedData: Customer[] = Array(7)
    .fill(dataList1)
    .flat()
    .slice(0, 14);

  return (
    <div className="h-[588px] w-[960px]">
      {displayedData.map((item, index) => (
        <div
          key={index}
          onClick={() => setSelectedList(index)}
          className={`flex w-[932px] h-[42px] mx-2 items-start gap-2 rounded-xl flex-col cursor-pointer ${
            selectedList === index ? 'bg-white' : 'hover:bg-gray-100'
          }`}
        >
          <div className="flex">
            <div className="flex w-[200px] h-[42px] pl-5 items-center text-gray-800 font-sm-medium">
              {item.center}
            </div>
            <div className="flex w-[120px] h-[42px] pl-5 items-center text-gray-800 font-sm-medium">
              {item.name}
            </div>
            <div className="flex w-[200px] h-[42px] pl-5 items-center text-gray-800 font-sm-medium">
              {item.phone}
            </div>
            <div className="flex w-[170px] h-[42px] pl-5 items-center text-gray-800 font-sm-medium">
              {item.email}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerChartContent;
