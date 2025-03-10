import { useEffect, useState } from 'react';
import api from '../../../../hooks/api';

interface Customer {
  csName: string;
  name: string;
  phone: string;
  email: string;
}

interface CustomerSearchProps {
  searchTerm: string;
}

const CustomerChartContent = ({ searchTerm }: CustomerSearchProps) => {
  const [selectedList, setSelectedList] = useState<number | null>(null);
  const [data, setData] = useState<Customer[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem('accesstoken');

        const response = await api.get('/hq/search/cs/info', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // console.log('data', response.data);
        setData(response.data.result.responseList);
      } catch (error) {
        console.error('데이터 연결에 에러가 발생했습니다.', error);
      }
    };

    getData();
  }, []);

  const filteredData = data.filter(
    (item) =>
      item.csName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-[588px] w-[960px]">
      {filteredData.map((item, index) => (
        <div
          key={index}
          onClick={() => setSelectedList(index)}
          className={`flex w-[932px] h-[42px] mx-2 items-start gap-2 rounded-xl flex-col cursor-pointer ${
            selectedList === index ? 'bg-white' : 'hover:bg-gray-100'
          }`}
        >
          <div className="flex">
            <div className="flex w-[200px] h-[42px] pl-5 items-center text-gray-800 font-sm-medium">
              {item.csName}
            </div>
            <div className="flex w-[120px] h-[42px] pl-5 items-center text-gray-800 font-sm-medium">
              {item.name}
            </div>
            <div className="flex w-[200px] h-[42px] pl-5 items-center text-gray-800 font-sm-medium tabular-nums">
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
