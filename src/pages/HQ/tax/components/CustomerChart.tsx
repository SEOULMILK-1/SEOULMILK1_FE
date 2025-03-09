import ChartPagination from '../../../../common/ChartPagination';
import CustomerChartContent from './CustomerChartContent';
import CustomerChartHeader from './CustomerChartHeader';

const CustomerChart = () => {
  return (
    <div className="mt-4 flex h-[650px] flex-col border border-gray-300 bg-white rounded-3xl">
      <CustomerChartHeader />

      <CustomerChartContent />

      <ChartPagination />
    </div>
  );
};

export default CustomerChart;
