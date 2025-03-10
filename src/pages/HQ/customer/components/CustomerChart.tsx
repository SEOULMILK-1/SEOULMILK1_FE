import ChartPagination from '../../../../common/ChartPagination';
import CustomerChartContent from './CustomerChartContent';
import CustomerChartHeader from './CustomerChartHeader';

interface CustomerChartProps {
  searchTerm: string;
}

const CustomerChart = ({ searchTerm }: CustomerChartProps) => {
  return (
    <div className="mt-4 flex h-[778px] flex-col border border-gray-300 bg-white rounded-3xl">
      <CustomerChartHeader />

      <div className="flex-grow">
        <CustomerChartContent searchTerm={searchTerm} />
      </div>

      <ChartPagination />
    </div>
  );
};

export default CustomerChart;
