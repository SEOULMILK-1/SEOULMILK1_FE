import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge, { Status } from '../../common/StatusBagde';
import api from '../../hooks/api';
import ArrowIcon from '../../../public/Icon/ArrowIcon';

interface InvoiceData {
  id: string;
  status: Status;
  number: string;
  title: string;
  date: string;
  center: string;
  ntsTaxId: string;
  team: string;
  taxDate: string;
  approvalNo: string;
  supplier: string;
  recipient: string;
  dateFormatted: string;
  amount: string;
  originalStatus: string;
}
const statusMap: Record<string, Status> = {
  APPROVE: '승인됨',
  REFUSED: '반려됨',
  WAIT: '승인됨'
};

const CSTaxMobile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<InvoiceData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accesstoken');
        const response = await api.get('/cs/search/tax', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.isSuccess) {
          const transformedData = response.data.result.responseList.map(
            (item: {
              ntsTaxId: { toString: () => any };
              title: any;
              taxDate: any;
              status: string | number;
            }) => ({
              id: item.ntsTaxId.toString(),
              title: item.title,
              date: item.taxDate,
              status: statusMap[item.status] || ('대기중' as Status)
            })
          );

          setData(transformedData);
        } else {
          console.error('API 요청 실패:', response.data.message);
        }
      } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
      }
    };

    fetchData();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="w-full max-w-[400px] mx-auto p-6">
      <div className=" flex items-center mb-4">
        <button onClick={handleBack} className="">
          <ArrowIcon strokeColor={'#3A404A'} />
        </button>
        <div className="flex-1 text-center  text-gray-800 font-xl-bold">
          세금 계산서 조회
        </div>
        <div className="w-8"></div>
      </div>
      <div className="bg-primary-50 text-primary-600  font-sm-semibold p-3 rounded-[16px] mt-6 ">
        모바일 버전에서는 한 달만...!! 한 달 이전의 리스트를 보고 싶다면 PC로...
      </div>

      <div className="mt-4">
        {data.map((item, index) => (
          <div
            key={item.id}
            className="flex justify-between items-center p-3 cursor-pointer"
            onClick={() => navigate(`/cs/tax/${item.id}`)}
          >
            <span className="w-6 text-gray-800 font-md-semibold mb-5">
              {index + 1}
            </span>

            <div className="flex-1 text-left">
              <p className="text-gray-800 font-sm-medium">{item.title}</p>
              <p className="text-gray-500 text-sm">{item.date}</p>
            </div>

            <StatusBadge status={item.status} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CSTaxMobile;
