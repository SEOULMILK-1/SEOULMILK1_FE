import { useState, useEffect } from 'react';
import PaymentChartHeader from './PaymentChartHeader';
import ChartPagination from '../../../../common/ChartPagination';
import PaymentChartContent from './PaymentContent';
import api from '../../../../hooks/api';

interface PaymentData {
  paymentResolutionId: number;
  paymentResolutionName: string;
  createdAt: string;
  paymentRecipient: string;
  hqUserName: string;
  suDeptName: string;
}

interface PaymentChartProps {
  searchTerm: string;
  startDate: string | null;
  endDate: string | null;
  selectedMonth: string;
  isFilterApplied: boolean;
}

const PaymentChart = ({
  searchTerm,
  startDate,
  endDate,
  selectedMonth,
  isFilterApplied
}: PaymentChartProps) => {
  const [data, setData] = useState<PaymentData[]>([]);
  const [filteredData, setFilteredData] = useState<PaymentData[]>([]);
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
        const token = localStorage.getItem('accesstoken');
        const response = await api.get('/hq/payment-resolution/list', {
          params: {
            page: currentPage - 1,
            size: pageSize
          },
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response.data);
        console.log(response.data.result.total);
        setData(response.data.result.results);
        setTotalItems(response.data.result.total);
      } catch (err) {
        setError('서버 요청 중 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, pageSize]);

  useEffect(() => {
    let filtered = data;

    if (isFilterApplied) {
      if (searchTerm) {
        filtered = filtered.filter((item) =>
          item.paymentResolutionName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
      }

      if (startDate && endDate) {
        filtered = filtered.filter((item) => {
          const itemDate = new Date(item.createdAt);
          return (
            itemDate >= new Date(startDate) && itemDate <= new Date(endDate)
          );
        });
      }

      if (selectedMonth) {
        const monthsAgo = new Date();
        monthsAgo.setMonth(monthsAgo.getMonth() - parseInt(selectedMonth));
        filtered = filtered.filter((item) => {
          const itemDate = new Date(item.createdAt);
          return itemDate >= monthsAgo;
        });
      }
    } else {
      filtered = data;
    }

    setFilteredData(filtered);
    setTotalItems(filtered.length);
  }, [searchTerm, startDate, endDate, selectedMonth, data, isFilterApplied]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
        ) : filteredData.length === 0 ? (
          <p className="text-center py-6 text-gray-500">
            조회된 데이터가 없습니다.
          </p>
        ) : (
          <PaymentChartContent data={filteredData} />
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
