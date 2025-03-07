import ChartPagination from '../../../../common/ChartPagination';
import PaymentChartHeader from './PaymentChartHeader';
import PaymentChartContent from './PaymentContent';

const PaymentChart = () => {
  return (
    <div className="mt-4 flex h-[714px] flex-col border border-gray-300 bg-white rounded-3xl">
      <PaymentChartHeader />

      <div className="flex-grow">
        <PaymentChartContent />
      </div>

      <ChartPagination />
    </div>
  );
};

export default PaymentChart;
