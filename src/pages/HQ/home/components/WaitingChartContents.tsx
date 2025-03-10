import { useEffect, useState } from 'react';
import api from '../../../../hooks/api';

interface WaitingtaxProps {
  ntsTaxId: number;
  suDeptName: string;
  title: string;
  createdAt: string;
  csUserName: string;
}

interface LenghProps {
  onDataLength: (length: number) => void;
}

const WaitingChartContents = ({ onDataLength }: LenghProps) => {
  const [data, setData] = useState<WaitingtaxProps[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem('accesstoken');

        const response = await api.get('/hq/waiting/nts_tax', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('11111', response.data);
        console.log('2222', response.data.result.length);
        setData(response.data.result);
        onDataLength(response.data.result.length);
      } catch (error) {
        console.error('연결에 에러가 발생했습니다.', error);
      }
    };
    getData();
  }, []);

  return (
    <div className="h-[285px] w-[960px] overflow-y-scroll overflow-x-hidden custom-scrollbar">
      {data?.length > 0 ? (
        data.map((item, index) => (
          <div
            key={index}
            className="mx-[8px] flex w-[932px] h-[42px] items-center rounded-[12px] hover:bg-gray-100 font-sm-medium cursor-pointer"
          >
            <div className="w-[200px] pl-5 font-sm-medium text-gray-800">
              {item.suDeptName}
            </div>
            <div className="w-[350px] pl-5 font-sm-medium text-gray-800">
              {item.title}
            </div>
            <div className="w-[170px] pl-5 font-sm-medium text-gray-800">
              {item.createdAt}
            </div>
            <div className="w-[120px] pl-5 font-sm-medium text-gray-800">
              {item.csUserName}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center font-xl-medium text-gray-400 mt-[129px]">
          지급 대기 중인 세금계산서가 없어요
        </div>
      )}
    </div>
  );
};

export default WaitingChartContents;
