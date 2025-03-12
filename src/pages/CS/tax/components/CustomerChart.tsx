import CustomerChartContent from './CustomerChartContent';
import CustomerChartHeader from './CustomerChartHeader';

interface CustomerChartProps {
  startDate: string | null;
  endDate: string | null;
  searchTriggered: boolean;
}

const CustomerChart = ({
  startDate,
  endDate,
  searchTriggered
}: CustomerChartProps) => {
  return (
    <div className="mt-4 flex h-[714px] flex-col border border-gray-300 bg-white rounded-3xl">
      <CustomerChartHeader />

      <div className="flex-grow">
        <CustomerChartContent
          startDate={startDate}
          endDate={endDate}
          searchTriggered={searchTriggered}
        />
      </div>

      {/* <ChartPagination /> */}
    </div>
  );
};

export default CustomerChart;
