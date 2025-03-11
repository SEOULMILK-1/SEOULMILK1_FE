import { useState, useEffect } from 'react';
import PaymentChartHeader from './PaymentChartHeader';
import ChartPagination from '../../../../common/ChartPagination';
import PaymentChartContent from './PaymentContent';
import api from '../../../../hooks/api';

const PaymentChart = () => {
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get('/hq/payment-resolution/list', {
          params: {
            page: currentPage - 1,
            size: pageSize
          }
        });

        console.log('API 응답:', response.data);

        if (response.data.isSuccess) {
          const resultData = Array.isArray(response.data.result)
            ? response.data.result
            : [];

          setData(resultData);
          setTotalItems(resultData.length);
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
  }, [currentPage, pageSize]);

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <div className="mt-4 flex h-[714px] flex-col border border-gray-300 bg-white rounded-3xl">
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

      <ChartPagination
        totalItems={totalItems}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

export default PaymentChart;
