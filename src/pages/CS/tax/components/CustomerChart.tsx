import CustomerChartContent from './CustomerChartContent';
import CustomerChartHeader from './CustomerChartHeader';

const CustomerChart = () => {
  return (
    <div className="mt-4 flex h-[714px] flex-col border border-gray-300 bg-white rounded-3xl">
      <CustomerChartHeader />

      <div className="flex-grow">
        <CustomerChartContent />
      </div>

      {/* <ChartPagination /> */}
    </div>
  );
};

export default CustomerChart;
