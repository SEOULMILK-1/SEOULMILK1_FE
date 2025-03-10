import { useState, useEffect } from 'react';
import PaymentChartHeader from './PaymentChartHeader';
import ChartPagination from '../../../../common/ChartPagination';
import PaymentChartContent from './PaymentContent';
import api from '../../../../hooks/api';
const PaymentChart = () => {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState<number | undefined>();
  const [page, setPage] = useState(1);
  const [size] = useState(10); // 한 페이지당 항목 개수
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(
          `/hq/payment-resolution/list/${
            period || '1'
          }?page=${page}&size=${size}`
        );
        if (response.data.isSuccess) {
          setData(response.data.result);
        } else {
          setError('데이터를 불러오는 중 오류가 발생했습니다.');
        }
      } catch (err) {
        setError('서버 요청 중 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [period, page, size]);

  return (
    <div className="mt-4 flex h-[714px] flex-col border border-gray-300 bg-white rounded-3xl">
      {/* 상단 필터 */}
      <div className="flex justify-between items-center p-4">
        <h2 className="text-lg font-semibold">지급 결의서 목록</h2>
        <select
          className="border border-gray-300 rounded-md px-4 py-2 text-gray-600"
          value={period || ''}
          onChange={(e) => setPeriod(Number(e.target.value))}
        >
          <option value="">전체</option>
          <option value="1">최근 1개월</option>
          <option value="3">최근 3개월</option>
        </select>
      </div>

      <PaymentChartHeader />

      <div className="flex-grow">
        {loading ? (
          <p className="text-center py-6 text-gray-500">로딩 중...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : data.length === 0 ? (
          <p className="text-center py-6 text-gray-500">
            조회된 데이터가 없습니다.
          </p>
        ) : (
          <PaymentChartContent data={data} />
        )}
      </div>

      {/* <ChartPagination page={page} setPage={setPage} /> */}
    </div>
  );
};

export default PaymentChart;
